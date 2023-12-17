import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {API} from "../http";


const STATUSES = Object.freeze({
    SUCCESS : 'success',
ERROR : 'error',
    LOADING : 'loading'
})


const productSlice = createSlice({
    name : "product",
    initialState :{
        data : [],
        status : STATUSES.SUCCESS,
        selectedProduct : {}
    },
    reducers : {
       setProducts(state,action){
        state.data = action.payload
       },
       setStatus(state,action){
        state.status = action.payload
       },
       setselectedProduct(state,action){
        state.selectedProduct = action.payload
       }
    },
    extraReducers : (builder) =>{
        builder
        .addCase(fetchProducts.pending,(state)=>{
            state.status = STATUSES.LOADING
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.data = action.payload 
            state.status = STATUSES.SUCCESS
        })
        .addCase(fetchProducts.rejected,(state)=>{
            state.status = STATUSES.ERROR
        })
    }

})

export const {setProducts,setStatus,setselectedProduct} = productSlice.actions 

export default productSlice.reducer 

export const fetchProducts = createAsyncThunk('products/fetch',async()=>{
    const response = await API.get("/products")
    const data = response.data.data 
    return data
})

// export function fetchProducts(){
//     return async function fetchProductThunk(dispatch){
//         dispatch(setStatus(STATUSES.LOADING))
//         try {
//             const response = await axios.get("http://localhost:3000/api/products")
//             dispatch(setProducts(response.data.data))
//            dispatch(setStatus(STATUSES.SUCCESS))
//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(STATUSES.ERROR))
//         }
//     }
// }

export function fetchProductDetails(productId){
    return async function fetchProductDetailsThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get(`products/${productId}`)
            dispatch(setselectedProduct(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}
