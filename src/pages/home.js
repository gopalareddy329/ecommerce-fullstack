import {PiPantsFill} from 'react-icons/pi'
import {TbShirtFilled,TbShoe,TbDeviceMobile} from "react-icons/tb"
import Navbar from '../components/navbar';
import {  useDispatch,useSelector } from 'react-redux';
import { addtocart ,updatetocart} from '../redux/cartReducer';
import Slider from '../components/slider';
import Product from '../components/product'
import {  useEffect } from 'react';





const Home = ({products,check,setCheck}) => {
    
    
    const redutheam = useSelector((store)=>(store.theam))
    const cartred= useSelector((state)=>state.cart)
    
    const dispatch=useDispatch()

    function updatecart({...item},change){

        let isPresent= false
        cartred.forEach((items)=>{
            if(items.id === item.id){
                isPresent=true;
                
            }

        })
        if (isPresent){dispatch(updatetocart({id:item.id,change:change}))}
        else{dispatch(addtocart({...cartred,title:item.name,quantity:1,id:item.id,price:item.price,url:item.imgUrl}))}
        
       
    }
    
    useEffect(()=>{
            async function getdata(){
                if(check===false){
                     await (products.sort(()=>(Math.random() - 0.5)))
                     setCheck(true)
                    }
            }
            getdata()
    },[check,setCheck,products])
    

    var slider1imgs=[
        products.filter((item,key)=>{
            return item.imgUrl
        })
    ]
    
   

    
    


    
  return (
    <div className='block poppins overflow-hidden' style={{backgroundColor:`${redutheam.theam}`}}>
      <div className='z-[10] bg-[#1F2937]'>
        <Navbar />
        
      </div>
     

      



      <div className='w-[100%]  relative   flex items-center justify-center'>
            
            <div className='flex max-md:flex-col  w-[80%]  gap-10 items-center mt-[10%] z-10' >
                    <div className='w-[40%] max-md:w-[100%] max-md:text-center'>
                        <h1 className='text-[#5FD788] text-[3.5vw] font-bold leading-[45px]'>Hurry! Sale Ends Tomorrow</h1>
                        <p style={{color:`${redutheam.color}`}} className='font-[400] mt-4'>Prepare for the upcoming year with ease 
                        by taking advantage of the Big Saving Days'
                        23 sale on a popular e-commerce platform.
                        
                        </p>

                    </div>
                    <div className='flex  relative justify-center mb-10 w-[60%]  z-10 max-md:w-[100%] max-md:justify-center max-md:flex-col max-md:items-center  max-md:my-[20%]'>
                            <div className='absolute top-[-200px]  right-[35%] rotate-[45deg] max-md:right-[50px]'>
                                <div className='w-[250px] absolute h-[550px] left-[40px] top-[20px] rounded-full bg-[#5FD788]' />
                                <div className='w-[250px] absolute top-[180px] left-[-80px]  h-[250px] rounded-full bg-[#5FD788]' />
                                <div className='w-[300px] absolute top-[180px] left-[130px] h-[250px] rounded-full bg-[#5FD788]' />
                                
                        
                            </div>
                            
                            {<Slider images={slider1imgs[0]} type="all"></Slider>} 
                           

                            

                    </div>
                    
            </div>
        </div>



        <div className='flex max-md:flex-col max-md:items-center w-full justify-center gap-2 mt-[10%]'>
            <div style={{boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.15)',backgroundColor:`${redutheam.color1}`}} className={`w-[24%] max-md:w-[50%] h-[274px]  hover:text-white text-[#5FD788]  rounded-[20px] text-center flex flex-col items-center justify-center hover `}>
                <p style={{color:`${redutheam.color}`}} ><TbShirtFilled size={200} /></p>
                <p className=' font-bold'>Shirts</p> 
                
            </div>
            <div  style={{boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.15)',backgroundColor:`${redutheam.color1}`}}   className={`w-[24%] max-md:w-[50%] h-[274px]  hover:text-white text-[#5FD788]  rounded-[20px] text-center flex flex-col items-center justify-center `} >
                <p style={{color:`${redutheam.color}`}} ><PiPantsFill size={200} /></p>
                <p className=' font-bold'>Pants</p> 
                
            </div>
            <div  style={{boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.15)',backgroundColor:`${redutheam.color1}`}} className={`w-[24%] max-md:w-[50%] h-[274px]   hover:text-[#fbf8f8] text-[#5FD788]  rounded-[20px] text-center flex flex-col items-center justify-center hover`}>
                <p style={{color:`${redutheam.color}`}} ><TbShoe size={200} /></p>
                <p className=' font-bold '>Shoes</p> 
                
                
            </div>
            <div  style={{boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.15)',backgroundColor:`${redutheam.color1}`}}  className={`w-[24%] max-md:w-[50%] h-[274px]  hover:text-white text-[#5FD788]  rounded-[20px] text-center flex flex-col items-center justify-center bg-${redutheam.color1}  hover:bg-[#5FD788]`}>
                <p style={{color:`${redutheam.color}`}} ><TbDeviceMobile size={200} /></p>
                <p className='font-bold'>Mobiles</p> 
                
            </div>

        </div>

        

        <div className='w-[100%]  relative my-[5%] mb-[10%]    flex items-center justify-center'>
            <div className='absolute top-[30px] left-[110px] rotate-[45deg]'>
                    <div className='w-[100px] absolute  h-[100px] left-[40px] top-[20px] rounded-full bg-[#5FD788]' />
                    <div className='w-[100px] absolute top-[100px]  h-[100px] rounded-full bg-[#5FD788]' />
                    <div className='w-[100px] absolute top-[100px] left-[80px] h-[100px] rounded-full bg-[#5FD788]' />
                    <div className='w-[5px] absolute top-[150px] left-[87px] h-[150px]  bg-[#5FD788]' />
            
            </div>
            <div className='flex w-[80%]  gap-10 items-center max-md:justify-center  mt-[10%] max-md:flex-col ' >

                <div className='flex justify-start  max-md:justify-center max-md:w-full items-center w-[60%] z-10  '>
                            {<Slider images={slider1imgs[0]} type="watch"></Slider>} 

                    </div>
                    <div className='w-[40%] flex flex-col max-md:w-full gap-1  '>
                        <h1 className='text-[#5FD788] text-[3.5vw] font-bold leading-[45px]'>Watches</h1>
                        <p style={{color:`${redutheam.color}`}}  className=' font-[400] mt-4'>Whether you're looking for a statement piece to complement your style
                        </p>
                        <button>Explore</button>

                    </div>
                    
            </div>
        </div>

        <div className='flex w-full justify-between  max-md:items-center mt-[5%] max-md:flex-col'>    
            <h1 style={{color:`${redutheam.color}`}}  className='max-md:w-[100%] self-center p-5  w-[20%] text-center  text-[50px] font-semibold'>Top Deals</h1>
           <div className=' overflow-scroll md:max-w-[80%] max-md:w-[95%] '>
                <div className='flex gap-5 mr-5'>
                        {check &&  products.slice(0,6).map((items,key)=> <Product items={items} key={key}  updatecart={updatecart} theam={redutheam} />)}
                </div>
            </div>
        </div>


        <div className='flex w-full justify-between  max-md:items-center mt-[5%] max-md:flex-col'>
            <h1 style={{color:`${redutheam.color}`}}  className='max-md:w-[100%] self-center p-5  w-[25%] text-center  text-[50px] mr-2 font-semibold'>New arrivals</h1>
           <div className=' overflow-scroll md:max-w-[80%] max-md:w-[95%] '>
                <div className='flex gap-5 mr-5'>
                        {check &&  products.slice(6,12).map((items,key)=> <Product items={items} key={key}  updatecart={updatecart} theam={redutheam} />)}
                        
                </div>
            </div>
        </div>

        <div className='flex w-full justify-between  max-md:items-center mt-[5%] max-md:flex-col'>    
            <h1 style={{color:`${redutheam.color}`}}  className='max-md:w-[100%] self-center p-5  w-[20%] text-center  text-[50px] font-semibold'>Exciting deals</h1>
           <div className=' overflow-scroll md:max-w-[80%] max-md:w-[95%] '>
                <div className='flex gap-5 mr-5'>
                        {check &&  products.slice(12,18).map((items,key)=> <Product items={items} key={key}  updatecart={updatecart} theam={redutheam} />)}
                </div>
            </div>
        </div>

        <div className='flex w-full justify-between  max-md:items-center mt-[5%] max-md:flex-col'>    
            <h1 style={{color:`${redutheam.color}`}}  className='max-md:w-[100%] self-center p-5  w-[20%] text-center  text-[50px] font-semibold'>Shop deals</h1>
           <div className=' overflow-scroll md:max-w-[80%] max-md:w-[95%] '>
                <div className='flex gap-5 mr-5'>
                        {check &&  products.slice(18,25).map((items,key)=> <Product items={items} key={key}  updatecart={updatecart} theam={redutheam} />)}
                </div>
            </div>
        </div>

        <footer style={{color:`${redutheam.color}`,backgroundColor:`${redutheam.color1}`}} className={` bg-${redutheam.color1} max-md:flex-col max-md:gap-10 p-10 text-[#9CA3AF] flex mt-10 justify-between items-center`}>
            <div>
             
                <h1 className='font-bold max-md:text-center text-[20px]'>Ecommerce</h1>
            </div>
            <div className='whitespace-nowrap flex gap-8 font-[400] justify-center items-center w-[90%] max-md:text-[8px] white-space-nowarp text-[12px]'>
                    <div className='flex flex-col items-center '>
                        <p className='font-[600] hover:text-[#5FD788] text-[#5FD788]' href='/'>Customer Support</p>
                        <p href='/'>Shipping</p>
                        <p href='/'>Free Return</p>
                        <p href='/'>Gift Cards</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='font-[600] hover:text-[#5FD788] text-[#5FD788]' href='/'>ABOUT US</p>
                        <p href='/'>Our Values</p>
                        <p href='/'>Sustainability</p>
                        <p href='/'>Brand Ambassadors</p>
                        <p href='/'>Fitness Professionals</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='font-[600] hover:text-[#5FD788] text-[#5FD788]' href='/'>Customer Service</p>
                        <p href='/'>Help</p>
                        <p href='/'>Leader Support</p>
                        <p href='/'>Pleasant Grove Product Center</p>
                        <p href='/'>Recall-Important Safety Information</p>
                    </div>
            
                
            </div>
        </footer>
       
                


     
    </div>
  )
}

export default Home
