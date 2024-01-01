
import './App.css'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './globals/components/navbar/Navbar'
import Footer from './globals/components/footer/Footer'
import { Provider } from 'react-redux'
import store from './store/store'
import Home from './pages/home/Home'
import Login from './pages/auth/login/Login'
import Cart from './pages/cart/Cart'
import Register from './pages/auth/register/Register'
import ProductDetails from './pages/productDetails/productDetails'
import CheckOut from './pages/checkout/CheckOut'
import KhaltiSuccess from './pages/success/KhaltiSuccess'
import UserProfile from './pages/profile/UserProfile'
import MyOrders from './pages/myOrders/MyOrders'
import OrderDetails from './pages/orderDetails/orderDetails'
// import AdminDashboard from './pages/admin/dashboard/AdminDashboard'
// import ProtectedRoute, { ProctectedRouteForVendor } from './pages/ProtectRoute'


function App() {


  return (
    <>
   <Provider store={store}>
   {/* <Navbar />
   <RouterProvider router={router} />
   <Footer /> */}
   <BrowserRouter>
   <Navbar />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/productdetails/:id" element={<ProductDetails />} />
    <Route path="/checkout" element={<CheckOut />} />
   <Route path="/success" element={<KhaltiSuccess />} />
   <Route path="/profile" element={<UserProfile />} />
   <Route path="/myorders" element={<MyOrders />} />
   <Route path="/myorders/:id" element={<OrderDetails />} />
   {/* <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
   <Route path="/vendor" element={<ProctectedRouteForVendor><VendorDashboard /></ProctectedRouteForVendor>} /> */}
   </Routes>
   <Footer/>
   </BrowserRouter>
   </Provider>

    </>
  )
}

export default App
