// import React from 'react'
// import { useSelector } from 'react-redux'
// const ProctectedRouteForVendor = ({children})=>{
//     const {data} = useSelector((state)=>state.auth)

//     if(data.role === 'vendor'){
//         return (
//             <>{children}</>
//           )
//     }else{
//         return (
//             <h1>You don't have permission</h1>
//         )
//     }
// }

// const ProtectedRoute = ({children}) => {
//     const {data} = useSelector((state)=>state.auth)

//     if(data.role === 'admin'){
//         return (
//             <>{children}</>
//           )
//     }else{
//         return (
//             <h1>You don't have permission</h1>
//         )
//     }
// }

// export {ProtectedRoute,ProctectedRouteForVendor}