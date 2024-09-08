import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FindIDnadDelete, GetcartdataOfUser, Putdatafn } from '../Reducer/CartReducer/action';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import cartImg from "../Photos/cartimg.jpeg"

const CartPage = () => {
    const dispatch = useDispatch()

let userId = localStorage.getItem("userId")

const [cartvalue,setCartValue] = useState([])


const Getcart=()=>{
  axios.get(`/cart/checkcart/${userId}`)
.then((res)=>{
  setCartValue(res.data);
})
.catch((err)=>{
    console.log(err);
})
}

useEffect(()=>{
  if(cartvalue.length==0){
    Getcart()
  }
  
},[cartvalue.length])

    
const FindIDnadDelete  =(prodid,userId)=>{
    
   axios.delete(`/cart/remove/${prodid}`)
    .then((res)=>{
       
      dispatch(GetcartdataOfUser(userId))
    })
    .catch((err)=>{
        console.log(err)
    })
}




const IncQtyfn=(proid,updateqty,userId)=>{
  const payload = {quantity : updateqty}
  console.log(proid,updateqty);
  axios.patch(`/cart/update/${proid}`,payload)
  .then((res)=>{
    
    
    setTimeout(()=>{
         dispatch(GetcartdataOfUser(userId))
    },[2000])
  })
  .catch((err)=>{
    console.log(err);
  })

}

let total = 0 


  for(let i=0 ;i<cartvalue.length;i++){
    let Qty = cartvalue[i].quantity
    let price = cartvalue[i].productId.price
    
    total+=price*Qty
}




  return (
    <div>
        {
          cartvalue.length>0 ? <div>
  <h1 className='text-2xl text-orange-400 font-bold '  >Total Amount  ${total}</h1>
<div className='w-[50%] m-auto ' >
    {/* Result div */}
    <div >
        {
          cartvalue.length>0 && cartvalue.map((item)=>{
return(<div className='border-4   shadow-2xl shadow-cyan-800 rounded-2xl border-cyan-800 mt-4'>
   
   <img className='w-[200px] h-[150px] m-auto'   src={item.productId.Imageurl ? item.productId.Imageurl:cartImg } alt="" />
   <h1 className='text-2xl font-semibold  text-orange-400 ' >{item.productId.Product_name}</h1>
<p className=' font-serif text-gray-600 text-xl '   >{item.productId.description}</p>
<h2 className='text-3xl font-serif text-orange-400'  >${item.productId.price ? item.productId.price: "waiting.."}</h2>

<label className='text-red-700' >Quantity</label>
<div className='grid grid-cols-3 w-[40%] m-auto border-2 border-red-800 ' >

<button  onClick={()=>IncQtyfn(item._id,item.quantity++,item.userId)}  className='text-2xl  bg-green-700 text-white ' >+</button>
<h1 className='text-center  text-2xl'  >{item.quantity}</h1>
<button disabled={item.quantity=1} onClick={()=>IncQtyfn(item._id,item.quantity--,item.userId)}  className=' text-white  text-2xl bg-red-700 ' >-</button>
</div>


<button  onClick={()=>FindIDnadDelete(item._id,item.userId)} className=' mt-2 font-bold text-xl h-[45px] w-[200px] bg-red-600 text-white rounded-2xl'   >Remove Product</button>
<br/>
<br/>
</div>)

          }) 
        }




    </div>





</div>

          </div> 
          
          : 
          
          // Not loading logic
          <div>
  <h1 className='  text-3xl lg:text-6xl font-serif text-red-700'  >
    Loading Your Cart Plz Wait</h1>
  <br/>
<img  className=' h-[70%]  w-full  lg:w-[80%] m-auto rounded-2xl ' src="https://media-s3-us-east-1.ceros.com/ceros-marketing/images/2019/04/15/65d791197c0b11cf818b98a7ef113b8f/fausto-montanari4.gif" alt="" />

</div>
          }





      

    </div>
  )
}

export default CartPage