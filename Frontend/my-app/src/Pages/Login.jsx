import React, { useEffect, useState } from 'react'
import logo from "../Photos/logo.webp"
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom"
import styles from "../styles/Username.module.css"
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { GetcartdataOfUser } from '../Reducer/CartReducer/action';
const Login = () => {
  const[showpass,setShowpass]=useState(false)
  const initial ={
    email:"",
    password:""
  }
const[formdata,setFormdata] = useState(initial)
const navigate = useNavigate()
const Handelchange=(e)=>{
const {name,value} = e.target 
setFormdata({...formdata,[name]:value})
}

// cart logic----------
const dispatch = useDispatch()
// cart logic


const Handlesubmit=async(e)=>{
e.preventDefault()


e.preventDefault()

const dataResponse = await fetch("https://ecommerce-ehm5.onrender.com/user/login",{
    method : "post",
    
    headers : {
        "content-type" : "application/json"
    },
    body : JSON.stringify(formdata)
})

const dataApi = await dataResponse.json()

if(dataApi.success){
    toast.success(dataApi.message)
      
    navigate(`/${dataApi.userId}`)
    localStorage.setItem("userId",dataApi.userId);
    
    dispatch(GetcartdataOfUser(dataApi.userId))
}

if(dataApi.error){
    toast.error(dataApi.message)
}

}

const {email,password} = formdata
  return (
    <section id='login'>
    <div className='mx-auto container p-4'>

        <div className='bg-white p-5 w-full max-w-sm mx-auto rounded-2xl'>
        <div className='w-[200px] h-[100px] m-auto'>
                   
                   <img style={{margin:"auto"}}  className={styles.profile_img} src={logo} alt='login icons'/>
               
               
               </div>
<br/>
                <form onSubmit={Handlesubmit}  className='pt-6 flex flex-col gap-2' >
                    <div className='grid'>
                        <label className='text-cyan-800 font-serif text-xl lg:text-2xl '  >Email  </label>
                        <div className='bg-slate-100 p-2 hover:border-4 hover:border-violet-700 hover:rounded-xl   '>
                            <input required
                           
                                type='email' 
                                placeholder='enter email' 
                                name="email" value={email} onChange={Handelchange}
                                className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>

                    <div>
                        <label className='text-cyan-800 font-serif text-xl lg:text-2xl'  >Password  </label>
                        <div className='bg-slate-100 p-2 flex hover:border-4 hover:border-violet-700 hover:rounded-xl   '>
                            <input required
                                type={showpass ? "text" : "password"} 
                                placeholder='enter password'
                                  name='password' value={password}   onChange={Handelchange}
                                className='w-full h-full outline-none bg-transparent  '/>
                            <div className='cursor-pointer text-xl' onClick={()=>setShowpass((preve)=>!preve)}>
                                <span>
                                    {
                                        showpass ? (
                                            <FaEyeSlash/>
                                        )
                                        :
                                        (
                                            <FaEye/>
                                        )
                                    }
                                </span>
                            </div>
                        </div>
                        <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                            Forgot password ?
                        </Link>
                    </div>

                    <button   className=' border-4 hover:border-teal-500 md:hover:text-2xl text-xl text-white rounded-xl font-serif h-12 w-[120px] m-auto md:h-12 md:w-[150px] bg-gradient-to-r from-stone-500 via-purple-500 to-teal-500 ...'>Login </button>

                </form>

                <p className='my-5'>Don't have account ? <Link to={"/register"} className=' text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
        </div>


    </div>
</section>
  )
    
}


export default Login