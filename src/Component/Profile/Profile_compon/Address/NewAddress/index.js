import React from 'react'
import "./NewAddress.css"
import pencil from "../../../images/Pencil.svg"


export default function NewAddress(props) {

    return(
      <div>
        {props.data ? 
          props.data.map(el=>{
            return (
              <div className="profile__add__todoCard">
                  <div className="profile__add__leftBox"><p>{el.name}:</p></div>
                  <div className="profile__add__rightBox">
                      <p className="profile__add__address">{el.address}</p>
                      <input className="profile__add__mark" name="address" type="radio"/>
                      <button onClick={()=> props.setActive2(true)}  className="profile__add__editBtn"> <img src={pencil} alt=""/></button>
                  </div>
              </div>
            )
          }):null
        }
      </div>
    )
    
}



