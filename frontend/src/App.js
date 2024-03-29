// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage/Home';
import LoginForm from './pages/loginPage/Login';
import PrivateRoute from './utlis/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import RegistrationForm from './pages/registerPage/Register';
import  OutLet  from './components/outLet/OutLet';
import Cart from './pages/cartPage/Cart';
import ProductView from './pages/productView/ProductView';
import ForYouPage from './pages/forYouPage/ForYouPage';
const App = () => {
  return (
    <Router>
      <AuthProvider>
      <CartProvider>
          <Routes>
                  <Route path='/'  element={<OutLet />}>
                      <Route path="/login" element={<LoginForm />} />
                      <Route path="/register" element={<RegistrationForm />} />

                      
                        <Route path="/" index element={<Home/>} />
                        <Route path="/products/:id" index element={<ProductView/>} />
                        <Route path="/foryou" element={<PrivateRoute Component={<ForYouPage/>} /> } />
                        <Route path="/cart" element={<PrivateRoute Component={<Cart/>} /> } />

                  </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
