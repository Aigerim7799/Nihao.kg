import React from 'react'
import "./OrderItem.css"
import photo from "../../../images/itemPhoto.jpg"   

export default function OrderItem() {
    return (
        <div>
            <div className="profile__order__item">
                <div className="profile__order__ava">
                    <img className="profile__order__photo" src={photo} alt=""/>
                    <button className="profile__order__deleteBtn">delete</button>
                </div>
                <div className="profile__order__itemMore">
                    <ul>
                        <p><strong>iPhone 8/X/Xs/11/Pro</strong><span className="profile__order__pRight profile__order__data">02.02.2010-02.02.2010</span></p>
                        <p><span className="profile__order__pRed">количество:</span><span className="profile__order__pRight">3 шт</span></p>
                        <p><span className="profile__order__pRed">адрес доставки:</span><span className="profile__order__pRight">Ибримова 37б пересекает Московскую, 4 этаж. 48 квартира</span></p>
                        <p><span className="profile__order__pRed">способ доставки:</span><span className="profile__order__pRight">Авиaдоставка</span></p>
                        <p><span className="profile__order__pRed">итог:</span><span className="profile__order__pRight">840 сом</span></p>
                    </ul>
                </div>
            </div>
        </div>
    )
}
