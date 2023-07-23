
import Navbar from '../components/navbar'
import { useSelector,useDispatch } from 'react-redux'
import {MdDelete} from 'react-icons/md'
import {FaRupeeSign} from 'react-icons/fa'
import { NumericFormat } from 'react-number-format';
import {  updatetocart} from '../redux/cartReducer';

const Cart = () => {
  const theam = useSelector(state => state.theam)
  const cartred= useSelector((state)=>state.cart)
  const dispatch=useDispatch()
  const updatecart=(item,change)=>{
    dispatch(updatetocart({id:item.id,change:change}))
  }
  var count=false
   

  return (
    <div style={{color:`${theam.color}`,backgroundColor:`${theam.theam}`}} className={`w-full poppins  min-h-screen `}>
        <div>
          <Navbar/>
        </div>
        <div className='lg:w-[80%] w-[90%]  mx-auto mt-5'>

                <div style={{boxShadow: '0px 3px 2px 2px rgba(0, 0, 0, 0.15)',backgroundColor:`${theam.color1}`}}  className={`p-5 `}>
                        <div className={`inline-flex justify-between w-full`}>
                          <h1 className='font-[600] text-[18px]'>Devliver to <span className='font-[400] text-[#5FD788]'>Gopala</span></h1>
                          <button className='relative top-5 '>Change</button>
                        </div>
                        <p className='w-[75%] text-[14px]  break-normal'>9-156,gudimettla street,pentapadu,west godavari,534166,andra pradesh,india,9-156,gudimettla street,pentapadu,west godavari,534166,andra pradesh,india</p>
                </div>

                <div style={{boxShadow: '0px 3px 2px 2px rgba(0, 0, 0, 0.15)',backgroundColor:`${theam.color1}`}}  className={`p-4  mt-2 flex flex-col gap-4`}>

                
                    {cartred.map(function(items,key){
                      
                      if(items.url !== undefined && items.quantity >0){
                        
                        return(
                          <div key={key} className='flex gap-5  md:max-h-[180px] max-md:min-h-[100px] border-b-[1.5px]  border-gray-300'>
                                <div className='w-[20%] flex mb-2 flex-col items-center max-md:w-[30%] '>
                                    <img className='mx-auto  h-[80%] md:h-[100%]' src={items.url} alt='img-100'/>
                                    
                                </div>

                                <div className='flex border-none  leading-[50px] mb-2  flex-col  w-[80%] max-md:w-[60%] '>
                                        <h1 className='truncate w-[90%] font-[400] text-[18px] max-md:text-[14px]'>{items.title}</h1>
                                        <p className='flex items-center gap-2  max-md:text-[14px]'><span className='font-bold text-[20px] max-md:text-[16px] flex items-center'><FaRupeeSign /><NumericFormat value={items.price}  thousandSeparator={true} displayType="text"/></span>  <span className='line-through flex items-center'><FaRupeeSign />{items.price + 100}</span>   <span className='text-[#5FD788] font-[600]'>5% off</span></p>
              
                                        <div className='flex gap-5 max-md:justify-between items-center'>
                                            <div className='bg-[#e7e7e7] h-[30px] flex items-center rounded-[10px] text-black p-1/2'>
                                                <button onClick={()=>{updatecart(items,1)}} className='bg-transparent'>+</button>
                                                <span>{items.quantity}</span>
                                                <button onClick={()=>{updatecart(items,-1)}} className='bg-transparent'>-</button>
                                            </div>
                                            <button onClick={()=>{updatecart(items,-items.quantity)}} ><MdDelete size={20}/></button>
                                        </div>
                                       
                                </div>
                               
                        
                          </div>
                          
                        )
                      }
                      else if(cartred[0].counter === 0){
                        
                        if(count===false){
                          count=true
                          return(
                            <div key={key}>
                              <p>No items added...</p>
                            </div>
                          )
                        
                        }else{
                          return null
                        }
                      }
                      else{return <div></div>}
                      
                    })}
                  

                </div>

                <div  className={`  mt-2 flex max-md:justify-end  justify-end gap-4`}>
                      <button className=' inline-flex justify-center items-center whitespace-nowrap'>Proceed to Buy &nbsp; <FaRupeeSign /><NumericFormat value={(cartred[0].counter )}  thousandSeparator={true} displayType="text"/></button>
                </div>


                
        </div>
    </div>
  )
}

export default Cart
