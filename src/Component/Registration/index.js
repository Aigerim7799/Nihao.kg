import React, { useState } from "react";
import "./Home.css";
import FQ from "../FQ";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Moreinfo from "../Moreinfo";

export default function Registration() {
  const [login, setLogin] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();

  const [toggleMoreinfo, setToggleMoreinfo] = useState(false);

  const moreinfo = () => {
    setToggleMoreinfo(!toggleMoreinfo);
  };
  const moreinfoclose = () => {
    if (toggleMoreinfo !== false) {
      setToggleMoreinfo(false);
    }
  };


  const history = useHistory();
  const Registration = async () => {
    const url = `http://otapi.net/service-json/RegisterUser?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=RegisterUser56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=72bff419-b333-4a17-bf11-ff046ec6b12d&userParameters=%3CUserRegistrationData%3E%3CPassword%3E${password}%3C/Password%3E%3CLogin%3E${login}%3C/Login%3E%3CEmail%3E${email}%3C/Email%3E%3CPhone%3E${phone}%3C/Phone%3E%3C/UserRegistrationData%3E`;
    axios.get(url).then((response) => {
      if (response.data.ErrorCode == "Ok") {
        let token = response.data.SessionId;
        localStorage.setItem("token", token);
        history.push("/");
        window.location.reload();
        localStorage.removeItem('token')
        alert('Войдите в свой профиль')
      }
    });
  };

  return (
    <div>
      <div className="homepage__app">
        <div className="homepage__wrap">
          <div id="homepage__wrapper">
          <div className="rgs__wrap">
            <div className='step1'>
              <div className="sign-header">
                <p> Регистрация</p>
              </div>
              <div className="signup-block">
                <div className='blocks'>
                  
                  
                    <div className="sign-form">
                      <input
                        placeholder='логин'
                        className="form"
                        labelText="login"
                        id="login"
                        type="text"
                        onChange={(e)=>setLogin(e.target.value)}
                      />
                      <input
                        placeholder='почта'
                        className="form"
                        labelText="Email"
                        id="email"
                        type="email"
                        onChange={(e)=>setEmail(e.target.value)}
                      />
                      <input
                        placeholder='пароль'
                        className="form"
                        labelText="Password"
                        id="password"
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                      />
                      <input
                        placeholder='номер телефона'
                        className="form"
                        labelText="phone"
                        id="phone"
                        type="phone"
                        onChange={(e)=>setPhone(e.target.value)}
                      />
                    </div>
                  
                  <div className='thirdblock'>
                    <p>длина пароля не менее 6 символов</p>
                    <div onClick={moreinfo} className="auth__sogl"><p>Условия соглашения</p></div>
                  </div>
                </div>
                <div className='divGo'>
                   <div className='Go' onClick={Registration}><p>Зарегистрировать</p></div>
                   <Link to='/Authorization' style={{textDecoration:'none'}} className="Go"><p>Войти</p></Link>
                </div>
                  
              </div>
            </div>
            <FQ/>
          </div>
        </div>
      </div>
      </div>
      {toggleMoreinfo ? (
        <Moreinfo moreinfo={moreinfo} moreinfoclose={moreinfoclose} />
      ) : null}
    </div>
  );
}