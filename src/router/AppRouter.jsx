import React  from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Dashboard from '../pages/Dashboard'
import Leaderboard from '../pages/Leaderboard'
import Order from '../pages/Order'
import Messages from '../pages/Messages'
import SalesReport from '../pages/SalesReport'
import Products from '../pages/Products'
import Setting from '../pages/Setting'
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
        <Route path="/setting" element={<Setting/>} />
    </Routes>

    </BrowserRouter>
  )
}

export default AppRouter