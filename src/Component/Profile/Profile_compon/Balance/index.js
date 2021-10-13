import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Balance.css'

export default function Balance(props) {


    return (
        <div>
            <div className="profile__bal__contentBox">
                <div className="profile__bal__block1">
                    <div className="profile__bal__name">
                        <p>мой баланс</p>
                        <span className="profile__bal__line"></span>
                    </div>
                    {props.balance?
                         <div className="profile__bal__miniContent">
                        <ul className="profile__bal__ul">
                            <p>Номер счета: {props.balance.Result.Num}</p>
                            <p>На вашем балансе: {props.balance.Result.Balance +' '+props.balance.Result.CurrencySign}</p>
                            <p>Ожидает оплаты: {props.balance.Result.PaymWaitAmount +' '+props.balance.Result.CurrencySign}</p>
                        </ul>
                       
                    </div>:null
                    }
                   
                </div>
                <div className="profile__bal__block2">
                    <div className="profile__bal__name2">
                        <p>выберите сумму пополнения</p>
                        <span className="profile__bal__line2"></span>
                    </div>
                    <div className="profile__bal__uls">
                        <ul className="profile__bal__ul1">
                            <label className="bal__label1" htmlFor="bal__inp1">
                                <input className="profile__bal__radioInp" id="bal__inp1" name="radioBtn" type="radio"/>
                                500 сом
                            </label>
                            <label className="bal__label1" htmlFor="bal__inp2">
                                <input className="profile__bal__radioInp" id="bal__inp2" name="radioBtn" type="radio"/>
                                1000 сом
                            </label>
                            <label className="bal__label1" htmlFor="bal__inp3">
                                <input className="profile__bal__radioInp" id="bal__inp3" name="radioBtn" type="radio"/>
                                1500 сом
                            </label>
                            <label className="bal__label1" htmlFor="bal__inp4">
                                <input className="profile__bal__radioInp" id="bal__inp4" name="radioBtn" type="radio"/>
                                3000 сом
                            </label>
                        </ul>
                        <ul className="profile__bal__ul2">
                            <label className="bal__label1" htmlFor="bal__inp5">
                                <input className="profile__bal__radioInp" id="bal__inp5" name="radioBtn" type="radio"/>
                                5000 сом
                            </label>
                            <label className="bal__label1" htmlFor="bal__inp6">
                                <input className="profile__bal__radioInp" id="bal__inp6" name="radioBtn" type="radio"/>
                                10000 сом
                            </label>
                            <label className="bal__label1" htmlFor="bal__inp7">
                                <input className="profile__bal__radioInp" id="bal__inp7" name="radioBtn" type="radio"/>
                                15000 сом
                            </label>
                            <label className="bal__label1" htmlFor="bal__inp8">
                                <input className="profile__bal__radioInp" id="bal__inp8" name="radioBtn" type="radio"/>
                                30000 сом
                            </label>
                        </ul>
                    </div>
                </div>
                <div className="profile__bal__block3">
                    <div className="profile__bal__name3">
                        <p>выберите способ пополнения</p>
                        <span className="profile__bal__line3"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}