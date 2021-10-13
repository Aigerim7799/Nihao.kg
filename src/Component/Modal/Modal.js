import React, { useState, useEffect } from 'react';
import './Modal.css';
import { Carousel } from 'react-bootstrap';
import nout from './images/nout.png';
import krestik from './images/krestik.svg';
import { NavLink, Link } from 'react-router-dom';
// import NavLink from 'react-router-dom'

export default function Modal(props) {
  const [count, setCount] = useState(1);
  const [count1, setCount1] = useState(1);
  const [contentBtn, setContentBtn] = useState(false);

  const [noneFullInfo, setNoneFullInfo] = useState();
  const [noneInfo, setNoneInfo] = useState();

  useEffect(() => {
    if (props.moreInfoModal == true && props?.id) {
      getNoneFullInfo(props?.id);
    } else {
      return null;
    }
  }, [props?.id]);

  if (count < 1) setCount(1);

  const moreDetail = (e) => {
    props.setMoreInfoModal(false);
  };

  const token = localStorage.getItem('token');

  const getNoneFullInfo = async (id) => {
    const url =
      'http://otapi.net/service-json/GetItemFullInfo?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=GetCategorySubcategoryInfoList56aa1311-6901-46e7-a0e8-a5445f74986cru20210430011102123123&timestamp=20210430011102&itemId=' +
      id;
    const req = await fetch(url);
    const res = await req.json();
    setNoneFullInfo(res?.ErrorCode === 'Ok' ? res : null);
    setNoneInfo(res?.ErrorCode === 'Ok' ? res.OtapiItemFullInfo : null);
  };

  const addItemToBasket = async (id, cId) => {
    const url = `http://otapi.net/service-json/AddItemToBasket?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=RegisterUser56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=${token}&itemId=${id}&configurationId=${cId}&quantity=1&fieldParameters=%3CFields/%3E`;
    const req = await fetch(url);
    const res = await req.json();
  };
  const addItemToNote = async (id, cId) => {
    const url = `http://otapi.net/service-json/AddItemToNote?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=RegisterUser56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=${token}&itemId=${id}&configurationId=${cId}&quantity=1&fieldParameters=%3CFields/%3E`;
    const req = await fetch(url);
    const res = await req.json();
  };

  return (
    <div
      className={props.moreInfoModal ? 'moreinfo__modal active' : 'moreinfo__modal'}
      onClick={() => props.setMoreinfoModal(false)}>
      <div
        className={props.moreInfoModal ? 'modal__content active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}>
        <div className="modal_content">
          <div className="modal_header">
            <p>Быстрый просмотр</p>
            <img
              src={krestik}
              className="krestik"
              alt="img"
              onClick={() => {
                props.setMoreInfoModal(false);
              }}
            />
          </div>
          <div className="modal_tree">
            <div className="block_left">
              <div>
                <Carousel className="carousel_modal">
                  {noneFullInfo?.OtapiItemFullInfo.Pictures.map((el) => {
                    return (
                      <Carousel.Item className="modal__img">
                        <img className="fvc-pViewImgMain" src={el.Url} alt="" />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>
              <NavLink to={'/fullinfo/' + noneFullInfo?.OtapiItemFullInfo?.Id}>
                <button
                  onClick={(e) => moreDetail()}
                  onMouseEnter={() => setContentBtn(true)}
                  onMouseLeave={() => setContentBtn(false)}
                  className="modal_button">
                  {contentBtn == false ? 'узнать больше' : 'полный просмотр'}
                </button>
              </NavLink>
            </div>
            <div className="block_right">
              {noneFullInfo ? (
                <div className="modal_words">
                  <p>{noneFullInfo?.OtapiItemFullInfo.Title}</p>
                </div>
              ) : (
                <></>
              )}

              {noneFullInfo ? (
                <div className="bagpiece">
                  <p>Цена товара : {noneFullInfo?.OtapiItemFullInfo.Price.ConvertedPrice}</p>
                </div>
              ) : (
                <></>
              )}
              <div className="modal_icons">
                <div
                  className="modal_basket"
                  onClick={() => addItemToBasket(noneInfo.Id, noneInfo.ConfiguredItems[0].Id)}>
                  <svg
                    className="modal_basketSvg"
                    width="60"
                    height="60"
                    viewBox="0 0 47 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      className="modal_basketIcon"
                      d="M7.88391 11.793H38.9107C39.1192 11.793 39.3251 11.8388 39.5139 11.9271C39.7027 12.0155 39.8697 12.1442 40.0033 12.3042C40.1369 12.4642 40.2337 12.6516 40.2868 12.8532C40.34 13.0547 40.3482 13.2655 40.3109 13.4706L37.2077 30.5481C37.1481 30.876 36.9753 31.1726 36.7194 31.3862C36.4636 31.5998 36.1408 31.7167 35.8075 31.7167H12.708C12.3749 31.7167 12.0523 31.5999 11.7965 31.3865C11.5406 31.1731 11.3678 30.8767 11.308 30.5489L6.80312 5.84519C6.74335 5.51744 6.57049 5.22105 6.31466 5.00765C6.05882 4.79425 5.73623 4.67737 5.40308 4.67737H2.19141"
                      stroke="#FF0000"
                      strokeWidth="3.036"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      className="modal_basketIcon"
                      d="M13.5761 40.967C14.755 40.967 15.7108 40.0113 15.7108 38.8323C15.7108 37.6534 14.755 36.6976 13.5761 36.6976C12.3971 36.6976 11.4414 37.6534 11.4414 38.8323C11.4414 40.0113 12.3971 40.967 13.5761 40.967Z"
                      fill="#FF0000"
                    />
                    <path
                      className="modal_basketIcon"
                      d="M34.9218 40.967C36.1008 40.967 37.0565 40.0113 37.0565 38.8323C37.0565 37.6534 36.1008 36.6976 34.9218 36.6976C33.7428 36.6976 32.7871 37.6534 32.7871 38.8323C32.7871 40.0113 33.7428 40.967 34.9218 40.967Z"
                      fill="#FF0000"
                    />
                  </svg>
                  <div className="modal_basketItem modal_basketName">
                    <p>в корзину</p>
                  </div>
                </div>

                <div
                  className="modal_basket"
                  onClick={() => addItemToNote(noneInfo.Id, noneInfo.ConfiguredItems[0].Id)}>
                  <svg
                    className="modal_basketSvg"
                    width="60"
                    height="60"
                    viewBox="0 0 47 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      className="modal_basketIcon"
                      d="M23.5371 38.5884C23.5371 38.5884 5.74805 28.6266 5.74805 16.53C5.74841 14.392 6.48923 12.3201 7.84457 10.6666C9.1999 9.01304 11.0861 7.87996 13.1824 7.45995C15.2788 7.03995 17.4559 7.35896 19.3436 8.36273C21.2313 9.36651 22.7132 10.9931 23.5371 12.966L23.5371 12.966C24.3611 10.9931 25.8429 9.36652 27.7306 8.36274C29.6183 7.35896 31.7954 7.03995 33.8918 7.45995C35.9881 7.87995 37.8743 9.01304 39.2296 10.6666C40.585 12.3201 41.3258 14.392 41.3262 16.53C41.3262 28.6266 23.5371 38.5884 23.5371 38.5884Z"
                      stroke="#FF0000"
                      strokeWidth="3.036"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="modal_basketItem modal_basketName">
                    <p>сохранить</p>
                  </div>
                </div>
                {/* <Link to='/profile'>
                  <div className="modal_basket">

                  <svg className='modal_basketSvg' width="60" height="60" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className='modal_basketIcon' d="M23.5373 29.3823C29.8251 29.3823 34.9223 24.2851 34.9223 17.9973C34.9223 11.7095 29.8251 6.6123 23.5373 6.6123C17.2496 6.6123 12.1523 11.7095 12.1523 17.9973C12.1523 24.2851 17.2496 29.3823 23.5373 29.3823Z" stroke="#FF0000" strokeWidth="3.036" strokeLinecap="round" strokeLinejoin="round" />
                    <path className='modal_basketIcon' d="M6.28125 39.3425C8.03091 36.3141 10.5467 33.7993 13.576 32.051C16.6052 30.3027 20.0412 29.3823 23.5388 29.3823C27.0364 29.3824 30.4724 30.3028 33.5016 32.0512C36.5308 33.7996 39.0465 36.3144 40.7961 39.3429" stroke="#FF0000" strokeWidth="3.036" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                  <div className="modal_basketItem modal_basketName">
                    <p>профиль</p>
                  </div>
                   </div>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
