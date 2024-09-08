
import React, { useState } from 'react'
import logo from "../Photos/logo.webp"
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom"
import styles from "../styles/Username.module.css"

import { ImageTobase64fn } from '../Helper/imageTobase64';

import { toast } from 'react-toastify';

import axios from "axios"


const SignUp = () => {
  const[showpass,setShowpass]=useState(false)
  const[showconfirmpass,setShowconfirmpass] = useState(false)

const navigate= useNavigate()
  const initial ={
    Profilepic:"",
    name:"",
    email:"",
    password:"",
    confirmpassword:"",
    Mob_number:"",
    education:false,
    Gender:""
   
  }
  
const[formdata,setFormdata] = useState(initial)
const {Profilepic,name,email,password,confirmpassword,Mob_number,education,Gender} =formdata

const Handelchange = (e) =>{
    const { name , value,type,checked } = e.target
const Inputvalue = type==="checkbox"? checked:value
    setFormdata({...formdata,[name]:Inputvalue})
}

const Uploadprofilepic = async(e) =>{
  const file = e.target.files[0]
  
  const imagePic = await ImageTobase64fn(file)
  
  setFormdata((preve)=>{
    return{
      ...preve,
      Profilepic : imagePic
    }
  })

}


const Handlesubmit = async(e) =>{
    e.preventDefault()

    if(password === confirmpassword){

      axios.post("https://ecommerce-ehm5.onrender.com/user/register",formdata)
  .then((res)=>{
let ResponseDb = res.data.message 
if(ResponseDb =="User created Successfully!"){
toast.success(ResponseDb)
navigate("/login")
}
else if(ResponseDb == "User Already Exist"){
    toast.success(ResponseDb)
    navigate("/login")
}

else{
    toast.error(ResponseDb)
}
  }).catch((err)=>{
    toast.error(err)
  })
    }else{
      toast.error("Please check password and confirm password")
    }

}





  return (
   <div>
    <section id='login'>
    <div className='mx-auto container p-4'>

        <div className='    bg-white p-5 w-full max-w-sm mx-auto rounded-2xl'>
                
        <form  >
          
          
        <label htmlFor="profile">
                    <img style={{margin:"auto"}} src={ Profilepic ||  logo } className={`${styles.profile_img} `} alt="avatar" />
                  <p className=' text-center font-serif text-red-700  '> UPLOAD PROFILE LESS THAN 10Kb </p>
                  </label>
                  
                  <input  required onChange={Uploadprofilepic} type="file" id='profile' name='profile' />
              
          </form>       

                <form   className='pt-6 flex flex-col gap-2' >
                    
                

                    
                <div className='grid'>
                        <label className='text-cyan-800 font-serif text-xl lg:text-2xl '  >Name </label>
                        <div className='bg-slate-100 p-2 hover:border-4 hover:border-violet-700 hover:rounded-xl   '>
                            <input required
                                type='text' 
                                placeholder='Enter Your Name' 
                                name="name" value={name} onChange={Handelchange}
                                className='w-full h-full outline-none bg-transparent'/>
                        </div>

                        <label className='text-cyan-800 font-serif text-xl lg:text-2xl '  >Gender</label>
<label className='text-cyan-800 font-serif text-xl lg:text-2xl '>
    <input type="radio" name="Gender"  value="Male" onChange={Handelchange}  />
    <span>   Male   </span>

    <input type="radio" name="Gender"  value="Female" onChange={Handelchange}  />
    <span>   Female</span>
</label>
<br/>


                        <label className='text-cyan-800 font-serif text-xl lg:text-2xl '  >Phone Number </label>
                        <div className='bg-slate-100 p-2 hover:border-4 hover:border-violet-700 hover:rounded-xl   '>
                            <input required
                                type='number' 
                                placeholder='Enter Your Mobile Number' 
                                name="Mob_number" value={Mob_number} onChange={Handelchange}
                                className='w-full h-full outline-none bg-transparent'/>
                        </div>

                    </div>
                    
                    
                    <div className='grid'>
                        <label className='text-cyan-800 font-serif text-xl lg:text-2xl '  >Email  </label>
                        <div className='bg-slate-100 p-2 hover:border-4 hover:border-violet-700 hover:rounded-xl   '>
                            <input required
                                type='text' 
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
                       
                    </div>

{/* confirm pass */}

<div>
                        <label className='text-cyan-800 font-serif text-xl lg:text-2xl'  >Confirm Password  </label>
                        <div className='bg-slate-100 p-2 flex hover:border-4 hover:border-violet-700 hover:rounded-xl   '>
                            <input required
                                type={showconfirmpass ? "text" : "password"} 
                                placeholder='Confirm password'
                                  name='confirmpassword' value={ confirmpassword}   onChange={Handelchange}
                                className='w-full h-full outline-none bg-transparent  '/>
                            <div className='cursor-pointer text-xl' onClick={()=>setShowconfirmpass((prev)=>!prev)}>
                                <span>
                                    {
                                      showconfirmpass ? (
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
{/* checkbox */}

<label className='text-cyan-800 font-serif text-xl lg:text-2xl '  >Education(Graduation) </label>
                        <div >
                            <input required
                                type='checkbox' 
                                
                                name="education" checked={education} onChange={Handelchange}
                                className='w-full h-full outline-none bg-transparent'/>
                        </div>

{/* checkbox */}
                        <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                            Forgot password ?
                        </Link>
                    </div>
{/* confirm pass */}

                    <button onClick={Handlesubmit}  className=' border-4 hover:border-teal-500 md:hover:text-2xl text-xl text-white rounded-xl font-serif h-12 w-[120px] m-auto md:h-12 md:w-[150px] bg-gradient-to-r from-stone-500 via-purple-500 to-teal-500 ...'>
                        Register </button>

                </form>

                <p className='my-5 font-serif'>Already have account ? <Link to={"/login"} className=' text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
        </div>


    </div>
</section>
   </div>
  )
}

export default SignUp