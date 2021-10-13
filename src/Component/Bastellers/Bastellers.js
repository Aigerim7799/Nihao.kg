import React from 'react'
import './Bastellers.css'
import {offer}from '../../state'
let Offer =(props)=>{
    return(
    <div onClick={()=>{props.setActive(true)}} className = 'Bastellers_block'>{props.key}
        <img className = 'Bastellers_img' src = {props.img}/>
        <p className = "Bastellers_tt_text">{props.text}</p>
        <div className='Bastellers_block_red'>
            <p className = 'Bastellers_price'>{props.price}</p>
            <span className = 'Bastellers_like'>{props.like}</span>
        </div>
    </div>
    )
}
export default function Bastellers(props) {
    return (
        <div className="bast_wrap">
        <div className='Bastellers_line'>
            <p className="Bastellers_text">Бестселлеры</p>
        </div>
        <div className='Bastellers_wrapper'>
                {
                    offer.map((el,index)=>{
                        return(
                        <Offer img={el.img} text={el.text} like={el.like} price={el.price} key={index} setActive={props.setActive} active = {props.active}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
