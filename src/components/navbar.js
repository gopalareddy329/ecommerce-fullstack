import React from 'react'
import {PiBagLight} from 'react-icons/pi'
import {BsSearch,BsFillSunFill} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { updateTheam } from '../redux/theamReducer'
import { Link } from 'react-router-dom'
const Navbar = () => {
    const redutheam = useSelector((state)=>(state.theam))
    const dispatch = useDispatch()
    const changeTheam = () =>{
        dispatch(updateTheam())
    }
  return (
    <nav style={{backgroundColor:`${redutheam.theam}`,color:`${redutheam.color}`}} className=' bg-[#1F2937]  text-white max-md:text-[10px] font-[600] text-[15px] flex max-md:flex-wrap justify-between p-5 items-center'>
            <div className='flex items-center gap-2 whitespace-nowrap'>
                <span className='font-bold text-[20px]'>Ecommerce</span>
                <span className='cursor-pointer' onClick={changeTheam}><BsFillSunFill size={15}/></span>
            </div>
            <div className='inline-flex gap-2'>
                <Link to='/'><p className='hover:text-[#5FD788]' >HOME</p></Link>
                <Link><p className='hover:text-[#5FD788]' >ABOUT US</p></Link>
                <Link><p className='hover:text-[#5FD788]' >SHOP</p></Link>
                <Link><p className='hover:text-[#5FD788]' >CONTACT</p></Link>
            </div>
            <div className='flex gap-2 items-center max-md:w-full max-md:mt-[3%]'>
                <Link to='/cart'><p className='order-1'><PiBagLight size={25}/></p></Link>
                <input style={{borderColor:`${redutheam.color}`}} className=' h-[45px] w-[95%] order-0 p-3 bg-transparent border-[1px] rounded-[5px]' placeholder='Search...'/>
                <p  ><BsSearch size={20}/></p>
            </div>
        </nav>
  )
}

export default Navbar
