
import * as types from "./actiontype"
import axios from "axios"
const PostIncart =()=>{
return {
    type:types.Post_cart
}
}

const PostIncartSuccess=(payload)=>{
return {
    type :types.Post_To_cart_success,
    payload
}
}

const PostIncartFailure=()=>{
    return {
        type: types.Post_To_cart_Failure
    }
}

const PostToCARTmAINfN  = (addedproductId,userloginId)=>(dispatch)=>{
    console.log(addedproductId,userloginId);
    dispatch(PostIncart())
return axios.post(`/cart/addtocart/${userloginId}/${addedproductId}`)
.then((res)=>{
    dispatch(PostIncartSuccess(res.data))
   
})
.catch((err)=>{
    dispatch(PostIncartFailure())
})
}
// ------------------cartcheckfn -------------

const Getcartdata=()=>{
    return {
        type:types.Get_cart_data
    }
}


const GetcartdataSuccess=(payload)=>{
    return {
        type :types.Get_cart_data_success,
        payload
    } 
}

const GetcartdataFailure=()=>{
    return {
        type:types.Get_cart_data_failure
    }
}

const GetcartdataOfUser =(userIdcheck)=>(dispatch)=>{
    dispatch(Getcartdata())
return axios.get(`/cart/checkcart/${userIdcheck}`)
.then((res)=>{
    dispatch(GetcartdataSuccess(res.data))
})
.catch((err)=>{
    dispatch(GetcartdataFailure())
})


}

const Putreq=()=>{
    return{
type:types.Put_req
    }
}

const Putreqsuccess=(payload)=>{
    return{
type:types.Put_req_success,
payload
    }
}

const Putreqfailure=()=>{
    return{
type:types.Put_req_failure
    }
}

const Putdatafn=(id,payload)=>(dispatch)=>{
    console.log(payload,id);
    dispatch(Putreq())
    return axios.patch(`/cart/update/${id}`,payload)
    .then((res)=>{
        dispatch(Putreqsuccess(res.data))
    })
    .catch((err)=>{
        dispatch(Putreqfailure())
        console.log(err)
    })
}



export{PostToCARTmAINfN,GetcartdataOfUser,Putdatafn}