// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage/Home';
import Login from './pages/loginPage/Login';
import PrivateRoute from './utlis/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/registerPage/Register';
import  OutLet  from './components/outLet/OutLet';
import Cart from './pages/cartPage/Cart';


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
                <Route path="/login" element={<Login />} />
                
                
                <Route path='/' element={<OutLet />}>
                    <Route path="/" element={<Home/> } />
                    <Route path="/register" element={<Register />} />
                    <Route path="/cart" element={<PrivateRoute Component={Cart} /> } />
                </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
