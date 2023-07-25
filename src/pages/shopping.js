import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { useSelector /*,useDispatch */ } from 'react-redux'
import Slidertag from '../components/slider'
import Product from '../components/product'


const Shopping = ({products,check,updatecart}) => {
    const redutheam = useSelector((store)=>(store.theam))
    const [pageno,setPage]=useState(0)
    var l=[]
    useEffect(()=>{
      setPage(0)
      
    },[])
    const printPagenumber =()=>{
      for(var i=1;i<((products.length)/10)+1;i++){
            l.push(i)
      }
      
    }
    const changePage =(item)=>{
      setPage(item-1)
    }
    //const cartred= useSelector((state)=>state.cart)
    
    //const dispatch=useDispatch()
  return (
    <div style={{backgroundColor:`${redutheam.theam}`,color:`${redutheam.color}`}} className='block poppins overflow-hidden'>
        <div>
            <Navbar/>
        </div>
        <div className='w-full' >
              <div className='p-8 w-[90%] mx-auto'>
                    {(check === true) && <Slidertag images={products} height={550} type="shop-slider"/>}
              </div>
        </div>

        <div className='w-[100%] '>    
                <div className='mx-auto max-w-[90%] flex items-center flex-cols flex-wrap'>
                      <h1 style={{color:`${redutheam.color}`}}  className='max-md:w-[100%] self-center p-5    text-[50px] font-semibold'>All Products</h1>
                      
                      <div className='flex max-w-full  flex-wrap gap-5 mr-5'>
                              {check &&  products.slice(pageno*10,(pageno*10)+10).map((items,key)=> <Product items={items} key={key}  updatecart={updatecart} theam={redutheam} />)}
                      </div>
                      
                </div>
        </div>

        <div className='my-10'>
            {printPagenumber()}
            <div className='flex gap-5 justify-center'>
                        {l.map(function(item){
                              if(item===(pageno+1)){
                              return(
                                    <div><h1 className='font-bold bg-green-400  h-15 w-[25px] text-center self-center rounded-full'>{item}</h1></div>
                              )
                              }
                              else{
                                    return(
                                    <div><h1 onClick={()=>changePage(item)} className='font-bold bg-gray-400  h-15 w-[25px] text-center self-center rounded-full'>{item}</h1></div> 
                                    )
                              }
                        })}
            </div>
        </div>

    </div>
  )
}

export default Shopping
