
import React, { useContext, useState } from 'react'
import AuthContext from '../../../context/AuthContext'
import AuthFetch from '../../../hooks/AuthFetch'
import ImgRender from '../../../components/imgRender/ImgRender'
import { API_BASE } from '../../../utlis/api'
import {  toast } from 'react-toastify';
const HeaderProductsPage = () => {
  const {authToken}=useContext(AuthContext)
  const [page,setPage]=useState(1)
  const[selected,setSelected]=useState(null)
  const {data}=AuthFetch(authToken,'/get_header?type=all')

  const removeHeader = async()=>{
    try{
      const res =await  fetch(API_BASE+'/get_header/',{
        method:"POST",
        headers:{
          "Content-type":"application/json",
          'Authorization':'Bearer '+String(authToken.access)
        },
        body:JSON.stringify({
          'id':selected.product_product_id
        })
      })
      const response =await res.json()
      if(res.ok && response.result){
        toast.info(response.result)
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

  const itemChecked=(e,item)=>{
    if(e.target.checked){
      setSelected(item)
  
    }
    else{
      setSelected(null)
    }
  }
  return (
    <div className='w-[90%]'>
      <h1 className='w-full text-center text-[32px] font-[500]'>Header Products</h1>
      <div className='mt-10 flex'>
        <div className='w-full'>
            <ul className='w-[70%] space-y-3'>
              {data?.map((item,key)=>(
                
                <li  key={key} >
                  <input onClick={(e)=>{itemChecked(e,item)}} type='radio' name="item" id={key}/>
                  <label className='text-nowrap' htmlFor={key}>{item.title}</label>
                  </li>
              ))}
            </ul>
        </div>
        <div className='w-[700px]'>
          {selected && (
            <div className='w-full self-center'>
              <ImgRender src={selected?.image_link} className="md:aspect-[4/2] aspect-[4/3] object-cover"  alt="header"/>
              <button onClick={removeHeader} className='bg-red-500 p-2 flex text-white mx-auto font-[500] text-[24px] mt-5 '>Delete</button>
               
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeaderProductsPage