import React, { useState ,useEffect } from 'react'


function ListItem({el, token, basket}) {
  const [img, setImg] = useState('');
  const [itemTitle, setItemTitle] = useState('')
  const [ weight, setWeight] = useState(' ')

  useEffect(() => {
    setImg(imgurl.join(' '));
    setItemTitle(ItemTitle.join(' '));
    setWeight(Weight.join(' '));
  }, [])

  let imgurl = el
    ? el &&
      el?.Fields?.map((el) => {
        if (el.Name === 'PictureURL') {
          return el.Value;
        } else {
          return null;
        }
      })
    : null;

  let ItemTitle = el
  ? el &&
    el?.Fields?.map((el) => {
      if (el.Name === 'ItemTitle') {
        return el.Value;
      } else {
        return null;
      }
    })
  : null;

  let Weight = el
  ? el &&
    el?.Fields?.map((el) => {
      if (el.Name === 'Weight') {
        return el.Value;
      } else {
        return null;
      }
    })
  : null;

  const removeItemFromBorN = async (ElId) => {
    const url = `http://otapi.net/service-json/RemoveItemFromBasket?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=RegisterUser56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=${token}&elementId=${ElId}`
    const req = await fetch(url)
    const res = await req.json()
    basket()
  }
    
    
    return (
        <div className="list__order">
            <img src={img} className="list__backPhoto" />
            <div className="list__originDiv">
                <p>{itemTitle}</p>
              <div>
                <p>
                  продавец: <strong>{el.VendorId}</strong>
                </p>
                <p>
                  категория: <strong>{el.CategoryName}</strong>
                </p>
              </div>
            </div>
            <div className="list__configDiv list__point">
            { el.Configuration.Configurator.map((el,i) =>{
                return(
                    <p>
                      {el.Name} <br /> <strong>{el.Value}</strong>
                    </p>
                    
                )
            })
              
              }
            </div>
            <p className="list__point">{weight}</p>
            <p className="list__point">{el.Quantity}</p>
            <p className="list__point">
              <strong>{el.FullTotalCostWithoutDiscount.ConvertedPrice}</strong>
            </p>
            <button className="list__delete" onClick={()=>removeItemFromBorN(el.Id)}>Удалить товар</button>
        </div>
    )
}

export default ListItem
