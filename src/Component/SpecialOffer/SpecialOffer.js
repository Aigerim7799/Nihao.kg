import React from 'react';
import { Container } from 'react-bootstrap';
import './SpecialOffer.css';
import { offer } from '../../state';

let Offer = (props) => {
  return (
    <div
      onClick={() => {
        props.setActive(true);
      }}
      className="Special_block">
      {' '}
      {props.key}
      <div className="srecial__upDiv">
        <img className="Special_img" src={props.img} />
        <p className="Special_text">{props.text}</p>
      </div>
      <div className="Special_block_red">
        <p className="Special_price">{props.price}</p>
        <span className="Special_like">{props.like}</span>
      </div>
    </div>
  );
};
export default function SpecialOffer(props) {
  return (
    <div className="Specail_wrap">
      <div className="SpecialOffer_line">
        <p className="SpecialOffer_text">Специальное предложение</p>
      </div>
      <div className="SpecialOffer_wrapper">
        {offer.map((el, index) => {
          return (
            <Offer
              img={el.img}
              text={el.text}
              like={el.like}
              price={el.price}
              key={index}
              setActive={props.setActive}
              active={props.active}
            />
          );
        })}
      </div>
    </div>
  );
}
