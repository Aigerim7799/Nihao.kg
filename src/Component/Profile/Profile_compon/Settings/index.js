import React, { useEffect, useState } from "react";
import "./Settings.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}));

export default function Settings(props) {


  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });



  return (
    <div className="profile__set__contentBox">
      <div className="profile__set__block1">
        <div className="profile__set__name">
          <p>общая информация</p>
          <span className="profile__set__line"></span> 
        </div>
        {props.balance ? (
          <div className="profile__bal__miniContent">
            <ul className="profile__bal__ul">
              <p>Номер счета:<span style={{color:'black'}}>{props.balance.Result.Num}</span> </p>
              <p>
                На вашем балансе:
                <span style={{color:'black'}}>{" "}
                {props.balance.Result.Balance +
                  " " +
                  props.balance.Result.CurrencySign}</span>
              </p>
              <p>
                Ожидает оплаты:
                <span style={{color:'black'}}>{" "}
                {props.balance.Result.PaymWaitAmount +
                  " " +
                  props.balance.Result.CurrencySign}</span>
              </p>
            </ul>
          </div>
        ) : null}
      </div>
      <div className="profile__set__block2">
        <div className="profile__set__name2">

          <p>ФИО и адрес получателя</p>

          <span className="profile__set__line2"></span>
        </div>
        <div className="profile__set__miniContent2">
          <ul className="profile__set__ul2">
            <div className="profile__set__param">
              <p>
                ФИО: <span>{props.info.UserInfo.FirstName+' '+ props.info.UserInfo.LastName+' '+props.info.UserInfo.MiddleName}</span>
              </p>
              <svg
                onClick={() => props.changeName("ФИО")}
                className="profile__set__param2"
                width="20px"
                height="20px"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.24112 16.8751H3.75C3.58424 16.8751 3.42527 16.8092 3.30806 16.692C3.19085 16.5748 3.125 16.4158 3.125 16.2501V12.7589C3.125 12.6769 3.14117 12.5956 3.17258 12.5198C3.20398 12.4439 3.25002 12.375 3.30806 12.317L12.6831 2.942C12.8003 2.82479 12.9592 2.75894 13.125 2.75894C13.2908 2.75894 13.4497 2.82479 13.5669 2.942L17.0581 6.43312C17.1753 6.55033 17.2411 6.7093 17.2411 6.87506C17.2411 7.04082 17.1753 7.19979 17.0581 7.317L7.68306 16.692C7.62502 16.75 7.55612 16.7961 7.48029 16.8275C7.40447 16.8589 7.32319 16.8751 7.24112 16.8751Z"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.625 5L15 9.375"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.46035 16.8351L3.16504 12.5398"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            {/* <div className="profile__set__param">
              <p>
                Адрес доставки: <span>{props.info.UserInfo.City}</span>
              </p>
              <svg
                onClick={() => {
                  props.changeName("АДРЕС");
                }}
                className="profile__set__param2"
                width="20px"
                height="20px"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.24112 16.8751H3.75C3.58424 16.8751 3.42527 16.8092 3.30806 16.692C3.19085 16.5748 3.125 16.4158 3.125 16.2501V12.7589C3.125 12.6769 3.14117 12.5956 3.17258 12.5198C3.20398 12.4439 3.25002 12.375 3.30806 12.317L12.6831 2.942C12.8003 2.82479 12.9592 2.75894 13.125 2.75894C13.2908 2.75894 13.4497 2.82479 13.5669 2.942L17.0581 6.43312C17.1753 6.55033 17.2411 6.7093 17.2411 6.87506C17.2411 7.04082 17.1753 7.19979 17.0581 7.317L7.68306 16.692C7.62502 16.75 7.55612 16.7961 7.48029 16.8275C7.40447 16.8589 7.32319 16.8751 7.24112 16.8751Z"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.625 5L15 9.375"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.46035 16.8351L3.16504 12.5398"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div> */}
            <div className="profile__set__param">
              <p>
                Номер телефона: <span>{props.info.UserInfo.Phone}</span>
              </p>
              <svg
                onClick={() => props.changeName("Номер")}
                className="profile__set__param2"
                width="20px"
                height="20px"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.24112 16.8751H3.75C3.58424 16.8751 3.42527 16.8092 3.30806 16.692C3.19085 16.5748 3.125 16.4158 3.125 16.2501V12.7589C3.125 12.6769 3.14117 12.5956 3.17258 12.5198C3.20398 12.4439 3.25002 12.375 3.30806 12.317L12.6831 2.942C12.8003 2.82479 12.9592 2.75894 13.125 2.75894C13.2908 2.75894 13.4497 2.82479 13.5669 2.942L17.0581 6.43312C17.1753 6.55033 17.2411 6.7093 17.2411 6.87506C17.2411 7.04082 17.1753 7.19979 17.0581 7.317L7.68306 16.692C7.62502 16.75 7.55612 16.7961 7.48029 16.8275C7.40447 16.8589 7.32319 16.8751 7.24112 16.8751Z"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.625 5L15 9.375"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.46035 16.8351L3.16504 12.5398"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="profile__set__param">
              <p>
                Email почта: <span>{props.info.UserInfo.Email}</span>
              </p>
              <svg
                onClick={() => props.changeName("ПОЧТА")}
                className="profile__set__param2"
                width="20px"
                height="20px"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.24112 16.8751H3.75C3.58424 16.8751 3.42527 16.8092 3.30806 16.692C3.19085 16.5748 3.125 16.4158 3.125 16.2501V12.7589C3.125 12.6769 3.14117 12.5956 3.17258 12.5198C3.20398 12.4439 3.25002 12.375 3.30806 12.317L12.6831 2.942C12.8003 2.82479 12.9592 2.75894 13.125 2.75894C13.2908 2.75894 13.4497 2.82479 13.5669 2.942L17.0581 6.43312C17.1753 6.55033 17.2411 6.7093 17.2411 6.87506C17.2411 7.04082 17.1753 7.19979 17.0581 7.317L7.68306 16.692C7.62502 16.75 7.55612 16.7961 7.48029 16.8275C7.40447 16.8589 7.32319 16.8751 7.24112 16.8751Z"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.625 5L15 9.375"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.46035 16.8351L3.16504 12.5398"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="profile__set__param">
              <p>
                Пароль: <span>{props.info.UserInfo.Password}</span>
              </p>
              <svg
                className="profile__set__param2"
                width="20px"
                height="20px"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.24112 16.8751H3.75C3.58424 16.8751 3.42527 16.8092 3.30806 16.692C3.19085 16.5748 3.125 16.4158 3.125 16.2501V12.7589C3.125 12.6769 3.14117 12.5956 3.17258 12.5198C3.20398 12.4439 3.25002 12.375 3.30806 12.317L12.6831 2.942C12.8003 2.82479 12.9592 2.75894 13.125 2.75894C13.2908 2.75894 13.4497 2.82479 13.5669 2.942L17.0581 6.43312C17.1753 6.55033 17.2411 6.7093 17.2411 6.87506C17.2411 7.04082 17.1753 7.19979 17.0581 7.317L7.68306 16.692C7.62502 16.75 7.55612 16.7961 7.48029 16.8275C7.40447 16.8589 7.32319 16.8751 7.24112 16.8751Z"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.625 5L15 9.375"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.46035 16.8351L3.16504 12.5398"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </ul>
        </div>
      </div>

      <div className="profile__set__block3">

          <button onClick={() => props.changeName("ПОЛ")} className="profile__set__editBtn">Изменить</button>

      </div>
    </div>
  );
}
