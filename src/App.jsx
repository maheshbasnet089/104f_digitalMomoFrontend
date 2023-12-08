
import './App.css'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './globals/components/navbar/Navbar'
import Footer from './globals/components/footer/Footer'
import { Provider } from 'react-redux'
import store from './store/store'
import Home from './pages/home/Home'
import Login from './pages/auth/login/Login'
import Cart from './pages/cart/Cart'


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
    <Route path="/cart" element={<Cart />} />
   </Routes>
   <Footer/>
   </BrowserRouter>
   </Provider>

    </>
  )
}

export default App
