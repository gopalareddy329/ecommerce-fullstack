import React,{useContext, useEffect} from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../navBar/NavBar';
import Footer from '../footer/Footer';
import {  toast } from 'react-toastify';
import Toast from '../toast/Toast';
import AuthContext from '../../context/AuthContext';
const OutLet = () => {
  let {user} = useContext(AuthContext);
  useEffect(()=>{
    
    if(!user){
      toast.info("Please Login")
    }
  },[user])

  return (
    <div className=''>
        <Navbar/>
         <Toast />

            <div className='min-h-screen pt-[5rem] md:pt-[7rem]'>
                    <Outlet /> 
            </div>
         <Footer/>
        
    </div>
  )
}

export default OutLet
