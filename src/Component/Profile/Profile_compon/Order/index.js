import React from 'react'
import './Order.css'
import OrderItem from './OrderItems/OrderItem'

export default function Order() {
    return (
        <div>
            <div className="profile__order__contentBox">
                <div className="profile__order__block1">
                    <div className="profile__order__name">
                        <p>мои заказы</p>
                        <span className="profile__order__line"></span>
                    </div>
                    
                </div>
                <div className="profile__order__block2">
                        <OrderItem/>
                        <OrderItem/>
                        <OrderItem/>
                        <OrderItem/>
                        <OrderItem/>
                </div>
            </div>
        </div>
    )
}
