import React, { useState } from 'react'
import Dashboard from './pages/dashboard'
import Cart from './pages/Cart'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/home'
import productdata from './data/data'
const App = () => {

  const [products]=useState(productdata.arrayOfProducts)
  const [check,setCheck]=useState(false)
  return (
    <div>
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<Home  products={products} check={check} setCheck={setCheck} />} />
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
