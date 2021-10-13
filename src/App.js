import React, { useState } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Catalog from './Component/Catalog';
import Header from './Component/Header/index'
import Registration from './Component/Registration';
import Confirm from './Component/Confirm';
import Authorization from './Component/Authorization/index';
import Welcome from './Component/Welcome/Welcome';
import HomePage from './Component/HomePage';
import ProfileMain from './Component/Profile/ProfileMain';
import "./App.css"
import Footer from './Component/Footer/Footer';
import Basket from './Component/Basket';
import Favorites from './Component/Favorites';
import Fullinfo from './Component/Fullinfo';
import Output from './Component/Output';
import { GET_PRODUCT1, GET_PRODUCT2} from './config'
import {useHistory} from 'react-router-dom'
import FAQ from './Component/FAQ';
import Modal from './Component/Modal/Modal'
import Market from './Component/Market';
import DoOrder from './Component/DoOrder/index'

export default function App() {
  const history = useHistory()
  const [productname, setProductName] = useState()
  const [products, setProducts] = useState()
  const [id, setId] = useState()
  const [modal, setModal] = useState(false)

  const getProductByName= async(name)=>{
    const req = await fetch(GET_PRODUCT1 + name + GET_PRODUCT2)
    const resp = await req.json()
    resp && history.push('/Output')
    setProducts(resp.Result.Items.Items.Content)

}

  return (
    <div className="app__app">
    <BrowserRouter>
      <Header
        send1={getProductByName}
        setProductName={setProductName}
        productname={productname}
      />
      
      <Welcome/>
        <Switch>
        <Route exact path ='/' component={()=> <HomePage setId={setId} id={id} moreInfoModal={modal} setMoreInfoModal={setModal}  />}/>
          <Route exact path = '/Catalog' component={Catalog}/>
          <Route exact path ='/Registration' component={Registration}/>
          <Route exact path ='/Confirm-registration' component={Confirm}/>
          <Route exact path='/Authorization' component={Authorization}/>
          <Route exact path='/Welcome' component={Welcome}/>
          <Route exact path='/profile' component={ProfileMain}/>
          <Route exact path='/corzina' component={Basket}/>
          <Route exact path='/favorites' component={Favorites}/>
          <Route exact path='/fullinfo/:id' component={Fullinfo}/>
          <Route exact path='/FAQ' component={FAQ}/>
          <Route exact path='/DoOrder' component={DoOrder}/>
          <Route  exact path='/Output' component={()=><Output id={id} setId={setId} moreInfoModal={modal} setMoreInfoModal={setModal} products={products} />}/>
          <Route exact path='/Market/:name' component={Market}/>
        </Switch>
        <Modal id={id} setId={setId} moreInfoModal={modal} setMoreInfoModal={setModal}/>
        <Footer/>
   </BrowserRouter>
   </div>
  )
}