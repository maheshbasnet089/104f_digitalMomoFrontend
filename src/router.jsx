import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";




const router = createBrowserRouter([
    {
        path : "/",
        element : <Home />
    },
    {
        path : "/register",
        element :  <Register />
    },
    {
        path : "/login",
        element : <Login />
    }
])


export default router