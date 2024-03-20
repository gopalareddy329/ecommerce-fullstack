import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
    const {registerUser} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Add more password pattern validation if needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', formData);
      registerUser(e);
    } else {
      console.log('Form has errors. Please fix them.');
    }
  };

  return (
    <div className=' w-full '>
      <ContentWrapper className="mx-auto flex w-full">
          <div className='w-[40%] max-lg:hidden'>
            <img alt="signup" className='h-[35rem] min-w-[25rem]' src='https://img.freepik.com/free-photo/studio-shot-pretty-black-woman-with-white-shopping-bag-standing-yellow-background-trendy-spring-fashionable-look_273443-10.jpg'/>
          </div>

          <div className=' w-full flex flex-col  gap-[1rem] items-center'>
              <div>
                  <h1 className='text-[3rem]'>Create an account</h1>
                  <p className='text-[1rem]'>Enter your details below</p>
              </div>
              <form className='leading-[4rem]' onSubmit={handleSubmit}>
                    <div>
                      <input className=" w-[20rem]  py-4  font-medium  border-b border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-800 bg-white"
                              type="text" placeholder="Name" name="username" value={formData.username} onChange={handleChange}/>
                      {errors.username && <p className='text-red-500 text-[15px]'>{errors.username}</p>}
                    </div>

                    <div>
                      <input className=" w-[20rem]  py-4  font-medium  border-b border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-800 bg-white"
                      type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
                      {errors.email && <p className='text-red-500 text-[15px]'>{errors.email}</p>}
                    </div>

                    <div>
                      <input className=" w-[20rem]  py-4  font-medium  border-b border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-800 bg-white"
                      type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
                      {errors.password && <p className='text-red-500 text-[15px]'>{errors.password}</p>}
                    </div>

                    <div>
                      <input className=" w-[20rem]  py-4  font-medium  border-b border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-800 bg-white"
                      type="password" name="confirmPassword" placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} />
                      {errors.confirmPassword && <p className='text-red-500 text-[15px]'>{errors.confirmPassword}</p>}
                    </div>

                    <button className='w-[20rem]  mt-5 bg-red-500 text-white' type="submit">Create Account</button>
                    <p>have an account&nbsp;<Link to="/login" className='border-b border-black'> Login</Link></p>

                </form>
          </div>
        </ContentWrapper>
    </div>
  );
};

export default RegistrationForm;
