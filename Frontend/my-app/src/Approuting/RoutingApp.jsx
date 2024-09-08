import React from 'react'
import {Routes,Route} from "react-router-dom";
import Home from '../Pages/Home';
import SingleProduct from '../Component/SingleProduct';
import SignUp from '../Pages/SignUp';
import Login from '../Pages/Login';
import CartPage from '../Component/CartPage';
import LoginuserHome from '../Pages/LoginuserHome';
const RoutingApp = () => {
  return (
    <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/:userid" element={<LoginuserHome />} />
        <Route path="/singleprouct/:productid/:userid" element={<SingleProduct/>} />  
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartPage/>} />

    </Routes>
  )
}

export default RoutingApp