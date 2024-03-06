import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../navBar/NavBar';


const OutLet = () => {

  return (
    <div>
        <Navbar/>
            

            <div className='min-h-[2000px]  pt-[8rem]'>
                    <Outlet /> 
            </div>
    </div>
  )
}

export default OutLet
