import React from 'react'
import './main.css'

export default function Calculator() {
    return (
        <div>
        <p className='fq_tabs'>Калькулятор</p>
            <div className='fq_line'>
                <p>Цена товара*</p>
                <input className='fq_calc'/>
                <input type='' className='fq_check'/>
            </div>
            <div className='fq_line'>
                <p>Страна*</p>
                <input className='fq_check'/>
            </div>
            <div className='fq_line'>
                <p>Вес (кг)*</p>
                <input className='fq_calc'/>
            </div>
            <div className='fq_line'>
                <input className='fq_button' type='button' value='Рассчитать'/>
            </div>
        </div>
    )
}
