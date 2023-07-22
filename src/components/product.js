import React from 'react'
import {FaRupeeSign} from 'react-icons/fa'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { NumericFormat } from 'react-number-format';

const Product = ({items,updatecart}) => {

  const cartred= useSelector((state)=>state.cart)
  var quantity=0;
  cartred.map((item)=>{
    if(item.id===items.id){
      quantity=item.quantity
      
    }
    return null
  })
  return (
    <div style={{boxShadow: '2px 2px 5px 2px rgba(0, 0, 0, 0.15)',color:`black`,backgroundColor:`white`}} className={` border-2 my-2 relative  min-w-[200px] h-full   max-md:w-[50%]   rounded-[20px]`}>
            <img className='p-2 h-[300px] object-contain mx-auto' src={items.imgUrl} alt='img-6'/>
            <div className=' flex items-center justify-between  p-2    font-bold  w-[100%] h-[40px] '>
                <p className='flex items-center'><span><FaRupeeSign/></span><NumericFormat value={items.price}  thousandSeparator={true} displayType="text"/></p>
                
                <button  onClick={()=>updatecart(items,1)} className=' p-4 flex items-center justify-center h-full '>Add{(quantity > 0) ? `(${quantity})`: null}</button>
            </div>
    </div>
  )
}

export default Product
