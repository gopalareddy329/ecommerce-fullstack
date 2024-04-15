import React, { useEffect, useState } from 'react';
//import CartContext  from '../../context/CartContext';
//import AuthContext from '../../context/AuthContext'
import Header from './header/Header'
import Products from '../../components/products/Products'
import ProductsFetch from '../../hooks/ProductsFetch';
const Home = () => {

  
  const [catrgorys,setCategorys]=useState(null)
  const [category,setCategory]=useState(null)
  const {data,loading,error}=ProductsFetch("/top_selling?category="+category)
  useEffect(() => {
    const selectRandomElements = (arr, count) => {
      const result = [];
      const length = arr.length;
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * length);
        result.push(arr[randomIndex]);
      }
      return result;
    };
    if (data && data.result){
      var strings = data?.result.map(item => item?.category.split(/[&|]/));
      strings=strings.flat();
      let uniqueArray = [...new Set(strings)];
      let a=selectRandomElements(uniqueArray,5)
      setCategorys(a)


    }
  }, [data])
  
  return (
    <div className='min-h-[500px] mb-20'>
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