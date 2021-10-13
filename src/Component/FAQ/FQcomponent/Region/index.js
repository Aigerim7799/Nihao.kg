import React from 'react'
import './main.css'

export default function Region() {
    return (
        <div className='fq-container-fq'>
        <p className='fq_tabs_fq'>Контакты</p>
        <p className='fq_table_region'>Вы находитесь в другом регионе нашей страны? </p>

        <p className='fq_table'>Хотели бы сделать заказ, оплатить и получить заказ в своем городе?</p> 
<hr/>
<p className='region-text'>Это возможно с нашей новой услугой отправки заказов в регионы. Вам также, как и всем клиентам, необходимо сделать заказ и оплатить его.</p>
<p className='fq_table_region'>Условия отправки в регионы:</p>
<p className='region-text'>Отправка в города (г. Ош, Жалал-Абад, Нарын, Балыкчи, Чолпон-Ата, Каракол, Талас и др. города) осуществляется междугородними такси. Вы получаете свои заказы с тот же день с момента отправки. 
</p>
<p className='region-text' style={{fontStyle:'italic'}}>Не ограничивай себя!!! Закажи у нас и будь оригинальным!!! </p>
        </div>
    )
}
