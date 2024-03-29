// ProductPage.js
import React, { useContext, useEffect, useState } from 'react';
import CartContext  from '../../context/CartContext';
import { useParams } from 'react-router-dom';
import ProductFetch from '../../hooks/ProductsFetch'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import StarRating from '../../components/rating/StarRating'
import { FaRupeeSign } from "react-icons/fa";
import Card from '../../components/products/card/Card'


function ProductView() {
  const { dispatch } = useContext(CartContext);
  const {id}=useParams()
  const {data,loading,error}=ProductFetch("https://dummyjson.com/products/"+id)
  const [currentImg,setCurrentImg]=useState(null)
  useEffect(()=>{
    console.log(data)
    if (!loading && !error && data && data.images && data.images.length > 0) {
      setCurrentImg(data.images[0]);
    }
  },[data,error,loading])
  
  

  const handleAddToCart = () => {
    const item = { id: data.id, name: data.title, price: data.price, quantity: 1 };
    dispatch({ type: 'ADD_TO_CART', payload: item });
    console.log("added")
  };

  return (
    <div className='mt-20'>
      <ContentWrapper className="flex justify-center">
          {loading ? (
            <div>
            <div className='flex gap-20 max-md:flex-col max-md:justify-center max-md:items-center '>
                <div className='md:w-[50%] max-md:flex-col flex gap-5 items-center justify-center skeleton shadow'>
                        <div className='md:w-[30%] max-md:order-2 max-md:flex '>
                          {[...Array(5)].map((_,key)=>(
                              <div className='' key={key}>
                                <div className='w-[500px] object-fit h-[100px]' />
                              </div>
                            ))}

                        </div>
                        <div className='md:w-[70%] '>
                              <div className='w-[600px] h-[300px]'/>
                        </div>
                  </div>
                  <div>
                        <div className='leading-[2.5rem] w-full border-b border-black'>
                            <div className=' w-[10rem] h-[30px] skeleton'/>
                            <div className='w-[15rem] h-[30px] mt-5 skeleton' />
                            <p className='w-[4rem] h-[30px] mt-5 skeleton'/>
                            <p className='w-[15rem] h-[30px] skeleton mt-5' />
                        </div>
                        
                        <button  className=' text-white w-[15rem] h-[40px] text-[24px] mt-5 skeleton'/>
                   </div>
               </div>
               <div className=' leading-[3rem]  px-5 my-20 font-[600]'>
                          <div>
                            <h3 className='text-red-500 border-l-[5px] border-red-500 p-2'>Related Item</h3>
                          </div>
                          <div className='text-black  mx-auto flex flex-row flex-wrap justify-center  gap-5'>               
                              <Card  numItems={4} loading={loading}/>
                              
                          </div>
                  </div>
               </div>
          ):(
            <div>
                <div className='flex gap-20 max-md:flex-col max-md:justify-center max-md:items-center'>
                   <div className='md:w-[50%] max-md:flex-col flex gap-5 items-center justify-center'>
                      <div className='md:w-[30%] max-md:order-2 max-md:flex'>
                        {data && data.images?.map((item,key)=>(
                            <div className='shadow' onClick={()=>{setCurrentImg(item)}} key={key}>
                              <img className='w-[400px] object-fit h-[100px]' src={item} alt={item.title}/>
                            </div>
                          ))}

                      </div>
                      <div className='md:w-[70%]'>
                          <img className='object-fit  min-w-[300px] h-fit min-h-[50px]' alt={data.title} src={currentImg}/>
                      </div>

                   </div>
                   <div className='max-md:flex flex-col w-[90%] md:w-[50%]'>
                        <div className='leading-[2.5rem] w-full border-b border-black'>
                            <h1 className='font-semibold text-[34px]'>{data.title}</h1>
                            <StarRating   initialRating={data?.rating}/>
                            <p className='font-semibold text-[18px] flex items-center'><FaRupeeSign/>{data.price}</p>
                            <p className='text-[12px]'>{data.description}</p>
                        </div>
                     
                        <button onClick={handleAddToCart} className='bg-red-500 text-white w-full max-w-[400px] mx-auto   text-[24px] mt-5 '>Add to Cart</button>
                   </div>

                </div>
                <div>
                  <div className=' leading-[3rem]  px-5 my-20 font-[600]'>
                          <div>
                            <h3 className='text-red-500 border-l-[5px] border-red-500 p-2'>Related Item</h3>
                          </div>
                          <div className='my-20 flex flex-wrap gap-5 justify-center items-center'>
                            {[...Array(4)].map((_,key)=>(
                              <div key={key} >
                                  <Card  item={data}/>

                              </div>
                            ))}
                            

                          </div>
                  </div>

                </div>
            </div>
          )}
      </ContentWrapper>
    </div>
  );
}

export default ProductView;
