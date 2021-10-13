import React, { useState } from 'react'
import {Container} from 'react-bootstrap'
import {category} from '../../state.js'
import './Category.css'
const List =(props)=>{
    const [block,setBlock] = useState(false)
    return(
            <div className = {block ? 'category_block' : 'category_block active'} onClick = {()=>{setBlock(false)}}>{props.key}
                <button className = 'category_svg' >{props.img}</button><p className='category_title'>{props.title}</p>
            </div>
    )
}
export default function Category() {
    return (
        <div className="category_wrap">
            <div className = 'category_line'>
                <p className= 'category_text'>Категория</p>
            </div>
                        <div className='category_wrapper'>
                                {
                                    category.map((el,index)=>{
                                        return(
                                        <List img={el.img} title={el.title} option={el.image} key={index}/>
                                        )
                                    })
                                }
                        </div>    
        </div>
    )
}
