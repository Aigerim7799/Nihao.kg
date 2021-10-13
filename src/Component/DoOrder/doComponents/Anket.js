import React from 'react';
import { NavLink } from 'react-router-dom';
import './DoComp.css';

function Anket({order}) {
  console.log(order)
  return (
    <div className="ank__wrap">
      <div className="ank__head">
        <p className="ank__headP">Информация о заказе и способы оплаты</p>
      </div>
      <div className="ank__content">
        <li className="ank__cntList">
          <p>
            <strong>Заказ №:</strong>
            {order?.Result?.Id}
          </p>
          <p>
            <strong>Состояние:</strong>
            {order?.Result?.StatusName}
          </p>
          <p>
            <strong>Адрес доставки:</strong>
            {order?.Result?.DeliveryAddress?.Address}
          </p>
          <p>
            <strong>К оплате:</strong>{' '}
            {order?.Result?.TotalAmount}{' '} {order?.Result?.CurrencySign}
          </p>
        </li>
        {/* <div className="ank__cancelDiv">
          <button className="ank__cancelBtn">Отменить заказ</button>
        </div> */}
        <div className="ank__linkDiv">
          <NavLink className="ank__link" to="/FAQ">
            Если вы не знаете про способы оплаты, нажмите сюда
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Anket;
