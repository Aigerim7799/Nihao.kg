import React,{ useState,useEffect } from 'react';
import './DoComp.css';
import ListItem from './ListItem';

function List({setElId,setWeight,weight}) {

  const [basketItem, setBasketItem] = useState();
  const [elIds,setElIds]=useState()

  useEffect(() => {
    getBasket()
    
  }, []);

  const token = localStorage.getItem('token');

  const getBasket = async()=>{
    const url = `http://otapi.net/service-json/GetBasket?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=RegisterUser56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=${token}`
    const req = await fetch(url)
    const res = await req.json()
    setBasketItem(res?.CollectionInfo?.Elements)
    getArr(res?.CollectionInfo?.Elements)
  }
  
  const getArr=(data)=>{ 
 const arr=[]
    data?.map(el=>{ 
       
      if(el.Id){ 
        arr.push(`<Id>${el?.Id}</Id>`) 

  }}) 
  if(arr!==undefined){ 
    CreateOrder(arr) 
  } 
} 
  const CreateOrder=(arr)=>{ 
     
    const id= arr?.join() 
    const elId=id?.replace(/,/g,'') 
    setElId(elId)

}


  return (
    <div className="list__wrap">
      <div className="list__head">
        <p>Список товаров</p>
      </div>
      <div className="list__points">
        <div>Товар</div>
        <div>Оригинал</div>
        <div>Конфигурация</div>
        <div>Вес товара (в кг.)</div>
        <div>Кол-во</div>
        <div>Цена</div>
      </div>
      {basketItem && basketItem.map((el) => {
        return (
          <div>
            <ListItem el={el} key={el.Id} token={token} basket={getBasket} />
          </div>
           
            );
      })}
    </div>
  );
}

export default List;
