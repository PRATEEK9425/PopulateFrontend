import * as types from "./actiontype"

const initial={

    token:"",
    isAuth:false,
    isError:false,
    isLoading:false
}


const LoginReducer=(state=initial,action)=>{

const {type,payload} = action
switch(type){
case types.Login_GetReq :return{...state,isLoading:true}
case types.Login_GetReq_success:return{...state,isLoading:false, token:payload ,isAuth:true}
    case types.Login_GetReq_failure :return{...state,token:"",isAuth:false}
default :return state
}


}

export{LoginReducer}