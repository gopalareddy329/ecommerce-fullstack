import React from 'react'
import { FaRupeeSign } from "react-icons/fa";
import { Link } from 'react-router-dom';
import StarRating from '../../rating/StarRating';
import ImgRender from '../../imgRender/ImgRender';
const Card = ({item,loading,numItems}) => {
    const changeImage = (e)=>{

        e.target.src="https://i.pinimg.com/originals/2e/60/07/2e60079f1e36b5c7681f0996a79e8af4.jpg"
    }
    const cardLoading = ()=>{
        return(
          <div className="w-[300px] skeleton  min-h-[400px] border border-gray-200 rounded-lg shadow flex flex-col justify-between">
                <div className='mb-15 pb-15' >
                    <div className="p-8 rounded-t-lg w-[300px] h-[250px] object-contain " />
                </div>
                <div className="px-5  ">
                    <div>
                        <div className="text-2xl w-full h-[40px] font-semibold tracking-tight text-gray-900 clamped-text skeleton"/>
                    </div>
                    <span className="text-xl font-bold text-gray-900 flex items-center skeleton"></span>
                    <div className="flex items-center mt-2.5 mb-5">
                        <div className="flex items-center space-x-1 w-[50%] h-[30px] rtl:space-x-reverse skeleton">
                        
                            
                        </div>
                    
                    </div>
                </div>
            </div>
        )
      }
  return (
    <div>
        {loading?(
                    <div className='flex flex-wrap justify-center  text-black     gap-5'>
                        {[...Array(numItems)].map((_,key)=>(<div key={key}>{cardLoading()}</div>))}
                    </div>
            ):(
            <Link to={`/products/${item?.product_id}`} className="w-full  min-h-[400px] border border-gray-200 rounded-lg shadow flex flex-col justify-between">
                <div className='mb-15 pb-15' >
                    <ImgRender className="p-8 rounded-t-lg w-[300px] h-[250px] object-contain" onError={(e)=>{changeImage(e)}} alt={item?.title} src={item?.thumbnail || item?.image_link }  />
                </div>
                <div className="px-5  ">
                    <div>
                        <h5 className="text-2xl font-semibold tracking-tight text-gray-900 clamped-text max-w-[200px]">{item?.title}{item?.name}</h5>
                    </div>
                    <span className="text-xl font-bold text-gray-900 flex items-center"><FaRupeeSign/>{item?.price }</span>
                    <div className="flex items-center mt-2.5 mb-5">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <StarRating   initialRating={item?.rating}/>
                            
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200  ms-3">{item?.rating}</span>
                    </div>
                </div>
            </Link>
        )}
    </div>
  )
}

export default Card