
import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import { ProductReducer } from "./ProductRed/ProductReducer"

import {thunk} from "redux-thunk"
import { LoginReducer } from "./LoginReducer/LoginReducer"
import { CartReducer } from "./CartReducer/CartReducer"
const RootReducer =combineReducers({ProductReducer,LoginReducer,CartReducer})


const store = legacy_createStore(RootReducer,applyMiddleware(thunk))

export {store}