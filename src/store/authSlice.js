import {  createSlice } from "@reduxjs/toolkit";

import { STATUSES } from "../globals/misc/statuses";
import {API, APIAuthenticated} from "../http";





const authSlice = createSlice({
    name : "auth",
    initialState :{
        data : [],
        status : STATUSES.SUCCESS,
        token : "",
        
    },
    reducers : {
       setUser(state,action){
        state.data = action.payload
       },
       setStatus(state,action){
        state.status = action.payload
       },
       setToken(state,action){
        state.token = action.payload
       },
       logOut(state,action){
        state.data = []
        state.token = null
        state.state = STATUSES.SUCCESS
       },
       setEmail(state,action){
        state.email = action.payload
       }
    },


})

export const {setUser,setStatus,setToken,logOut,setEmail} = authSlice.actions 

export default authSlice.reducer 


export function registerUser(data){
    return async function registerUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.post("auth/register",data)
            
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function loginUser(data){
    return async function loginUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.post("/auth/login",data)
            dispatch(setUser(response.data.data))
            dispatch(setToken(response.data.token))
            dispatch(setStatus(STATUSES.SUCCESS))
            if(response.status === 200 && response.data.token){
                localStorage.setItem('token',response.data.token)
                window.location.href = "/"
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}


export function fetchProfile(){
    return async function fetchProfileThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.get("profile/")
            dispatch(setUser(response.data.data))
         
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function forgotPassword(data){
    return async function forgotPasswordThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.post("auth/forgotPassword/",data)
            dispatch(setEmail(response.data.data))
         
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function verifyotp(data){
    return async function verifyotpThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.post("auth/verifyOtp/",data)
            // dispatch(setUser(response.data.data))
         
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}


