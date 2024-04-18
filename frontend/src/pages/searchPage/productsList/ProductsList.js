import React, { useEffect } from 'react'
import Img from '../../../components/imgRender/ImgRender'
import { FaRupeeSign } from "react-icons/fa";
import StarRating from '../../../components/rating/StarRating';
import { Link } from 'react-router-dom';
const ProductsList = ({data}) => {
    
  return (
    <div className='p-2'>
        {data?.result?.map((item,index)=>(
        <Link to={`/products/${item?.product_id}`}  key={index} className='h-[300px] border-b border-solid border-1 my-5'>
    
            <div className='flex md:gap-2'>
                <div className='w-[70%] min-w-[300px] max-w-[400px]  '>
                    <Img className="p-8 max-w-[400px]  w-full  rounded-t-lg  h-[250px] object-contain" alt={item?.title} src={item?.thumbnail || item?.image_link }  />
                </div>
                
                <div className='flex flex-col gap-5'>
                    <h1 className='clamped-text tracking-tight'>{item?.name}</h1>
                    <span className="text-xl font-[500] text-gray-900 flex items-center"><FaRupeeSign/>{item?.price }</span>
                    
                    <div className="flex items-center mt-2.5 mb-5">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                <StarRating   initialRating={item?.rating}/>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200  ms-3">{item?.rating}</span>
                        
                    </div>
                    
                </div>
                
                
                    
            </div>
            
        </Link>))}   
    </div>
  )
}

export default ProductsList