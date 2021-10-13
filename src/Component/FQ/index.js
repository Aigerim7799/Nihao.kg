import React from 'react'
import { Link } from 'react-router-dom'
import FAQ from '../FAQ'
import phone from '../images/phone.png'
import './FQ.css'

export default function FQ() {



    return (
        <div className="question-card">     
            <div className="question-header">
              <p> Ответы на самые частые вопросы</p>
            </div>
            <div className='Q-card'>
              <img className="phone" src={phone} alt="img" />
         
            <div className="step">
              <Link to="/FAQ"><div className="question">
                <p>Как сделать заказ</p>
              </div>
              </Link>
              <Link to="/FAQ"><div className="question">
                <p>Как оплатить заказ</p>
              </div>
              </Link>
              <Link to="/FAQ"><div className="question">
                <p>Доставка</p>
              </div>
              </Link>
              <Link to="/FAQ"><div className="question">
                <p>Гарантии</p>
              </div>
              </Link>
              <Link to="/FAQ"><div className="question">
                <p>О компании</p>
              </div>
              </Link>
              </div>
            </div>
          </div>
    )
}
