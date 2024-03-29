import React, { useContext } from 'react';
//import CartContext  from '../../context/CartContext';
import AuthContext from '../../context/AuthContext'
import Header from './header/Header'
import Products from '../../components/products/Products'

const Home = () => {
  const {user,logoutUser}=useContext(AuthContext)
  //const {state}=useContext(CartContext)

  return (
    <div className='min-h-[500px]'>
      <div>
          <Header />
      </div>
      <div className='mt-20'>
         <Products/>
      </div>
      <p>{user?.username}</p>
      <button onClick={logoutUser}>Logout</button>
      
     
    </div>
  )
}

export default Home