import React, { useContext,useEffect, useState } from 'react';
//import CartContext  from '../../context/CartContext';
import AuthContext from '../../context/AuthContext'
import Header from './header/Header'
import Products from '../../components/products/Products'
import ProductsFetch from '../../hooks/ProductsFetch';
const Home = () => {

  
  const [catrgorys,setCategorys]=useState(null)
  const [category,setCategory]=useState(null)
  const {data,loading,error}=ProductsFetch("/top_selling?category="+category)
  useEffect(() => {
    if (data && data.result){
      var strings = data?.result.map(item => item?.category.split(/[&|]/));
      strings=strings.flat();
      let uniqueArray = [...new Set(strings)];
      setCategorys(uniqueArray.slice(-5))


    }
  }, [data])
  
  return (
    <div className='min-h-[500px]'>
      <div>
          <Header catrgorys={catrgorys} setCategory={setCategory}/>
      </div>
      <div className='mt-10 p-5'>
          <h2 className='text-[32px] font-semibold'>{category ? category:"Top Selling"}</h2>
        </div>
      
      <div className='mt-10'>
        
         <Products data={data.result} loading={loading} error={error}/>
      </div>

      
     
    </div>
  )
}

export default Home