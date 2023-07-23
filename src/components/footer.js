import React from 'react'
import {  useSelector } from 'react-redux';
const Footer = () => {
    const redutheam = useSelector((store)=>(store.theam))
  return (
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
  )
}

export default Footer
