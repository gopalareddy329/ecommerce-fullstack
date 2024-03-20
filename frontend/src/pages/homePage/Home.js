import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import Header from './header/Header'

const Home = () => {
  const {user,logoutUser}=useContext(AuthContext)
  return (
    <div className='min-h-[500px]'>
      <div>
          <Header />
      </div>
      <p>{user?.username}</p>
      <button onClick={logoutUser}>Logout</button>
      
     
    </div>
  )
}

export default Home