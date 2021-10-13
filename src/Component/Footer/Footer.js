import React from 'react'
import './Footer.css'
import goole from '../img/Google.png'
import twit from '../img/Twitter.png'
export default function Footer() {
    return (
        <div>
            <div className='Footer'>
                <div className='Footer_heder' >
                <p className='icon__f'><a href="#" className="google"> </a></p>
                <p className='icon__f'><a href="#" className="twitter"> </a></p>
                <p className='icon__f'><a href="#" className="tiktok"> </a></p>
                <p className='icon__f'><a href="#" className="telegram"> </a></p>
                <p className='icon__f'><a href="#" className="insatagram"> </a></p>
                <p className='icon__f'><a href="#" className="youtybe"> </a></p>
                <p className='icon__f'><a href="#" className="facebook"> </a></p>
                </div>
            </div>
        </div>
    )
}
