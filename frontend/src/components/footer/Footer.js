import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter,FaInstagram,FaLinkedinIn } from "react-icons/fa6";
import ContentWrapper from '../contentWrapper/ContentWrapper';

const Footer = () => {
    
    
  return (
    <div className=''>
        <ContentWrapper className="flex w-full max-md:flex-wrap gap-10 px-10 py-20 text-white bg-black text-[10px] justify-center">
                
                    <section className="bg-black md:flex-shrink-0  leading-7  ">
                        <h1 className="text-4xl">Exclusive</h1>
                        <p className="mt-4">Subscribe <br/> Get 10% off your first order</p>
                        <div className="flex items-center max-w-[12rem] border-[1px] border-white border-solid  px-[10px] py-[5px] rounded-sm w-64">
                            <input type="text" className="flex-1 bg-transparent border-none outline-none  rounded-md" placeholder="Enter your email"/>
                            <button className=" text-white  rounded-md cursor-pointer">Send</button>
                        </div>
                    </section>
                    
                    <section className="leading-7  flex-shrink">
                        <h2 className="text-2xl">Support</h2>
                        <p className="mt-2">Gopal reddy, Andhra Pradesh, India</p>
                        <Link className="mt-2 block" to="mailto:pmallireddy329@gmail.com">pmallireddy329@gmail.com</Link>
                        <Link className="mt-2 block" to="tel:+918919993013">+918919993013</Link>
                    </section>
                    <section className='leading-7   flex-shrink'>
                        <h2 className="text-2xl whitespace-nowrap">Quick Link</h2>
                        <ul className="list-none  ">
                            <li><Link >Terms Of Use</Link></li>
                            <li><Link >Privacy Policy</Link></li>
                            <li><Link >FAQ</Link></li>
                            <li><Link >Contact</Link></li>
                        </ul>
                    </section>
                    
                    <section className="flex-shrink-0 max-sm:w-auto max-md:w-full leading-7 text-white flex flex-wrap justify-center items-center flex-col">
                        <div className='flex justify-between w-[70%]'>
                            <FaFacebookF size={20}/> 
                            <FaXTwitter size={20}/> 
                            <FaInstagram size={20}/> 
                            <FaLinkedinIn size={20}/> 
                        </div>

                        <p>© Copyright Rimel 2024. All right reserved</p>
                        
                    </section>
                
            </ContentWrapper>
        </div>

  )
}

export default Footer