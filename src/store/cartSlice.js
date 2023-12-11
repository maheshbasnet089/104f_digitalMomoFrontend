import { createSlice } from "@reduxjs/toolkit";




const cartSlice = createSlice({
    name : "cart",
    initialState :[],
    reducers : {
        add(state,action){
            state.push(action.payload)  
        },
        remove(state,action){
           return state.filter((item)=>item._id !== action.payload) // [1,2,3] ==> 3 ==>state = [1,2]
            
        }
    }
})

export const {add,remove} = cartSlice.actions 

export default cartSlice.reducer 
