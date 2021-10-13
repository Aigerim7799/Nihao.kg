import React, { useEffect, useState } from 'react'
import {offer}from '../../state'
import price from './Price.module.css'
import Offer from './Offer/Offer'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function Price(props) {
    const [promotion, setPromotion]=useState()

    return (

        <div className={price.price_wrap}>
        <div className={price.price_line}>
            <p className={price.Price_text}>Акции</p>
        </div>
        <div className={price.price__item}>
                {
                    offer.map((el,index)=>{
                        return(
                        <Offer items={props.items} setActive={props.setActive} active = {props.active}/>
                        )
                    })
                }
        </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
      items: state.items,
    };
  };
  export default connect(mapStateToProps)(Price)