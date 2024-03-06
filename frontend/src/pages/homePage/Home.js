import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

const Home = () => {
  const {user,logoutUser}=useContext(AuthContext)
  return (
    <div className='min-h-[500px]'>
      <p>{user?.username}</p>
      <button onClick={logoutUser}>Logout</button>
      
    </div>
  )
}

export default Home