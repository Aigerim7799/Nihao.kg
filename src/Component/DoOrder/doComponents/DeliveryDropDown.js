import React, { useEffect, useState } from 'react'

function DeliveryDropDown({el,done,setDone}) {
    const [obj,setObj]=useState({ 
        LastName:el?.LastName!=='undefined'?el?.LastName:'', 
        FirstName:el?.FirstName!=='undefined'?el?.FirstName:'', 
        INN:el?.INN!=='undefined'?el?.INN:'', 
        CountryName:el?.CountryName!=='undefined'?el?.CountryName:'', 
        City:el?.City!=='undefined'?el?.City:'', 
        Address:el?.Address!=='undefined'?el?.Address:'', 
        PostalCode:el?.PostalCode!=='undefined'?el?.PostalCode:'', 
        Region:el?.Region!=='undefined'?el?.Region:'', 
        Phone:el?.Phone!=='undefined'?el?.Phone:'', 
    })

    

    const token = localStorage.getItem('token')


    const changeDelivery = async(id)=>{
        const url = `http://otapi.net/service-json/UpdateUserProfile?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=ru&signature=GetCategorySubcategoryInfoList56aa1311-6901-46e7-a0e8-a5445f74986cru20210430011102123123&timestamp=20210430011102&sessionId=${token}&profileId=${id}&updateData=<UserProfileUpdateData><FirstName>${obj.FirstName}</FirstName><LastName>${obj.LastName}</LastName><Region>${obj.Region}</Region><City>${obj.City}</City><CityCode>${obj.CityCode}</CityCode><Address>${obj.Address}</Address><Phone>${obj.Phone}</Phone><PostalCode>${obj.PostalCode}</PostalCode><INN>${obj.INN}</INN></UserProfileUpdateData>`;
      const req = await fetch(url)
      const res = await req.json()
      setDone(false)
    }

    if(done ===true ){
        changeDelivery(el.Id.Value)
    }

    
   
    return (
        <>
            <div className="del__dropDownDivLeft">
            <div className="del__flexDiv">
              <p>
                Фамилия<span className="star">*</span>
              </p>
              <input type="text"  value={obj.LastName} onChange={(event) =>setObj({...obj,LastName:event.target.value})}  className="del__flexDivInp" />
            </div>
            <div className="del__flexDiv">
              <p>
                Имя<span className="star">*</span>
              </p>
              <input type="text" value={obj.FirstName} onChange={(event) =>setObj({...obj,FirstName:event.target.value})} className="del__flexDivInp" />
            </div>
            <div className="del__flexDiv">
              <p>
                Телефон<span className="star">*</span>
              </p>
              <input type="text" value={obj.Phone} onChange={(event) =>setObj({...obj,Phone:event.target.value})} className="del__flexDivInp" />
            </div>
            <div className="del__flexDiv">
              <p>ИНН</p>
              <input type="text" value={obj.INN} onChange={(event) =>setObj({...obj,INN:event.target.value})} className="del__flexDivInp" />
            </div>
          </div>
          <div className="del__dropDownDivRight">
            <div className="del__flexDiv">
              <p>
                Страна<span className="star">*</span>
              </p>
              <select className="del__flexDivInp">
                <option value="">Киргизия</option>
              </select>
            </div>
            <div className="del__flexDiv">
              <p>Регион</p>
              <input type="text" value={obj.Region} onChange={(event) =>setObj({...obj,Region:event.target.value})} className="del__flexDivInp" />
            </div>
            <div className="del__flexDiv">
              <p>
                Город<span className="star">*</span>
              </p>
              <select className="del__flexDivInp">
                <option value="">{obj.City}</option>
              </select>
            </div>
            <div className="del__flexDiv">
                <p>
                    Адресс доставки<span className="star">*</span>
                </p>
                <input className="del__flexDivInp" type="text" value={obj.Address} onChange={(event) =>setObj({...obj,Address:event.target.value})} />
            </div>

          </div>
          <p className="del__dropDownP">Поля, помеченные *, обязательны для заполнения</p>
        </>
    )
}

export default DeliveryDropDown
