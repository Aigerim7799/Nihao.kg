import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router'
import './Exit.css'

export default function Exit() {
    const history = useHistory()
    
const exit = ()=>{
    localStorage.removeItem('token')
    history.push('/')
}
    return (
        <div>
            <div className="profile__ex__contentBox">
                <div className="profile__ex__block1">
                    <div className="profile__ex__name">
                        <button className='profile__ex__exit' onClick={exit}>Выход из аккаунта</button>   
                </div>
            </div>
        </div>
        </div>
    )
}
