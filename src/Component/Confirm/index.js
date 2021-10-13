import React, { useState } from "react";
import { Link } from "react-router-dom";
import phone from "../../images/phone.png";
import Moreinfo from "../Moreinfo";
import './Registration.css'
import again from '../../images/again.png'
import FQ from "../FQ";

export default function Confirm() {
  const [toggleMoreinfo, setToggleMoreinfo] = useState(false);

  const moreinfo = () => {
    setToggleMoreinfo(!toggleMoreinfo);
  };
  const moreinfoclose = () => {
    if (toggleMoreinfo !== false) {
      setToggleMoreinfo(false);
    }
  };

  return (
    <div className='homepage__app'>
      <div className="homepage__wrap">  
        <div id="homepage__wrapper">
          <div className='step1'>
            <div className="sign-header">
              <p>Регистрация</p>
            </div>
            <div className="signup-block">
              <div className='blocks1' id='blocks'>

                <div className='lines1'>
                  <p>введите код *</p>
                  <input
                    className="enterInput"
                    labelText="Email"
                    id="email"
                    type="text"
                    placeholder='enter code'
                  />
                </div>
                <div className='line2'>
                  <div className="randomnumber">
                     <img src={again} alt='img' className='againRandom' /> 
                  </div>
                  
                </div>

               <section className='sectionSoglahenie'>
                  
                    <p className="line3"> Я принимаю пользовательское соглашение</p>
                    <div onClick={moreinfo} id='what'>?</div>
                   
               </section>
                 
                  
                 
               

              </div>


              <div className="buttonsflex">
                <Link to='/Registration'>
                  <button className='event1'>назад</button>
                </Link>
                <button className='event'>зарегистрироваться</button>
              </div>
            </div>

          </div>
          <FQ/>
        </div>
      </div>
      {toggleMoreinfo ? (
        <Moreinfo moreinfo={moreinfo} moreinfoclose={moreinfoclose} />
      ) : null}
    </div>
  );
}
