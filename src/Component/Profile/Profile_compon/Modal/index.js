import React, { useState } from "react";
import "./Modal.css";
import x from "../../images/XXX.svg";
import logo from "../../images/logo.png";
import { ChangeHistory } from "@material-ui/icons";

export default function Modal(props) {
  const [password, setPassword] = useState()
  const [name, setName] = useState("");
  const [email,setEmail]=useState()
  const getName = (e) => {
    e.preventDefault();
    props.setPassword();
    props.setActive(false);

    if (props.surname === "Имя") {
      props.setFirstname(name);
      e.target.value = "";
    }
    if (props.surname === "Фамилия") {
        props.setLastname(name);
        e.target.value = "";
      }
      if (props.surname === "Отчество") {
        props.setMiddlename(name);
        e.target.value = "";
      }
    if (props.surname === "АДРЕС") {
      props.setAddress(name);
      e.target.value = "";
    }
    if (props.surname === "Номер") {
      props.setNumber(name);
      e.target.value = "";
    }
    if (props.surname === "ПОЧТА") {
      e.target.value = "";
    }

    if (props.surname === "ПАРОЛЬ") {
      props.setPassword(name);
      e.target.value = "";
    }
  };
  const token = localStorage.getItem("token");
  
  
  return (
    <div
      className={
        props.active
          ? "profile__modal__wrapper active"
          : "profile__modal__wrapper"
      }
      onClick={() => props.setActive(false)}
    >
      <div
        className={
          props.active
            ? "profile__modal__block active"
            : "profile__modal__block"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="profile__modal__left"></div>
        <div className="profile__modal__right">
          <div
            onClick={() => props.setActive(false)}
            className="profile__modal__btn"
          >
            <img src={x} alt="" />
          </div>
          <div className="profile__modal__box">
            <img className="profile__modal__logo" src={logo} alt="" />
            <p className="profile__modal__dataText">
              введите <span>новые</span> данные
            </p>
            <form onSubmit={getName}>
              <input
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type="password"
                className="profile__modal__newDataInp"
                placeholder="введите текущий пароль"
              />
              <input
                value={props.firstname}
                onChange={(event) => {
                  props.setFirstname(event.target.value);
                }}
                type="text"
                className="profile__modal__newDataInp"
                placeholder="введите имя"
              />
              <input
                value={props.lastname}
                onChange={(event) => {
                  props.setLastname(event.target.value);
                }}
                type="text"
                className="profile__modal__newDataInp"
                placeholder="введите фамилию"
              />
              <input
                value={props.middlename}
                onChange={(event) => {
                  props.setMiddlename(event.target.value);
                }}
                type="text"
                className="profile__modal__newDataInp"
                placeholder="введите отчество "
              />
              <input
                value={props.address}
                onChange={(event) => {
                  props.setAddress(event.target.value);
                }}
                type="text"
                className="profile__modal__newDataInp"
                placeholder="введите адрес"
              />
              <input
                value={props.phone}
                onChange={(event) => {
                  props.setPhone(event.target.value);
                }}
                type="text"
                className="profile__modal__newDataInp"
                placeholder="введите номер телефона"
              />
              <input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                type="text"
                className="profile__modal__newDataInp"
                placeholder="введите почту"
              />

              <button
                onClick={(e) => {
                  debugger
                  getName(e);
                  props.updateUser();
                  props.change('Email', password, email);
                }}
                className="profile__modal__newDataBtn"
              >
                сохранить
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
