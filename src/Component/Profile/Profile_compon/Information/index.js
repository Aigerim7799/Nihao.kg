import React, { useEffect, useState } from "react";
import "./Info.css";

export default function Information(props) {
  return (
    <div className="profile__info__contentBox">
      <div className="profile__info__block1">
        <div className="profile__info__name">
          <p>общая информация</p>
          <span className="profile__info__line"></span>
        </div>
        {props.balance ? (
          <div className="profile__bal__miniContent">
            <ul className="profile__bal__ul">
              <p>Номер счета: <span>{props.balance.Result? props.balance.Result.Num : null}</span></p>
              <p>
                На вашем балансе: <span>{" "}
                {props.balance.Result.Balance +
                  " " +
                  props.balance.Result.CurrencySign}</span> 
              </p>
              <p>
                Ожидает оплаты: <span>{" "}
                {props.balance.Result.PaymWaitAmount +
                  " " +
                  props.balance.Result.CurrencySign}</span>
              </p>
            </ul>
          </div>
        ) : null}
      </div>
      <div className="profile__info__block2">
        <div className="profile__info__name2">
          <p>ФИО и адрес получателя</p>
          <span className="profile__info__line2"></span>
        </div>
        <div className="profile__info__miniContent2">
          <div className="profileinfo">
          
            {props.info ? 
              <div>
              <p><span style={{color:'red'}}>ФИО:</span> {props.info.UserInfo.FirstName+' '+ props.info.UserInfo.LastName+' '+props.info.UserInfo.MiddleName}</p>
              <p><span style={{color:'red'}}>Aдрес доставки:</span> {props.info.UserInfo.Address}</p>
                <p><span style={{color:'red'}}>Телефон:</span> {props.info.UserInfo.Phone}</p>
                <p><span style={{color:'red'}}>Почта:</span> {props.info.UserInfo.Email}</p>
              </div>
             : null}
          </div>
        </div>
      </div>
    </div>
  );
}
