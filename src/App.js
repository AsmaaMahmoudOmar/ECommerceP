import React from 'react'
import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Categories from './Components/Categories/Categories'
// import Products from './Components/Products/Products'
import Orders from './Components/Orders/Orders'
import Home from './Components/Home/Home'
import NotFound from './Components/NotFound/NotFound'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectedLogin from './Components/ProtectedLogin/ProtectedLogin'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CheckOut from './Components/CheckOut/CheckOut'

export default function App() {
 let routers =createHashRouter([
  {path:'',element:<Layout/>, children:[
    {path:'',element:<Navigate to ={'home'}/>},
    {path:'home',element:<ProtectedRoute> <Home/> </ProtectedRoute>},
    {path:'login',element:<Login/>},
    {path:'register',element:<Register/> },
    {path:'cart',element:<ProtectedRoute> <Cart/> </ProtectedRoute>},
    {path:'brands',element:<ProtectedRoute> <Brands/></ProtectedRoute>  },
    {path:'categories',element:  <ProtectedRoute> <Categories/></ProtectedRoute> },
    // {path:'products',element: <ProtectedRoute> <Products/></ProtectedRoute> },
    {path:'allorders',element: <ProtectedRoute> <Orders/></ProtectedRoute> },
    {path:'productDetails/:id',element: <ProtectedRoute> <ProductDetails/></ProtectedRoute> },
    {path:'checkout/:id',element: <ProtectedRoute> <CheckOut/></ProtectedRoute> },
    {path:'*',element: <ProtectedRoute> <NotFound/></ProtectedRoute> },
  ]}
 ])
  return (
    <>
      <RouterProvider router={routers}/>
    </>
  )
}

