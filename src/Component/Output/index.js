
import { Title } from "@material-ui/icons";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./Output.css";
import { NavLink } from "react-router-dom";

const OutputItem = (props) => {
  return (
    <NavLink to={'/fullinfo/'+props.el?.Id} className='output_item_block'>
      <div>
        <p className="output_item_title">
          {props.el.Title.length > 41 ? props.el.Title.substring(0, 41) + '...' : props.el.Title}
        </p>
        <img className="output_item_img" src={props.el.Pictures[0].Medium.Url} alt="img" />
        <div className="output_item_priceDiv">
          <p>Цена:</p>{' '}
          <p className="output_item_price">
            {props.el.Price.ConvertedPriceWithoutSign}
            {props.el.Price.CurrencySign}
          </p>
        </div>
        <div className="output_item_shopDiv">
          <p>Магазин:</p>
          <p className="output_item_shop">{props.el.ProviderType}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default function Output(props) {
  return (
    <div>
      <div className="homepage__app">
        <div className="homepage__wrap">
          <div id="homepage__wrapper">
            <div className="output__content">
              <div className="output__head">
                <p>Товары по поиску</p>
              </div>
              <div className="output__items">
                {props.products &&
                  props.products.map((el) => {
                    return (
                      <OutputItem
                        id={props.id}
                        setId={props.setId}
                        setMoreInfoModal={props.setMoreInfoModal}
                        el={el}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
