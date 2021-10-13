import React from 'react'
import './company.css'

export default function Company() {
    return (
        <div className='fq-container-fq'>
        <h3 className='company-h3'>О компании</h3>
        <p className='company-p'><span className='company-nihao'>Nihao.KG</span> - поиск и доставка товаров из крупнейших интернет площадок Китая 1688.com и Taobao.com</p>

        <p className='company-fq-p'>Наш адрес офиса: <span className='company-p'>Кыргызстан, г. Бишкек ул. Токтогула №126 (пересекает ул. Логкиненко, вход сбоку)</span></p>
        <p className='company-fq-p'>Телефон и WhatsApp: <span className='company-p'>0 (552) 343655 </span>  </p>

        <p className='company-fq-p'>E-mail: <span className='company-p'>chinatrade.kg@mail.com</span></p>
        </div>
    )
}
