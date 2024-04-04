// Cart.js
import React,{useContext} from 'react';
import  CartContext  from '../../context/CartContext';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import { FaRupeeSign } from "react-icons/fa";
import { API_BASE } from '../../utlis/api';
import AuthContext from '../../context/AuthContext'
import { Link } from 'react-router-dom';
import {  toast } from 'react-toastify';
function Cart() {
  const { state,dispatch } = useContext(CartContext);
  const {authToken} = useContext(AuthContext)

  const handleButtonClick = async () => {
    try{
      const res=await fetch(API_BASE+'/update_user_purchase/',{
        method: 'POST',
        headers: {
          'Authorization': `Bearer `+String(authToken.access),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"ids":state.items.map((item)=>(item))}),
      })
      const response=await res.json()
      if(res.ok){
          toast.info(response.result)
          dispatch({"type":"EMPTY_CART"})
      }
    }catch(err){
      toast.info(err)
    }
  };

 

  const calculateTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  const calculateSubTotal=(id)=>{
    return state.items.reduce((total,item)=>id===item.id?total + (item.price * item.quantity):total ,0)
  }

  return (
    <div>

      <ContentWrapper className="flex justify-center flex-col items-center mx-auto w-full max-md:px-0">
          <div className='w-[80%] max-md:w-[95%] mt-[5%]'>

            <table className='w-full gap-10 border-separate text-left border-spacing-y-[20px] align-middle'>
              
                  <thead>
                      <tr className='border border-gray-200 shadow h-10 ' >
                        <th className='w-[40%]'>Product</th>
                        <th className='w-[20%]'>Price</th>
                        <th className='w-[20%]'>Quantity</th>
                        <th className='w-[20%]'>Subtotal</th>
                      </tr>
                  </thead>
                  <tbody>
                          {state.items.length>0 ? (state?.items?.map(item => (
                              <tr key={item.id} className='border border-gray-200 shadow h-20 '>
                                <td><span className='clamped-text  tracking-tight '>{item.name}</span></td>
                                <td className='flex  my-auto  items-center h-20 '><FaRupeeSign/>{item.price}</td>
                                <td >
                                  <div className='w-fit p-2 gap-5 border border-black rounded-sm h-[40px] flex items-center justify-between  relative' >
                                  {item.quantity}
                                    <div className='flex flex-col gap-2 justify-center h-[40px] '>
                                      <button className=' h-[15px]' onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: item.id })}>+</button>
                                      <button onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: item.id })}>-</button>
                                    </div>
                                  </div>
                                </td>
                                <td className='flex items-center'><FaRupeeSign/>{calculateSubTotal(item.id)}</td>
                              </tr>
                          ))):(
                            <tr className='flex w-full'>
                              <td>No items</td>
                            </tr>
                          )}
                  </tbody>
            </table>

            <div className='flex w-full flex-col items-end justify-end my-10'>
                <div className='w-[400px] border border-black py-5 px-10 leading-[4rem]'>
                    <h3 className='text-[32px]'>Cart Total</h3>
                    <div className='flex flex-col leading-[2rem] w-full'>
                        <p className='w-full flex justify-between border-b border-black'>Subtotal:<span className='flex  my-auto  items-center '><FaRupeeSign/>{calculateTotal()}</span></p>
                        <p className='w-full flex justify-between border-b border-black'>Shipping:<span className='flex  my-auto  items-center '>Free</span></p>
                        <p className='w-full flex justify-between '>Total:<span className='flex  my-auto  items-center '><FaRupeeSign/>{calculateTotal()}</span></p>
                    </div>
                    {calculateTotal()>0 ? (
                      <button onClick={handleButtonClick} className='bg-red-500 text-white w-full font-bold text-[24px] mt-5 '>Buy</button>
                    ):(
                      <Link to='/' className='bg-red-500 text-white w-full font-bold text-[24px] mt-5 px-5 py-3'>Home</Link>
                    )}
                    
                </div>
            </div>

          </div>

          
      </ContentWrapper>

  
      
      
    </div>
  );
}

export default Cart;
