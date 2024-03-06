import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import {Link} from 'react-router-dom'
const Login = () => {
  let {loginUser} = useContext(AuthContext)
  return (
      <div>
          <form onSubmit={loginUser}>
              <input type="text" name="username" placeholder="Enter Username" />
              <input type="password" name="password" placeholder="Enter Password" />
              <input type="submit"/>
          </form>
          <Link to={"/register"}>Register</Link>

          

      </div>
  )
}

export default Login