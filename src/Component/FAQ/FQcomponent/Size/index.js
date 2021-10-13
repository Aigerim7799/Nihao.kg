import React from 'react'
import './main.css'
import Size1 from '../../images/nihao_size1.png'
import Size2 from '../../images/nihao_size2.png'
import Size3 from '../../images/nihao_size3.png'
import Size4 from '../../images/nihao_size4.png'
import Size5 from '../../images/nihao_size5.png'

export default function Size() {
    return (
        <div className='fq-container-fq'>
        <p className='fq_tabs2'>Как подобрать нужный размер?</p>

<p className='size-text'>Таблицы соответствия международных размеров одежды и обуви помогут Вам подобрать правильный размер при покупке в интернете из Китая. Данная размерная таблица могут быть использована не всем товарам с нашего каталога, у большинство товаров на странице в разделе "Фото и Описание" имеются свои таблицы по размерам.</p>
        <img className='size-photo' src={Size1}/>
        <img className='size-photo' src={Size2}/>
        <img className='size-photo' src={Size3}/>
        <img className='size-photo' src={Size4}/>
        <img className='size-photo' src={Size5}/>
        </div>
    )
}
