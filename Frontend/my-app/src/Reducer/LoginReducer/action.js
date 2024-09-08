import * as types from "./actiontype"
import axios from "axios"

const Logingetreq=()=>{
    return{
        type:types.Login_GetReq
    }
}

const Loginreqsuccess=(payload)=>{
    return{
        type:types.Login_GetReq_success,
        payload
    }
}

const LoginGetReqfailure=()=>{
    return {
        type:types.Login_GetReq_failure
    }
}

const LoginMainFN=(payload)=>(dispatch)=>{
dispatch(Logingetreq())
    return axios.post(`/user/login`,payload)
        .then((res)=>{
dispatch(Loginreqsuccess(res.data))
        })
        .catch((err)=>{
            console.log(err);
            dispatch(LoginGetReqfailure())
        })
    
}

export {LoginMainFN}