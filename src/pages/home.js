import {PiPantsFill} from 'react-icons/pi'
import {TbShirtFilled,TbShoe,TbDeviceMobile} from "react-icons/tb"
import Navbar from '../components/navbar';
import {  useSelector } from 'react-redux';

import Slider from '../components/slider';
import Product from '../components/product'
import Footer from '../components/footer';





const Home = ({products,check,updatecart}) => {
    
    
    const redutheam = useSelector((store)=>(store.theam))


    
    
    
    

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
                            <div className='w-[300px] max-h-[250px] '>
                                    {<Slider images={slider1imgs[0]} height={250} type="all"></Slider>} 
                            </div>
                           

                            

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
                <div className='w-[300px] max-h-[200px]'>
                                    {<Slider images={slider1imgs[0]} height={250} type="watch" ></Slider>} 
                            </div>

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
            <h1 style={{color:`${redutheam.color}`}}  className='max-md:w-[100%] self-center p-5  w-[20%] text-center  text-[50px] font-semibold'>Top deals</h1>
           <div className=' overflow-scroll  max-md:w-[95%] '>
                <div className='flex gap-5 mr-5 '>
                        {check &&  products.slice(0,6).map((items,key)=> <Product items={items} key={key}  updatecart={updatecart} theam={redutheam} />)}
                </div>
            </div>
        </div>

        <div className='flex w-full justify-between  max-md:items-center mt-[5%] max-md:flex-col'>    
            <h1 style={{color:`${redutheam.color}`}}  className='max-md:w-[100%] self-center p-5  w-[20%] text-center  text-[50px] font-semibold'>Shop deals</h1>
           <div className=' overflow-scroll  max-md:w-[95%] '>
                <div className='flex gap-5 mr-5 '>
                        {check &&  products.slice(6,12).map((items,key)=> <Product items={items} key={key}  updatecart={updatecart} theam={redutheam} />)}
                </div>
            </div>
        </div>

        <div className='flex w-full justify-between  max-md:items-center mt-[5%] max-md:flex-col'>    
            <h1 style={{color:`${redutheam.color}`}}  className='max-md:w-[100%] self-center p-5  w-[20%] text-center  text-[50px] font-semibold'>Today's deals</h1>
           <div className=' overflow-scroll  max-md:w-[95%] '>
                <div className='flex gap-5 mr-5 '>
                        {check &&  products.slice(12,18).map((items,key)=> <Product items={items} key={key}  updatecart={updatecart} theam={redutheam} />)}
                </div>
            </div>
        </div>

        <div className='flex w-full justify-between  max-md:items-center mt-[5%] max-md:flex-col'>    
            <h1 style={{color:`${redutheam.color}`}}  className='max-md:w-[100%] self-center p-5  w-[20%] text-center  text-[50px] font-semibold'>Sale deals</h1>
           <div className=' overflow-scroll  max-md:w-[95%] '>
                <div className='flex gap-5 mr-5 '>
                        {check &&  products.slice(18,25).map((items,key)=> <Product items={items} key={key}  updatecart={updatecart} theam={redutheam} />)}
                </div>
            </div>
        </div>

        <div>
            <Footer/>

        </div>
       
                


     
    </div>
  )
}

export default Home
