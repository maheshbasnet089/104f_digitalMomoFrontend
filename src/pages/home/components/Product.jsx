


  
  export default function Product() {

    return (
<div className="relative w-full">
     
     <div className="relative bg-white-50">
         <div className="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
         <h1 className="text-2xl font-bold text-yellow-900 md:text-3xl lg:w-10/12">Our Popular Foods</h1>

       <div className="flex flex-wrap justify-between">
 
          <div className="mx-auto overflow-hidden duration-300 transform bg-white rounded-lg shadow-md mt-11 w-80 dark:bg-slate-800 hover:scale-105 hover:shadow-lg">
          <img className="object-cover object-center w-full h-48" src="https://images.unsplash.com/photo-1674296115670-8f0e92b1fddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Product Image" />
          <div className="p-4">
            <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Product Name</h2>
            <p className="mb-2 text-base text-gray-700 dark:text-gray-300">Product description goes here.</p>
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">$20.00</p>
              <p className="text-base font-medium text-gray-500 line-through dark:text-gray-300">$25.00</p>
              <button className="px-4 py-2 mx-6 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-600">
    Add to Cart
  </button>
            </div>
          </div>
        </div>

   
       </div>
         </div>
     </div>
 </div>


     
 
    )
  }