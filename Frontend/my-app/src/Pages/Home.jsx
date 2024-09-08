import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetProductListFn } from '../Reducer/ProductRed/action'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
const Home= () => {
const dispatch = useDispatch()
const Product = useSelector((store)=>store.ProductReducer.Data)

const navigate= useNavigate()
let userid = localStorage.getItem("userId")


useEffect(()=>{
if(Product.length==0){
  dispatch(GetProductListFn(`/products`))
}
},[Product.length,dispatch])

const Addtocartfn=(productid)=>{
 
  if(!userid){
    toast.error("Login First")
    navigate("/login")
  }else{
    toast.success("Welcome To store")
    navigate(`/singleprouct/${productid}/${userid}`)
  }
}

  return (
    <div className='mt-10' >





<div className='grid    grid-cols-2 md:grid-cols-3 lg:grid-cols-6     gap-2 w-[80%] m-auto'  >
  {
    Product.length>0 && Product.map((item)=>{
      return <div>
<div className='bg-slate-100'  >
<img    src={item.Imageurl} alt="" />

</div>

<h1 className='font-semibold'  >{item.Product_name}</h1>
<h1 className='font-semibold'  >${item.price}</h1>

<button onClick={()=>Addtocartfn(item._id)}  className=' h-[30px]   bg-black text-white font-semibold w-full  '  >Add to basket</button>

      </div>
    })
  }
</div>


    </div>
  )
}

export default Home