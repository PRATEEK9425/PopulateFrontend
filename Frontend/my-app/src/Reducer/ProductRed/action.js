import * as types from "./actiontype"
import axios from "axios"
const Getdata=()=>{
return{
    type:types.GetProduct
}
}

const GetdataSuccess=(payload)=>{
    return{
        type:types.GetProduct_Success,
        payload
    }
    }
    const GetdataFailure=()=>{
        return{
            type:types.GetProduct_Failure
        }
    }

    const GetProductListFn=(url)=>(dispatch)=>{
dispatch(Getdata())
        return axios.get(url)
        .then((res)=>{
            dispatch(GetdataSuccess(res.data))
            
        })
        .catch((err)=>{
            dispatch(GetdataFailure())
            console.log(err);
        })
    }


    export {GetProductListFn}
