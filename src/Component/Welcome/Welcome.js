import React, { useEffect, useState } from 'react'
import "./Welcome.css";
import logo1 from "./images/logo1.png"
import plus from './images/Plus.png'
import Modal from '@material-ui/core/Modal';
import { Link, NavLink } from 'react-router-dom';



function getModalStyle() {
  const top = 50
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}



export default function Welcome() {


  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);
  const [changeLogin, setChangeLogin] = useState(false)
  const [changeWords, setchangeWords] = useState(false)
  const [changeX, setchangeX] = useState(false)



  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    let token = localStorage.getItem('token')

    if (token == undefined || token == null){
      setOpen(true)
    }else {
      setOpen(false)
    }
  },[])

  const body = (
    <div style={modalStyle} className='paper'>

    <div>
      <div className='mainBox'>
        <div className='closeTab'>
        <img className='plus' onMouseEnter={() => setchangeX(true)} onMouseOut={() => setchangeX(false)} src={plus}  
          onClick={()=>handleClose(false)}
        />
        </div>
        {changeX ?
          <div className='blurBox'>
            <div className='text'>
              <p>продолжить как <span className='china'>гость</span>?</p>
              <p>вам будет <span className='china'>ограничена</span> возможность в :</p>
              <p className='welcom_p'>самовывоз<br/>
              <del>доставка по городу</del><br/>
              <del>доставка вне города</del><br/>
                 подборки<br/>
                 акции<br/>
              <del>специальные предложения</del><br/>
              <del>корзина</del></p>

            </div>
          </div>
          : null}
        <div className="Main">

          <div className='leftPart'>
          <h2 className="advertisement"> крупнейший оптовый <br />интернет магазин <span className='china'>Китая</span>
          </h2>
          </div>

          <div className="RightPart">
            <img className="logo1" src={logo1} />
            <h2 className="advertisement1">
              Поиск и доставка товаров <br />
  из крупнейших интернет <br />
  площадок <span className='china'>Китая</span>
            </h2>   
            <Link to ='/Authorization'>  
            <button 
             onClick={()=>handleClose(false)}
            onMouseEnter={() => setChangeLogin(true)} onMouseOut={() => setChangeLogin(false)} className="enter_welcome_button"
            >{changeLogin ? 'Начнем покупки!' : 'Войти'}</button>
            </Link> 
            <Link to='/Registration'>
            <button 
             onClick={()=>handleClose(false)}
            onMouseEnter={() => setchangeWords(true)} onMouseOut={() => setchangeWords(false)} className="registration">{changeWords ? 'больше возможностей и удобств' : 'Зарегистрироваться'}</button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}