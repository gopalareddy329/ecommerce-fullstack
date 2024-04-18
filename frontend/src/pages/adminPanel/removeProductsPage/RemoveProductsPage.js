import React, { useContext, useState } from 'react'
import AuthContext from '../../../context/AuthContext'
import AuthFetch from '../../../hooks/AuthFetch'
import Card from '../../../components/products/card/Card'
const RemoveProductsPage = () => {
  const {authToken}=useContext(AuthContext)
  const [page,setPage]=useState(1)
  const[selected,setSelected]=useState(null)
  const {data,loading}=AuthFetch(authToken,'/get_remove_product/?page='+page)



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
      <h1 className='w-full text-center text-[32px] font-[500]'>Remove Product</h1>
      <div className='mt-10 flex '>
        <div>
            <ul className='w-[70%] space-y-3'>
              {data?.result?.map((item,key)=>(
                
                <li key={key} >
                  <input onClick={(e)=>{itemChecked(e,item)}} type='radio' name="item" id={key}/>
                  <label htmlFor={key}>{item.name}</label>
                  </li>
              ))}
            </ul>
        </div>
        <div className='w-[500px]'>
          {selected && (
            <div className='w-full self-center'>
                <Card loading={loading} item={selected} numItems={1}/>
                <button className='bg-red-500 p-2 flex text-white mx-auto font-[500] text-[24px] mt-5 '>Delete</button>
               
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RemoveProductsPage