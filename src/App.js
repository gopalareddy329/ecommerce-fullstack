import React, { useState,useEffect } from 'react'
import Dashboard from './pages/dashboard'
import Cart from './pages/Cart'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/home'
import productdata from './data/data'
import Shopping from './pages/shopping'
import { addtocart ,updatetocart} from './redux/cartReducer';
import {  useDispatch,useSelector } from 'react-redux';

const App = () => {

  const [products]=useState(productdata.arrayOfProducts)
  const [check,setCheck]=useState(false)
  const cartred= useSelector((state)=>state.cart)
    
    const dispatch=useDispatch()
  useEffect(()=>{
    async function getdata(){
        if(check===false){
             await (
              products.slice(0,25).sort(()=>(Math.random() - 0.5))
              )
              console.log(products)
             setCheck(true)
            }
    }
    getdata()
},[check,setCheck,products])

    function updatecart({...item},change){

      let isPresent= false
      cartred.forEach((items)=>{
          if(items.id === item.id){
              isPresent=true;
              
          }

      })
      if (isPresent){dispatch(updatetocart({id:item.id,change:change}))}
      else{dispatch(addtocart({...cartred,title:item.name,quantity:1,id:item.id,price:item.price,url:item.imgUrl}))}
      
    
    }
  return (
    <div>
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<Home  products={products} check={check} updatecart={updatecart}/>} />
              <Route path="/cart" element={<Cart />}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/shopping" element={<Shopping products={products} check={check} updatecart={updatecart}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
