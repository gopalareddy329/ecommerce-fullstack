import React from 'react'
import Navbar from '../components/navbar'
import { useSelector /*,useDispatch */ } from 'react-redux'
import Slidertag from '../components/slider'
import Product from '../components/product'

const Shopping = ({products,check,updatecart}) => {
    const redutheam = useSelector((store)=>(store.theam))
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
                      
                      <div className='flex max-w-full flex-wrap gap-5 mr-5'>
                              {check &&  products.slice(0,-3).map((items,key)=> <Product items={items} key={key}  updatecart={updatecart} theam={redutheam} />)}
                      </div>
                      
                </div>
        </div>


    </div>
  )
}

export default Shopping
