import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useForm} from "react-hook-form"
import { createOrder } from '../../store/checkoutSlice'
import { STATUSES } from '../../globals/misc/statuses'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { APIAuthenticated } from '../../http'

const CheckOut = () => {
    const {items:products} = useSelector((state)=>state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()
   const {register,handleSubmit,formState} = useForm()
   const [paymentMethod,setPaymentMethod] = useState("COD")
   const {status,data} = useSelector((state)=>state.checkout)
   const subTotal = products.reduce((amount,item)=>item.quantity * item.product.productPrice + amount,0)
   const shippingAmount = 100
   const totalAmount = subTotal + shippingAmount
   const handleOrder = (data)=>{
    const orderDetails = {
        shippingAddress : data.shippingAddress, 
        totalAmount : totalAmount,
        items : products,
        paymentDetails : {
            method : paymentMethod
        },
        phoneNumber : data.phoneNumber
    }
    dispatch(createOrder(orderDetails))
    
   
    
   }
   const proceedForKhaltiPayment = ()=>{
    const currentOrder = data[data.length -1]
    if(status === STATUSES.SUCCESS && paymentMethod === "COD" ){
        return alert("Order placed successfully")
     }  
    if(status === STATUSES.SUCCESS && paymentMethod === "khalti" ){
        const {totalAmount,_id:orderId} = data[data.length -1]
        
       handleKhalti(orderId,totalAmount)
    }

   }

   useEffect(()=>{
    proceedForKhaltiPayment()
   },[status,data])

   const handlePaymentChange = (e)=>{
    setPaymentMethod(e.target.value)

   }
   const handleKhalti = async (orderId,totalAmount)=>{
    try {
      const response = await APIAuthenticated.post('/payment',{orderId,amount:totalAmount})
      if(response.status === 200){
        window.location.href = response.data.paymentUrl
      }

    } catch (error) {
      console.log(error)
    }
   }


  return (
    <>
    <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">

  <div className="mt-4 py-7 text-xs sm:mt-0 sm:ml-auto sm:text-base">

  </div>
</div>
<div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
  <div className="px-4 pt-8">
    <p className="text-xl font-medium">Order Summary</p>
    <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
  {products.length > 0 && products.map((product)=>{
    return (
        <div key={product.product._id} className="flex flex-col rounded-lg bg-white sm:flex-row">
        <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
        <div className="flex w-full flex-col px-4 py-4">
          <span className="font-semibold">{product.product.productName}</span>
          <span className="float-right text-gray-400">Qty :{product.quantity} </span>
          <p className="text-lg font-bold">Rs. {product.product.productPrice} </p>
        </div>
      </div>
    )
  })}
 
    </div>

    <p className="mt-8 text-lg font-medium">Payment Methods</p>
    <form className="mt-5 grid gap-6">
      <div className="relative">
        <input className="peer hidden" id="radio_1" type="radio" name="radio" value="COD" checked={paymentMethod==="COD"} onChange={handlePaymentChange} />
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
          <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
          <div className="ml-5">
            <span className="mt-2 font-semibold">COD(Cash On Delivery)</span>
          </div>
        </label>
      </div>
      <div className="relative">
        <input className="peer hidden" id="radio_2" type="radio" value="khalti" name="radio" onChange={handlePaymentChange}  />
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
          <img className="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
          <div className="ml-5">
            <span className="mt-2 font-semibold">Online(Khalti)</span>
          </div>
        </label>
      </div>
    </form>
  </div>
 <form onSubmit={handleSubmit((data)=>{
    handleOrder(data)
 })} noValidate>
 <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
    <p className="text-xl font-medium">Payment Details</p>
    <p className="text-gray-400">Complete your order by providing your payment details.</p>
    <div className="">
      <label for="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
      <div className="relative">
        <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" {...register("email",{required : "Email is required"})} />
        <p>{formState.errors.email && formState.errors.email.message}</p>


        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </div>
      </div>
      <label for="phoneNumber" className="mt-4 mb-2 block text-sm font-medium">Phone Number</label>
      <div className="relative">
        <input type="number" id="phoneNumber" name="phoneNumber" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your Phone Number"{...register('phoneNumber',{required :"Phone Number is Required"})}  />

        <p>{formState.errors.phoneNumber && formState.errors.phoneNumber.message}</p>

      </div>
 
      <label for="billing-address" className="mt-4 mb-2 block text-sm font-medium">Shipping Address</label>
      <div className="flex flex-col sm:flex-row">
        <div className="relative flex-shrink-0 sm:w-7/12">
          <input type="text" id="billing-address" name="shippingAddress" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" {...register("shippingAddress",{required : "Shipping Address is required"})} />
          <p>{formState.errors.shippingAddress && formState.errors.shippingAddress.message}</p>
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg" alt="" />
          </div>
        </div>
       
      </div>

     
      <div className="mt-6 border-t border-b py-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Subtotal</p>
          <p className="font-semibold text-gray-900">Rs {subTotal}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Shipping</p>
          <p className="font-semibold text-gray-900">Rs {shippingAmount}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Total</p>
        <p className="text-2xl font-semibold text-gray-900">Rs {totalAmount}</p>
      </div>
    </div>
  {
    paymentMethod === "COD" ? (
      <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
    ) :
    (  <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" style={{backgroundColor:'purple'}}>Pay With Khalti</button>)
  }
  </div>
 </form>
</div>
    </>

  )
}

export default CheckOut