import * as types from "./actiontype"


const initial = {
    Data:[],
    isLoading:false,
    isError:false
}


const ProductReducer=(state=initial,action)=>{
const {type,payload} = action

switch(type){
case types.GetProduct :return {...state,isLoading:true}
case types.GetProduct_Success:return{...state,isLoading:false,Data:payload}
case types.GetProduct_Failure:return{...state,Data:[],isError:true}
    default :return state
}

}

export{ProductReducer}