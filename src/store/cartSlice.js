import { createSlice } from "@reduxjs/toolkit";
import { APIAuthenticated } from "../http";
import { STATUSES } from "../globals/misc/statuses";




const cartSlice = createSlice({
    name : "cart",
    initialState :
    {
        items : [],
        status : STATUSES.SUCCESS
    },
    reducers : {
        setItems(state,action){
            state.items = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        },
        updateItems(state,action){
            const index = state.items.findIndex(item=>item.product._id === action.payload.productId)
            if(index !== -1){
                state.items[index].quantity = action.payload.quantity
            }
        },
        deleteItem(state,action){
            // action.payload.productId
            const index = state.items.findIndex(item=>item.product._id === action.payload.productId)
            state.items.splice(index,1)
        },
        emptyCart(state,action){
            state.items = []
        }
    }
})

export const {setItems,setStatus,updateItems,deleteItem,emptyCart} = cartSlice.actions 

export default cartSlice.reducer 

export function addToCart(productId){
    return async function addToCartThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.post(`/cart/${productId}`)
            dispatch(setItems(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function fetchCartItems(){
    return async function fetchCartItemsThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.get(`/cart/`)

            dispatch(setItems(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function udpateCartItem(productId,quantity){
    return async function updateCartItemThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.patch(`/cart/${productId}`,{quantity})
            dispatch(updateItems({productId,quantity}))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function deleteCartItem(productId){
    return async function deleteCartItemThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.delete(`/cart/${productId}`)
            dispatch(deleteItem({productId}))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}


