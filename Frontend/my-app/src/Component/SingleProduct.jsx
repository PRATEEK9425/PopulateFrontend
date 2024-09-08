import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import {GetcartdataOfUser, PostToCARTmAINfN } from '../Reducer/CartReducer/action';
import axios from 'axios';

import { toast } from 'react-toastify';
const SingleProduct = () => {
    const {productid,userid}=useParams()
    const dispatch = useDispatch()
const [data,setData] = useState([])    

const Getadatafn=()=>{
    axios.get(`/products/single/${productid}`)
    .then((res)=>{
        setData(res.data)
    }).catch((err)=>{
        console.log(err);
    })
}


useEffect(()=>{
Getadatafn()
},[data.length,productid])


const AddTocart=(productidbyclick)=>{

dispatch(PostToCARTmAINfN(productidbyclick,userid))
toast("Item Added To Cart")
}

  return (
    <div>
<div className='grid grid-cols-3 gap-2 w-[70%] m-auto'  >
    <div  className='border-2 border-red-2 gap-2' >
<img   className='w-[60%] h-[40%] m-auto   ' src={data.Imageurl} alt="" />
    </div>
    <div  className=' bg-slate-200 border-2 border-red-2 gap-2 h-[400px] m-auto  ' >
    <img className='w-[120%]' src={data.Imageurl} alt="" />
    </div>
    {/* content div */}
    <div>
    <div  className=' font-semibold gap-2  text-left w-[80%] m-auto ' >
<p>{data.Product_name}</p>
<h1 className='text-3xl'  >{data.Product_name}</h1>
<p className='text-center'  >{data.description}</p>
    </div>
    <hr />
    <p  className='text-sm text-slate-600' >Lens Width and Frame Size</p>
    <select  className=' h-[40px] w-full rounded-xl border-2 border-sky-400'  >
<option value="">-Select Size-</option>
<option className='bg-sky-100' value="">28 mm</option>
<option className='bg-sky-100' value="">36 mm</option>
<option  className='bg-sky-100'value="">42 mm</option>
</select>

<button  onClick={()=>AddTocart(productid)}   className='bg-black text-white mt-10 font-semibold w-[40%] '   >Add To Basket</button>

    </div>



</div>
    </div>
  )
}

export default SingleProduct