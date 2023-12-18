import React, { useEffect } from 'react'

const Khalti = () => {
    const queryParams = new URLSearchParams(location.search)
    const totalAmount = queryParams.get('totalamount')
    const orderId = queryParams.get("orderid")

    console.log(totalAmount,orderId)

    useEffect(()=>{
        // axios.post to khalti intiation api with above data 
    },[])
  return (
    <div>Khalti</div>
  )
}

export default Khalti