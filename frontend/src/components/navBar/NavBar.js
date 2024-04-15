import React,{useContext, useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { IoCartSharp } from "react-icons/io5";
import ContentWrapper from '../contentWrapper/ContentWrapper'
import AuthContext from '../../context/AuthContext';
import CartContext from '../../context/CartContext';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate=useNavigate()
  const [show,setShow] = useState("translate-y-[0px]");
  const [lastScrollY,setLastScrollY] = useState(0)
  const [isActive,setIsActive]=useState(String(window.location.pathname));
  const {user,logoutUser} =useContext(AuthContext)
  const location = useLocation();
  const {state}=useContext(CartContext)
  const [query,setQuery]=useState('')

  const handleSubmit=(e)=>{
    e.preventDefault();
    navigate('/search/'+query)
  }

  useEffect(()=>{
    setIsActive(String(window.location.pathname))
    window.scrollTo(0, 0);

  },[location])



  
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
    <nav className={'text-black  transform transition-all ease-in-out duration-500 fixed w-full border-b z-[1000] bg-white max-md:text-[10px] font-[600] text-[15px] max-md:py-5 md:p-5 '+show}>
            <ContentWrapper className="flex  w-full gap-5 justify-between items-center max-w-[1600px]">
                    <div className='flex items-center gap-2 whitespace-nowrap'>
                        <Link to='/' className='font-bold text-[20px]'>Ecommerce</Link>
                    </div>
                    <div className='inline-flex whitespace-nowrap gap-5 lg:gap-10 max-md:hidden'>
                        <Link to='/' ><p  className={`hover:text-[#5FD788]  ${isActive==="/" ? "border-black border-b-2 border-solid":""}`} >HOME</p></Link>
                        <Link to="/foryou"><p  className={`hover:text-[#5FD788]  ${isActive==="/foryou" ? "border-black border-b-2 border-solid":""}`} >FOR YOU</p></Link>
                        <Link to='/about'><p  className={`hover:text-[#5FD788]  ${isActive==="/about" ? "border-black border-b-2 border-solid":""}`}  >ABOUT</p></Link>
                        {user ? (
                            <Link to="/register" onClick={logoutUser}><p   className={`hover:text-[#5FD788]  `}>LOGOUT</p></Link>
                          ):(
                            <Link to="/register"><p   className={`hover:text-[#5FD788]  ${isActive==="/register" ? "border-black border-b-2 border-solid":""}`}>Sign Up</p></Link>
                        )}
                        
                    </div>
                    <div className='flex gap-2 items-center max-md:w-full  max-md:justify-end '>
                        
                        <form onSubmit={handleSubmit}  className='flex border-[1px] px-2 items-center bg-gray-100 '>
                          
                            <input value={query} onChange={(e)=>{setQuery(e.target.value)}} className='text-black border-none outline-none h-[45px] max-md:text-[0.8rem] bg-gray-100  w-[95%] order-0 p-2  rounded-[5px]' placeholder='Search...' required/>
                            <button type='submit'><CiSearch size={30}/></button>
                          
                        </form>
                        <Link to='/cart'><p className={`hover:text-[#5FD788] relative order-1 ${isActive==="/cart" ? "border-black border-b-2 border-solid":""}`} ><IoCartSharp size={30}/><span className='absolute top-[-10px] bg-red-500 rounded-full text-white w-[20px] h-[20px] flex items-center justify-center right-[-10px]'>{state?.items.length}</span></p></Link>
                    </div>
              </ContentWrapper>
    </nav>
  )
}

export default Navbar
