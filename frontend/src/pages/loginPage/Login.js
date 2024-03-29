import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import { Link } from 'react-router-dom';
import {  toast } from 'react-toastify';

const LoginForm = () => {
    const {loginUser} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const validateForm = () => {
    const newErrors = {};

   

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (validateForm()) {
        const error = await loginUser(e)
        if(error){
            console.log(error)
            toast.error(String(error))
        }
    } else {
      toast.error("invalid data")
    }
  };

  return (
    <div className=' w-full bg-gray-50'>
      <ContentWrapper className="mx-auto items-center  flex w-full">
          <div className=' max-lg:hidden flex  w-full'>
            <img alt="signup" className='h-[35rem] w-[50%] mx-auto  object-fit' src='https://www.pngitem.com/pimgs/m/248-2488392_shopping-cart-supermarke-png-image-free-download-searchpng.png'/>
          </div>

          <div className=' w-full flex flex-col  gap-[1rem] items-center'>
              <div>
                  <h1 className='text-[3rem]'>Account login. </h1>
                  <p className='text-[1rem]'>Enter your details below</p>
              </div>
              <form className='leading-[4rem]' onSubmit={handleSubmit}>
                    <div>
                      <input className=" w-[20rem]  py-4  font-medium  border-b border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-800 bg-transparent"
                      type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
                      {errors.email && <p className='text-red-500 text-[15px]'>{errors.email}</p>}
                    </div>

                    <div>
                      <input className=" w-[20rem]  py-4  font-medium  border-b border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-800 bg-transparent"
                      type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
                      {errors.password && <p className='text-red-500 text-[15px]'>{errors.password}</p>}
                    </div>

                   

                    <button className='w-[20rem]  mt-5 bg-red-500 text-white' type="submit">Login</button>
                    <p>have't an account&nbsp;<Link to="/register" className='border-b border-black'>Register</Link></p>

                </form>
          </div>
        </ContentWrapper>
    </div>
  );
};

export default LoginForm;
