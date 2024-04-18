import React, { useContext, useState } from 'react'
import {API_BASE} from '../../../utlis/api'
import AuthContext from '../../../context/AuthContext'
import {  toast } from 'react-toastify';
const AddproductPage = () => {
  const [fetchImg,setFetchImg]=useState('')
  const [headerImg,setHeaderImg]=useState('')
  const [isChecked, setIsChecked] = useState(false);
  const {authToken} = useContext(AuthContext)

  const handelSubmit = async(e) =>{
    e.preventDefault()
    try{
      const res=await fetch(API_BASE+'/add_products/',{
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'Authorization':'Bearer '+String(authToken.access)
        },
        body:JSON.stringify({
          'product_name':e.target.product_name.value,
          'category':e.target.category.value,
          'price':e.target.price.value,
          'discount_percentage':e.target.discount_percentage.value,
          'rating':e.target.rating.value,
          'rating_count':e.target.rating_count.value,
          'description':e.target.description.value,
          'image_link':e.target.image_link.value,
          'header':e.target.header.value,
          'header_image':e.target?.header_image?.value
        })

      })
      const response=await res.json()
      if(res.ok && response.result){
        toast.info(response.result)
        setFetchImg('')
        setHeaderImg('')
        setIsChecked(false)

        e.target.reset();
      }
      else{
        toast.error(response.error)
      }
    }
    catch(err){
      console.log(err)
      toast.error(err)
    }
  }
  return (
    <div className='w-[90%]'>
      <h1 className='w-full text-center text-[32px] font-[500]'>Add New Product</h1>
      <div className='mt-10 flex '>
          <form onSubmit={handelSubmit} className='w-[70%] space-y-10'>
                <div className='space-x-3 flex w-[50%] justify-between'>
                  <label className='w-[40%] text-nowrap'>Product Name :</label>
                  <input placeholder='Enter...' name="product_name" className='w-full min-w-[250px] outline-none bg-transparent  border-b-[1px] border-black h-[30px] ' type='text' />
                </div>
                <div className='space-x-3 flex w-[50%] justify-between'>
                    <label className='w-[40%] text-nowrap'>Image:</label>
                    <input name='image_link' placeholder='image url...' value={fetchImg} onChange={(e)=>{setFetchImg(String(e.target.value))}} className='w-full min-w-[250px] outline-none bg-transparent  border-b-[1px] border-black h-[30px] ' type='text' />
                </div>
                <div className='space-x-3 flex w-[50%] justify-between'>
                  <label className='w-[40%] text-nowrap'>Category :</label>
                  <input name='category' placeholder='mobiles,tv,etc...' className='w-full min-w-[250px] outline-none bg-transparent  border-b-[1px] border-black h-[30px] ' type='text' />
                </div>
                <div className='space-x-3 flex w-[50%] justify-between'>
                    <label className='w-[40%] text-nowrap'>Price :</label>
                    <input name='price' placeholder='0.00' step="0.01" className='w-full min-w-[250px] outline-none bg-transparent  border-b-[1px] border-black h-[30px] ' type='number' />
                </div>
                <div className='space-x-3 flex w-[50%] justify-between'>
                    <label className='w-[40%] text-nowrap'>Discount :</label>
                    <input name='discount_percentage' placeholder='5' className='w-full min-w-[250px] outline-none bg-transparent  border-b-[1px] border-black h-[30px] ' type='number' />
                </div>
                <div className='space-x-3 flex w-[50%] justify-between'>
                    <label className='w-[40%] text-nowrap'>Rating :</label>
                    <input name='rating' placeholder='?/10' step="0.01" className='w-full min-w-[250px] outline-none bg-transparent  border-b-[1px] border-black h-[30px] ' type='number' />
                </div>
                <div className='space-x-3 flex w-[50%] justify-between'>
                    <label className='w-[40%] text-nowrap'>Rating Count:</label>
                    <input name='rating_count' placeholder='0' className='w-full min-w-[250px] outline-none bg-transparent  border-b-[1px] border-black h-[30px] ' type='number' />
                </div>
                <div className='space-x-3 flex w-[50%] justify-between'>
                    <label className='w-[40%] text-nowrap'>Description:</label>
                    <textarea name='description' className='w-full min-w-[250px] outline-none bg-transparent  border-[1px] border-black min-h-[200px] ' type='text' />
                </div>
                <div className='flex w-[50%] justify-start items-center'>
                    
                    <input name='header' value={isChecked} id="myCheckbox" onChange={(e)=>{setIsChecked(e.target.checked);setHeaderImg('')}} className='outline-none bg-transparent rounded-[50px] h-[30px] ' type='checkbox' />
                    <label htmlFor="myCheckbox" className=' text-nowrap'>Want In Home Page</label>
                </div>
                {isChecked &&(
                  <div className='flex w-[50%] justify-start items-center'>
                      <label  className=' text-nowrap'>Header Link:</label>
                      <input name='header_image' placeholder='Header Image Link..' value={headerImg} onChange={(e)=>{setHeaderImg(String(e.target.value))}} className='w-full min-w-[250px] outline-none bg-transparent  border-b-[1px] border-black h-[30px] ' type='text'  required/>                  
                  </div>
                )}
                <div className='w-[50%] flex  '>
                  <button className='bg-red-500 p-2 text-white mx-auto font-[500] text-[24px]  '>Submit</button>
                </div>
               
          </form>
          <div className='w-[30%] space-y-10 border h-[300px]'>
                <div >
                      <img src={fetchImg} className='text-white w-full h-full' alt='product_image'/>
                </div>
                {(headerImg && isChecked) &&(
                    <div>
                        <img src={headerImg} className='text-white' alt='product_image'/>
                    </div>
                )}
          </div>
      </div>
    </div>
  )
}

export default AddproductPage