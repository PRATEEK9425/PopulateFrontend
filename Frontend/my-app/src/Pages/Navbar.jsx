


import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { GetProductListFn } from '../Reducer/ProductRed/action';
import { FaCartArrowDown } from "react-icons/fa";
import { GetcartdataOfUser } from '../Reducer/CartReducer/action';
import { useNavigate } from 'react-router-dom';
import profilepic from "../Photos/profilepic.jpeg"
import axios from 'axios';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
const initial= {
  name:""
}

// ----cartlogic--------
const dispatch = useDispatch()
const cartvalue = useSelector((cart)=>cart.CartReducer.Order)
console.log(cartvalue);


// -----------cartlogic--------


const [formdata,setFormdata] = useState(initial)

const {name} = formdata


const Handlechange =(e)=>{
const {name,value} = e.target 
setFormdata({...formdata,[name]:value})
}


const Handlesubmit =(e)=>{
e.preventDefault()
console.log(formdata);
dispatch(GetProductListFn (`/products/searchbyname/${name}`))
}

const sortfn=(values)=>{
console.log(values);
dispatch(GetProductListFn(`/products/price/${values}`))
}
const navigate = useNavigate()


const Tocart=()=>{
  navigate("/cart")
  console.log("Iam cart");
}

const Logoutfn =()=>{
  localStorage.setItem("userId","")
  navigate("/login")
}

const [profile,setProfile] = useState({})

const userId =  localStorage.getItem("userId")
console.log(userId);
const Profilepicfn=()=>{
  axios.get(`/user/profile/${userId}`)
  .then((res)=>{
setProfile(res.data)
  })
  .catch((err)=>{
console.log(err)
  })

}

useEffect(()=>{
  
    Profilepicfn()
  
},[userId])




    return (
      <div  className='mb-10 w-full md:flex items-center justify-between  ' > 
      <nav   >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
              <img  className="  block md:hidden  lg:block  h-[80%] w-[100px]  rounded-full "  src="https://salinaka-ecommerce.web.app/images/logo-full.059e10fa5fedbfb65165e7565ed3936f.png" alt="" />

              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="/" className="text-gray-300  hover:text-pink-700 px-3 py-2 rounded-md text-lg font-semibold">Home</a>
                  <a href="#" className="text-gray-300  hover:text-pink-700 px-3 py-2 rounded-md text-lg font-semibold">Shop</a>
                  <a href="#" className="text-gray-300  hover:text-pink-700 px-3 py-2 rounded-md text-lg  font-semibold">Featured</a>

                 
<div>
  
  <select onChange={(e)=>sortfn(e.target.value)}  className='font-semibold' >
    <option >Sort By Price</option>
    <option value="low-to-high">Low To High</option>
    <option value="high-to-low">High To Low</option>
  </select>
  
 

</div>


                  <form >
  <input name="name" value={name} onChange={Handlechange}   className=' h-[30px] w-[250px] '   type="text" placeholder='       Search Product' />
<button className='bg-black text-white font-bold h-[30px] '  onClick={Handlesubmit} >  Search   </button>
</form>

{/* cart */}

<div onClick={Tocart}  className='relative text-black text-3xl m-auto' >
  <span>  <FaCartArrowDown/></span>
  <div  className='bg-red-600  text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3 '  >
    <p className='text-sm  text-center'  > {cartvalue ? cartvalue.length: 0}  </p>
  </div>
  </div>
{/* cart */}

<img  className='w-[50px] h-[50px] rounded-full m-auto'
  src={profile.Profilepic ? profile.Profilepic :  profilepic} alt="" />



<button  onClick={()=>{navigate("/login")}} className= 'bg-black text-white font-semibold    rounded-xl h-[30px] '  >Login</button>
<button  onClick={Logoutfn} className='bg-black  w-[80px]  rounded-xl text-white font-semibold h-[30px] '  >Logout</button>


                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button onClick={toggleMenu} className="text-gray-400 hover:text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
  
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="text-gray-300 hover:bg-emerald-400 hover:text-white block px-3 py-2 rounded-md text-base font-semibold">HOME</a>
            <a href="#" className="text-gray-300 hover:bg-emerald-400 hover:text-white block px-3 py-2 rounded-md text-base font-semibold">SHOP</a>
            <a href="#" className="text-gray-300 hover:bg-emerald-400 hover:text-white block px-3 py-2 rounded-md text-base font-semibold">FEATURED</a>
            <a href="#" className="text-gray-300 hover:bg-emerald-400 hover:text-white block px-3 py-2 rounded-md text-base font-semibold">RECOMMEDNDED</a>
            
          </div>
          
        </div>
      </nav>
      
      </div>
    );
  };



export default Navbar