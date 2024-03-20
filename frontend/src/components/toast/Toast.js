import React from 'react'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    const style={
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        newestOnTop:false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        }
  
       
        

    
  return (
    <div>
        <ToastContainer {...style}/>

    </div>
  )
}

export default Toast