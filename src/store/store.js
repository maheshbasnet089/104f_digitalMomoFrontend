import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import productReducer from './productSlice'
import authSlice from './authSlice'
import checkoutSlice from "./checkoutSlice";

const store = configureStore({
    reducer : {
        
        cart : cartReducer,
        product : productReducer,
        auth : authSlice,
        checkout : checkoutSlice
        
    }
})

export default store