import { useSelector } from 'react-redux'
import './Cart.css'
const Cart = () => {
    const products = useSelector((state)=>state.cart)
  return (
    <div className="h-screen pt-20 bg-gray-100">
    <h1 className="mb-10 text-2xl font-bold text-center">Cart Items</h1>
    <div className="justify-center max-w-5xl px-6 mx-auto md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
     {products.map((product)=>{
        return (
            <div key={product._id} className="justify-between p-6 mb-6 bg-white rounded-lg shadow-md sm:flex sm:justify-start">
            <img src={product.productImage} alt="product-image" className="w-full rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900">{product.productName}</h2>
                <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
              </div>
              <div className="flex justify-between mt-4 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center border-gray-100">
                  <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                  <input className="w-8 h-8 text-xs text-center bg-white border outline-none" type="number" value="2" min="1" />
                  <span className="px-3 py-1 duration-100 bg-gray-100 rounded-r cursor-pointer hover:bg-blue-500 hover:text-blue-50"> + </span>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm">259.000 ₭</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 duration-150 cursor-pointer hover:text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )
     })}

      </div>
    
      <div className="h-full p-6 mt-6 bg-white border rounded-lg shadow-md md:mt-0 md:w-1/3">
        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">$129.99</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Shipping</p>
          <p className="text-gray-700">$4.99</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">$134.98 USD</p>
            <p className="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
      </div>
    </div>
  </div>
  )
}

export default Cart