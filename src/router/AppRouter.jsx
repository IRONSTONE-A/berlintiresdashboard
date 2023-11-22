import React, { useContext }  from 'react'
import {BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom"
import Dashboard from '../pages/Dashboard'
import Leaderboard from '../pages/Leaderboard'
import Order from '../pages/Order'
import Messages from '../pages/Messages'
import SalesReport from '../pages/SalesReport'
import Products from '../pages/Products'
import Setting from '../pages/Setting'
import { UserContext } from '../context/UserContext'



const PrivateRouter = () => {
  
  const {admin} = useContext(UserContext)
  console.log(admin)
  

  return admin ? <Outlet /> : <Navigate to="/" />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/salesreports" element={<SalesReport/>} />
        {/* <Route path="/setting" element={<Setting/>} /> */}
        <Route path="setting" element={<PrivateRouter />}>
            <Route path="" element={<Setting />} />
          </Route>
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>

    </BrowserRouter>
  )
}

export default AppRouter