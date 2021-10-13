import React,{useState} from 'react'
import n from './profile2.module.css'


function Profile2({delProfile}) {
    const [obj,setObj]=useState({
        LastName:delProfile?.LastName,
        FirstName:delProfile?.FirstName,
        INN:delProfile?.INN,
        CountryName:delProfile?.CountryName,
        City:delProfile?.City,
        Address:delProfile?.Address,
        PostalCode:delProfile?.PostalCode,
        Region:delProfile?.Region,
        Phone:delProfile?.Phone,
    })
    const token = localStorage.getItem('token')

    const changeDelivery = async(id)=>{
        const url = `http://otapi.net/service-json/UpdateUserProfile?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=ru&signature=GetCategorySubcategoryInfoList56aa1311-6901-46e7-a0e8-a5445f74986cru20210430011102123123&timestamp=20210430011102&sessionId=${token}&profileId=${id}&updateData=<UserProfileUpdateData><FirstName>${obj?.FirstName}</FirstName><LastName>${obj?.LastName}</LastName><Region>${obj?.Region}</Region><City>${obj?.City}</City><CityCode>${obj?.CityCode}</CityCode><Address>${obj?.Address}</Address><Phone>${obj?.Phone}</Phone><PostalCode>${obj?.PostalCode}</PostalCode><INN>${obj?.INN}</INN></UserProfileUpdateData>`
      const req = await fetch(url)
      const res = await req.json()
    }
    const deleteProfile =async(id)=>{
        const url =`http://otapi.net/service-json/DeleteUserProfile?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=ru&signature=GetCategorySubcategoryInfoList56aa1311-6901-46e7-a0e8-a5445f74986cru20210430011102123123&timestamp=20210430011102&sessionId=${token}&profileId=${id}`
        const req = await fetch(url)
        const res = await req.json()
    }
    const CreateUseProfile=async()=>{
        const url = `http://otapi.net/service-json/CreateUserProfile?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=ru&signature=GetCategorySubcategoryInfoList56aa1311-6901-46e7-a0e8-a5445f74986cru20210430011102123123&timestamp=20210430011102&sessionId=${token}&createData=<UserProfileCreateData><FirstName>${obj.FirstName}</FirstName><LastName>${obj.LastName}</LastName><Region>${obj.Region}</Region><City>${obj.City}</City><CityCode>${obj.CityCode}</CityCode><Address>${obj.Address}</Address><Phone>${obj.Phone}</Phone><PostalCode>${obj.PostalCode}</PostalCode><INN>${obj.INN}</INN></UserProfileCreateData>`
        const req = await fetch(url)
        const res = await req.json()
    }
    
    
    return (
        <div>
            {obj ?
                <div className={n.deliveryItem}>
                <div className={n.mainItem}>
                    <p className={n.item}>Фамилия <span className={n.itemRed}>*</span> </p>
                    <input className={n.input} type="text" 
                    value={obj.LastName} 
                    onChange={(event) =>{setObj({...obj,LastName:event.target.value})
                    }} />
                </div>
                <div className={n.mainItem}>
                    <p className={n.item}>Имя <span className={n.itemRed}>*</span> </p>
                    <input className={n.input} type="text" 
                    value={obj.FirstName} 
                    onChange={(event)=>{setObj({...obj,FirstName:event.target.value})}} />
                </div>
                <div className={n.mainItem}>
                    <p className={n.item}>ИНН</p>
                    <input className={n.input} type="text" 
                    value={obj.INN} 

                    onChange={(event)=>{setObj({...obj,INN:event.target.value})}} />
                </div>
                <div className={n.mainItem}>
                    <p className={n.item}>Страна <span className={n.itemRed}>*</span> </p>
                    <select className={n.select}>
                        <option value={obj?.CountryName} selected={(event)=>setObj({...obj,CountryName:event.target.value})}>
                            {obj?.CountryName? obj?.CountryName:"Киргизия"}
                        </option>
                    </select>
                </div>
                <div className={n.mainItem}>
                    <p className={n.item}>Город <span className={n.itemRed}>*</span> </p>
                    <input className={n.input} type="text" 
                    value={obj.City} 
                    onChange={(event)=>{setObj({...obj,City:event.target.value})}} />
                </div>
                <div className={n.mainItem}>
                    <p className={n.item}>Адрес <span className={n.itemRed}>*</span> </p>
                    <input className={n.input} type="text" 
                    value={obj.Address} 
                    onChange={(event)=>{setObj({...obj,Address:event.target.value})}} />
                </div>
                <div className={n.mainItem}>
                    <p className={n.item}>Индекс  </p>
                    <input className={n.input} type="text" 
                    value={obj.PostalCode} 
                    onChange={(event)=>{setObj({...obj,PostalCode:event.target.value})}} />
                </div>
                <div className={n.mainItem}>
                    <p className={n.item}>Область/край  </p>
                    <input className={n.input} type="text" 
                    value={obj.Region} 
                    onChange={(event)=>{setObj({...obj,Region:event.target.value})}} />
                </div>
                <div className={n.mainItem}>
                    <p className={n.item}>Телефон  </p>
                    <input className={n.input} type="text" 
                    value={obj.Phone} 
                    onChange={(event)=>{setObj({...obj,Phone:event.target.value})}} />
                </div>
            </div>
            :null
            }
            <p style={{ color: 'red', marginLeft: '2%', width: '80%', }}>Поля, помеченные *, обязательны для заполнения</p>
            <div style={{ marginLeft: '27%', }}>
            <button className={n.button} style={delProfile?{}:{width:'52%'}} onClick={()=>{delProfile? changeDelivery(delProfile?.Id?.Value):CreateUseProfile()}}>
                    Сохранить
                </button>
                {delProfile?
                <button className={n.button} onClick={()=>{deleteProfile(delProfile?.Id?.Value)}}>
                    Удалить
                </button>
                :null
                }
            </div>
        </div>
    )
}

export default Profile2
