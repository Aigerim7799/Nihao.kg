import React from 'react'
import './OutputMoney.css'

export default function OutputMoney() {
    return (
        <div className="profile__out__contentBox">
            <div className="profile__out__block1">
                <div className="profile__out__name">
                    <p>вывод средств</p>
                    <span className="profile__out__line"></span>
                </div>
                <div className="profile__out__sum">
                    <p className="profile__out__sumText">Cумма*</p>
                    <input type="number" className="profile__out__sumInp" placeholder="0"/>
                </div>
                <div className="profile__out__comment">
                    <p className="profile__out__commentText">Комментарий*</p>
                    <textarea type="text" className="profile__out__commentInp"></textarea>
                </div>
                <button className="profile__out__sendBtn">Отправить</button>
            </div>
        </div>
    )
}
