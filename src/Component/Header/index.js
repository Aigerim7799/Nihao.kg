import React, { useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import logo from '../../images/nihao.png';

export default function Header(props) {
  const [name, setName] = useState('');
  const getName = () => {
    props.send1(name);
  };
  return (
    <div className="header__header">
      <NavLink to="/">
        <img src={logo} className="header__logo" alt="" />
      </NavLink>
      <div className="header__general">
        <p className="header__description">
          Поиск и доставка товаров из крупнейших интернет площадок Китая
        </p>
        <div>
          <NavLink to="/Output">
            <form className="header__src">
              <input
                type="text"
                placeholder="Поиск среди 800 000 000 товаров из Китая"
                className="header__inp"
                value={name}
                onChange={(e) => setName(e.target.value )}
              />
              <button className="header__btn" onClick={name !== '' ?  getName : null}>
                <svg
                  className="header__lupa"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.3281 19.5312C15.8586 19.5312 19.5312 15.8586 19.5312 11.3281C19.5312 6.79766 15.8586 3.125 11.3281 3.125C6.79766 3.125 3.125 6.79766 3.125 11.3281C3.125 15.8586 6.79766 19.5312 11.3281 19.5312Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.1289 17.1289L21.8751 21.8751"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </NavLink>
        </div>

        <div className="header__downBlock">
          <div className="header__leftPoints">
            <NavLink to="/corzina">
              <svg
                className="header__corzina header__point"
                viewBox="0 0 31 30"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M31 0H1V30H31V0Z" fill="white" />
                <path
                  d="M5.6875 7.5H26.1268C26.2641 7.5 26.3997 7.53016 26.5241 7.58835C26.6485 7.64655 26.7585 7.73135 26.8465 7.83676C26.9345 7.94218 26.9983 8.06564 27.0333 8.1984C27.0683 8.33117 27.0737 8.47001 27.0492 8.60511L25.0049 19.8551C24.9656 20.0711 24.8518 20.2665 24.6832 20.4072C24.5147 20.5479 24.3021 20.625 24.0825 20.625H8.86546C8.64599 20.625 8.43348 20.548 8.26494 20.4074C8.09641 20.2668 7.98254 20.0716 7.94316 19.8557L4.97552 3.58181C4.93614 3.36591 4.82227 3.17066 4.65374 3.03008C4.48521 2.8895 4.27269 2.8125 4.05323 2.8125H1.9375"
                  fill="white"
                />
                <path
                  d="M5.6875 7.5H26.1268C26.2641 7.5 26.3997 7.53016 26.5241 7.58835C26.6485 7.64655 26.7585 7.73135 26.8465 7.83676C26.9345 7.94218 26.9983 8.06563 27.0333 8.1984C27.0683 8.33117 27.0737 8.47001 27.0492 8.60511L25.0049 19.8551C24.9656 20.0711 24.8518 20.2665 24.6832 20.4072C24.5147 20.5479 24.3021 20.625 24.0825 20.625H8.86546C8.64599 20.625 8.43348 20.548 8.26494 20.4074C8.09641 20.2668 7.98254 20.0716 7.94316 19.8557L4.97552 3.58181C4.93614 3.36591 4.82227 3.17066 4.65374 3.03008C4.48521 2.8895 4.27269 2.8125 4.05323 2.8125H1.9375"
                  stroke="#FF0000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.4375 26.7188C10.2142 26.7188 10.8438 26.0892 10.8438 25.3125C10.8438 24.5358 10.2142 23.9062 9.4375 23.9062C8.66085 23.9062 8.03125 24.5358 8.03125 25.3125C8.03125 26.0892 8.66085 26.7188 9.4375 26.7188Z"
                  fill="#FF0000"
                />
                <path
                  d="M23.5 26.7188C24.2767 26.7188 24.9062 26.0892 24.9062 25.3125C24.9062 24.5358 24.2767 23.9062 23.5 23.9062C22.7233 23.9062 22.0938 24.5358 22.0938 25.3125C22.0938 26.0892 22.7233 26.7188 23.5 26.7188Z"
                  fill="#FF0000"
                />
              </svg>
            </NavLink>
            <NavLink to="/favorites">
              <svg
                className="header__heart header__point"
                viewBox="0 0 26 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13 22.3125C13 22.3125 1.28125 15.75 1.28125 7.78126C1.28149 6.37282 1.76952 5.00794 2.66236 3.91866C3.5552 2.82938 4.79774 2.08295 6.17874 1.80627C7.55973 1.52959 8.99393 1.73974 10.2375 2.40099C11.481 3.06224 12.4572 4.13377 13 5.43341L13 5.43342C13.5428 4.13378 14.5189 3.06224 15.7625 2.40099C17.0061 1.73974 18.4403 1.52959 19.8213 1.80627C21.2023 2.08295 22.4448 2.82938 23.3376 3.91866C24.2305 5.00794 24.7185 6.37282 24.7188 7.78126C24.7188 15.75 13 22.3125 13 22.3125Z"
                  stroke="#FF0000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NavLink>
            <NavLink to="/profile">
              <div className="header__user header__point">
                <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 0H0V30H30V0Z" strokeWidth="0" />
                  <path
                    d="M15 18.75C19.1421 18.75 22.5 15.3921 22.5 11.25C22.5 7.10786 19.1421 3.75 15 3.75C10.8579 3.75 7.5 7.10786 7.5 11.25C7.5 15.3921 10.8579 18.75 15 18.75Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.63086 25.3114C4.78347 23.3164 6.4408 21.6598 8.43635 20.508C10.4319 19.3563 12.6954 18.75 14.9995 18.75C17.3035 18.75 19.567 19.3564 21.5626 20.5082C23.5581 21.6599 25.2154 23.3166 26.3679 25.3116"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="header__inputText">Войти</p>
            </NavLink>
          </div>
          <div className="header__rightPoints">
            <NavLink to="/Registration">Зарегистрироваться</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
