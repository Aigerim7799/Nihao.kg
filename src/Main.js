import React,{useState}from 'react'
import './App.css';
import Banner from './Banner/Banner';
import Category from './Category/Category';
import SpecialOffer from './SpecialOffer/SpecialOffer';
import Price from './Price/Price'
import Header from './Header';
import Modal from './Modal/Modal'
import Bastellers from './Bastellers/Bastellers';
function Main(props) {
  const [modal, setModal] = useState(false)
  return (
    <>
   <Header/>
    <div className='App'>
    <div className = 'blur_wrap'>
    <div id = 'wrapper'>
        <Banner/>
        <Category category={props.category}/>
        <SpecialOffer />
        <Price active={modal} setActive={setModal}/>
        <Bastellers />
    </div>
    </div>
    </div>
    <Modal active ={modal} setActive={setModal}/>
    </>
  )
}

export default Main;


