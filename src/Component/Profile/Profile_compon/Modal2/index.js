import React from 'react'
import "./Modal2.css"
import x from "../../images/XXX.svg"
import logo from "../../images/logo.png"

export default function Modal2(props) {

    const editTodo =(e)=>{
        e.preventDefault()
        props.setActive2(false)
        props.setVal('')
        props.setVal2('')
    }

    return (
        <div className={props.active2 ? "profile__modal2__wrapper active" : "profile__modal2__wrapper"} onClick={()=> props.setActive2(false)}>
            <div className={props.active2 ? "profile__modal2__block active" : "profile__modal2__block"} onClick={e => e.stopPropagation()}>
            <div onClick={()=> props.setActive2(false)} className="profile__modal2__btn"><img src={x} alt=""/></div>
                <div className="profile__modal2__topBlock">
                <div className="profile__modal2__topBlock__rightMiniBlock"><img  className="profile__modal__logo" src={logo} alt=""/><p className="profile__modal2__dataText">введите <span>новые</span> данные</p></div>
                </div>
                <div className="profile__modal2__bottomBlock">
                    <form onSubmit={editTodo} className="profile__modal2__addBox">
                        <div className="profile__modal2__inp1">
                            <input value={props.val} onChange={(e)=>{props.setVal(e.target.value)}} className="profile__modal2__addInp1" type="text"/>
                            <p>название</p>
                        </div>
                        <div className="profile__modal2__inp2">
                            <input value={props.val2} onChange={(e)=>{props.setVal2(e.target.value)}} className="profile__modal2__addInp2" type="text"/>
                            <p>адрес</p>
                        </div>
                        <button className='profile__modal2__none'></button>
                    </form>
                    <div className="profile__modal2__emptyBox"><button onClick={editTodo} className="profile__modal2__newDataBtn">сохранить</button></div>
                </div>
            </div>
        </div>
    )
}