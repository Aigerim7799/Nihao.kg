import React,{useEffect, useState}from 'react'
import Banner from './Banner/Banner';
import Category from './Category/Category';
import Modal from './Modal/Modal' 
import './HomePage.css'
import Catalog from './Catalog';
import FQ from './FQ';


function HomePage(props) {
  

  return (
    <>
    <div className='homepage__app'>
    <div className = 'homepage__wrap'>
    <div id = 'homepage__wrapper'>
        <Banner/>
        <Catalog id={props.id} setId={props.setId} setMoreInfoModal={props.setMoreInfoModal}/>
        <FQ/>
    </div>
    </div>
    </div>
    
    </>
  )
}

export default HomePage;


