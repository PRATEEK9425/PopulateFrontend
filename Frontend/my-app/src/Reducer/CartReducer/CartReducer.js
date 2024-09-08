import * as types from "./actiontype"

const initial = {
    Order:[],
    isLoading :false,
    isError:false
}

const CartReducer=(state=initial,action)=>{
const {type,payload} = action 
switch(type){

case types.Get_cart_data :return{...state,isLoading:true}
case types.Get_cart_data_success:return{...state,isloading:false,Order:payload}
case types.Get_cart_data_failure :return {...state,Order:[],isError:true}

case types.Post_cart:return {...state,isLoading:true}
case types.Post_To_cart_success:return{...state,isloading:false,Order:[...state.Order,payload]}
case types.Post_To_cart_Failure :return {...state,Order:[],isError:true}


case types.Put_req:return {...state,isLoading:true}
case types.Put_req_success:return {...state,isLoading:false,Order:[...state.Order,payload]}
case types.Put_req_failure:return{...state,isError:true,Order:[]}


    default :return state
}
}

export {CartReducer}