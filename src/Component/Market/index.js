import { NavLink } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import './Market.css';
import loader from '../../images/load.gif';

export default function Market(props) {
  const [market, setMarket] = useState();
  const [vendorInfo, setVendorInfo] = useState();

  useEffect(() => {
  
    getMarket();
    getVendorInfo();
  }, []);

  const API =`http://otapi.net/service-json/BatchSearchItemsFrame?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=GetCategorySubcategoryInfoList56aa1311-6901-46e7-a0e8-a5445f74986cru20210430011102123123&timestamp=20210430011102&xmlParameters=<SearchItemsParameters><VendorId>${props.match?.params?.name}</VendorId></SearchItemsParameters>&framePosition=0&frameSize=15&blockList=Vendor`;

  const getMarket = async () => {
    const req = await fetch(API);
    const resp = await req.json();
    setMarket(resp);
  };

  const getVendorInfo = async () => {
    const url =`http://otapi.net/service-json/GetVendorInfo?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=GetVendorInfo56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&vendorId=${props?.match?.params?.name}`;
    const req = await fetch(url);
    const res = await req.json();
    setVendorInfo(res);

  };

  return (
    <div className="homepage__app">
      <div className="homepage__wrap">
        <div id="homepage__wrapper">
          <div className="market__contentBox">
            <div className="market__head">
              <p className="market__headP">Товары поставщика</p>
              {}
            </div>
            {vendorInfo ? (
              <div
                style={{
                  width: '97%',
                  margin: 'auto',
                  background: 'white',
                  boxShadow: 'var(--shadow)',
                  display: 'flex',
                  margin: '10px auto',
                }}>
                <img
                  style={{ width: '15%', height: '90%', margin: 'auto 8% ' }}
                  src={vendorInfo.VendorInfo.DisplayPictureUrl}
                />
                <div style={{ width: '35%' }}>
                  <p>
                    Поставщик: <strong>{vendorInfo.VendorInfo.Name}</strong>
                  </p>
                  <p>
                    Магазин: <strong>{vendorInfo.VendorInfo.ShopName}</strong>
                  </p>
                  <p>
                    Город: <strong>{vendorInfo.VendorInfo.Location.City}</strong>
                  </p>
                  <p>
                    Отзывы: <strong>{vendorInfo.VendorInfo.Credit.TotalFeedbacks}</strong>
                  </p>
                </div>
                <div style={{ width: '35%' }}>
                  <h4>Рейтинги:</h4>
                  <p>
                    Доставка: <strong>{vendorInfo.VendorInfo.Scores.DeliveryScore}</strong>
                  </p>
                  <p>
                    Обслуживание: <strong>{vendorInfo.VendorInfo.Scores.ServiceScore}</strong>
                  </p>
                  <p>
                    Оценка товаров: <strong>{vendorInfo.VendorInfo.Scores.ItemScore}</strong>
                  </p>
                </div>
              </div>
            ) : (
              <p>Поставщик</p>
            )}
            <div className="market__contentBox2">
              {market ? (
                market?.Result.Items.Items?.Content.map((el, index) => {
                  return (
                    <>
                      <NavLink to={'/fullinfo/' + el?.Id} key={index} className="market__item">
                        <p className="market__item_name">
                          {el.Title.length > 35 ? el.Title.slice(0, 35) + '...' : el.Title}
                        </p>
                        <img className="market__item_img" src={el.Pictures[0].Medium.Url} />
                        <p className="market__item_price">
                          Цена:{' '}
                          <strong>
                            {el.Price.ConvertedPriceWithoutSign + ' ' + el.Price.CurrencySign}
                          </strong>
                        </p>
                        {/*
                        <p className="market__item_vendor">
                           Поставщик: <strong>{el.VendorName}</strong>
                          {' '}
                        </p>*/}
                      </NavLink>
                    </>
                  );
                })
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '400px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <img src={loader} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
