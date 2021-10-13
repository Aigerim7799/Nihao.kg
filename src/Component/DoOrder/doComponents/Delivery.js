import React, { useEffect, useState } from 'react';

import pencil from '../../images/pen.png'
import close from '../../images/close.png'
import Done from '../../images/check.png';
import DeliveryDropDown from './DeliveryDropDown';


function Delivery({setTruth,userId,comment}) {
  const [dropDiv, setDropDiv] = useState(false);
  const [delProfile, setDelProfile] = useState()
  const [indexProf, setIndexProf] = useState()
  const [done, setDone]=useState(false)
  const [count, setCount]=useState(3)
  const [del,setDel]=useState()
  const [delId, setDelId]=useState()
  const [allPrice, setAllPrice] = useState()
  const [value, setValue] = useState()

  

  useEffect(() => {
    getDeliveryInfo()
    searchDelivery()
    getBasket()
  }, [count])

  const token= localStorage.getItem('token')


  const getDeliveryInfo = async() =>{
    const url = `http://otapi.net/service-json/GetUserProfileInfoList?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=ru&signature=GetUserProfileInfoList56aa1311-6901-46e7-a0e8-a5445f74986cru20210430011102123123&timestamp=20210430011102&sessionId=${token}`
    const req = await fetch(url)
    const res = await req.json()
    setDelProfile(res?.Result)
    setIndexProf(res?.Result?.Content[0]?.Id?.Value)
    userId(res?.Result?.Content[0]?.Id?.Value)
  }

  const searchDelivery = async()=>{
    const url='http://otapi.net/service-json/SearchDeliveryModes?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=ru&signature=GetCategorySubcategoryInfoList56aa1311-6901-46e7-a0e8-a5445f74986cru20210430011102123123&timestamp=20210430011102&xmlSearchParameters=%3CDeliveryModeSearchParameters%3E%3CCountryCode%3EKG%3C%2FCountryCode%3E%3C%2FDeliveryModeSearchParameters%3E&framePosition=0&frameSize=10'
    const req=await fetch(url)
    const res = await req.json()
    setDel(res?.Result?.Content)
    setDelId(res?.Result?.Content[0]?.Id)
    setTruth(res?.Result?.Content[0]?.Id)
  }

  const getBasket = async()=>{
    const url = `http://otapi.net/service-json/GetBasket?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=RegisterUser56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=${token}`
    const req = await fetch(url)
    const res = await req.json()
    setAllPrice(res?.CollectionInfo)
  }

  return (
    
    <div className="del__wrap">
      { delProfile?
        <>

      <div className="del__head">
        <p>Доставка</p>
      </div>
      
      <div className="del__recipient">
        <div className="del__wrapDiv">
          <p>Получатель:</p>
          <select name="" onChange={(event)=>{setIndexProf(event.target.value);
          userId(event.target.value)}} className="del__select">
              
                <option selected value={delProfile?.Content[0].Id?.Value}  >{delProfile?.Content[0].FirstName} {delProfile?.Content[0].LastName}  </option>
                <option value={delProfile?.Content[1].Id?.Value}  >{delProfile?.Content[1].FirstName} {delProfile?.Content[1].LastName}  </option>
                <option value={delProfile?.Content[2].Id?.Value}  >{delProfile?.Content[2].FirstName} {delProfile?.Content[2].LastName}  </option>
              
          </select>
          <div className="del__btnDiv">
            <button
              style={dropDiv ? { display: 'none' } : { display: 'block' }}
              className="del__btn"
              onClick={() => setDropDiv(!dropDiv)}>
              <img src={pencil} alt="" className="del__pen" />
            </button>
            <button
              style={dropDiv ? { display: 'block' } : { display: 'none' }}
              className="del__btn"
              onClick={() => {setDropDiv(!dropDiv);
              setCount(count-1)
              }}
              >
              <img src={close} alt="" className="del__pen" />
            </button>
            <button
              style={dropDiv ? { display: 'block' } : { display: 'none' }}
              className="del__btn"
              onClick={() => {setDropDiv(!dropDiv);
                setDone(true)
              }}>

              <img src={Done} alt="" className="del__pen"  />
            </button>
          </div>
        </div>
        <div className={dropDiv ? 'del__dropdownDiv' : 'del__dropdownDivNone'}>
          { delProfile?.Content?.map(el=>{
            if( el?.Id.Value ==  indexProf ){
              return<DeliveryDropDown el={el} done={done} setDone={setDone} />
            }
          })

          }
            

        </div>
      </div>
        </>
        :null
    
      }

      <div className="del__recipient2">
        <p>Способ доставки:</p>
        <select name="" onChange={
          (event)=>setDelId(event.target.value),
          (event)=>setTruth(event.target.value)
        } className="del__select2">
          {del?
          <>
              <option selected value={del[0]?.Id}>{del[0]?.Name}:{' '}{del[0]?.Description}</option>
              <option  value={del[1]?.Id}>{del[1]?.Name}:{' '}{del[1]?.Description}</option>
          </>
          :null
          }
        </select>
      </div>
      <div className="del__totalDiv">
        <div className="del__totalWrap">
          <p>Итого:</p>
        </div>
        <div className="del__totalBox">
          <div className="del__totalBoxLeft">
            <p className="del__totalComm">Коментарий к заказу</p>
            <textarea type="text" onChange={(e)=>{setValue(e.target.value);

            comment(e.target.value)}} className=""></textarea>
          </div>
          <div className="del__totalBoxRight">
            <li className="del__totalList">
              <div><p>Общий вес </p> <p>0</p> </div>
              <div>
                <p>Доставка </p>

               { del?.map(el=>{
                if(el.Id == delId ){
                  return(
                   <p>{el.Name} </p>
                )}
              })
              }
              </div>
              <div><p>Стоимость доставки</p>   <p>0</p></div>
              <div><p>Стоимость товаров</p>{allPrice ?  <p>{allPrice?.TotalCost?.ConvertedPriceList.Internal.Price} сом </p> : null}</div>
              <span>
                <div className="del__border">
                  <p>
                    <strong>ИТОГО</strong>
                  </p>
                  <p>
                    <strong>{allPrice ?  <p>{allPrice?.TotalCost?.ConvertedPriceList.Internal.Price} сом </p> : null}</strong>
                  </p>
                </div>
              </span>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
