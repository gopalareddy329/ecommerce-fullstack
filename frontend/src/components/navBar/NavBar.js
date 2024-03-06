import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { IoCartSharp } from "react-icons/io5";
import ContentWrapper from '../contentWrapper/ContentWrapper'

const Navbar = () => {
  const [show,setShow] = useState("translate-y-[0px]");
  const [lastScrollY,setLastScrollY] = useState(0)
  const [isActive,setIsActive]=useState("home");



  
  useEffect(()=>{
    const controllNavbar = () =>{
      if(window.scrollY > lastScrollY){
        setShow("translate-y-[-150px]")
        
      }else{
        setShow("translate-y-[0px]")
      }
      setLastScrollY(window.scrollY)
    }
    window.addEventListener("scroll",controllNavbar);
    return ()=>{
      window.removeEventListener("scroll",controllNavbar);
    }
  },[lastScrollY])

  return (
    <nav className={'text-black transform  transition-all ease-in-out duration-500 fixed w-full border-b bg-white max-md:text-[10px] font-[600] text-[15px] max-md:py-5 md:p-5 '+show}>
            <ContentWrapper className="flex  w-full gap-5 justify-between items-center max-w-[1600px]">
                    <div className='flex items-center gap-2 whitespace-nowrap'>
                        <span className='font-bold text-[20px]'>Ecommerce</span>
                    </div>
                    <div className='inline-flex whitespace-nowrap gap-5 lg:gap-10 max-md:hidden'>
                        <Link to='/'><p onClick={()=>{setIsActive("home")}} className={`hover:text-[#5FD788]  ${isActive==="home" ? "border-black border-b-2 border-solid":""}`} >HOME</p></Link>
                        <Link><p onClick={()=>{setIsActive("contact")}} className={`hover:text-[#5FD788]  ${isActive==="contact" ? "order-black border-b-2 border-solid":""}`} >CONTACT</p></Link>
                        <Link to='/cart'><p onClick={()=>{setIsActive("about")}} className={`hover:text-[#5FD788]  ${isActive==="about" ? "order-black border-b-2 border-solid":""}`}  >ABOUT</p></Link>
                        <Link><p>Sign Up</p></Link>
                    </div>
                    <div className='flex gap-2 items-center max-md:w-full  max-md:justify-end '>
                        
                        <div className='flex border-[1px] px-2 items-center bg-gray-100 '>
                          <input  className='text-white h-[45px] max-md:text-[0.8rem] bg-gray-100  w-[95%] order-0 p-2  rounded-[5px]' placeholder='Search...'/>
                          <p><CiSearch size={30}/></p>
                        </div>
                        <Link to='/cart'><p className='order-1'><IoCartSharp size={30}/></p></Link>
                    </div>
              </ContentWrapper>
    </nav>
  )
}

export default Navbar
