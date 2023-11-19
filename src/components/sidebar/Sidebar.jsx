import React, { useContext } from 'react'
import "./sidebar.css"
import LeaderboardImg from "../../assets/LeaderBoard.svg"
import Garph1 from "../../assets/Graph1.svg"
import ChartLine from "../../assets/ChartLine.svg"
import Message from "../../assets/Message.svg"
import Setting from "../../assets/Setting.svg"
import ShoppingCart from "../../assets/ShoppingCart.svg"
import ShoppingOutline from "../../assets/ShoppingOutline.svg"
import SignOutImg from "../../assets/SignOut.svg"
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const Sidebar = () => {
    const {admin, signOut} = useContext(UserContext)
// console.log(admin)
  return (
    <div className="sidebar-container">
        <h1 className="sidebar-title" >Berlin Tires</h1>
        <NavLink to="/">
        <div className="sidebar-item-container">
                <img src={Garph1} alt="" />
                <p> Dashboard</p>
        </div>
        </NavLink>
        <NavLink to="/leaderboard">
        <div className="sidebar-item-container">
                <img src={LeaderboardImg} alt="" />
                <p> Leaderboard</p>
        </div>
        </NavLink>
        <NavLink to="/order">
        <div className="sidebar-item-container">
                <img src={ShoppingCart} alt="" />
                <p> Order</p>
        </div>
        </NavLink>
        <NavLink to="/products">
        <div className="sidebar-item-container">
                <img src={ShoppingOutline} alt="" />
                <p> Products</p>
        </div>
        </NavLink>
        <NavLink to="/salesreports">
        <div className="sidebar-item-container">
                <img src={ChartLine} alt="" />
                <p> Sales Report</p>
        </div>
        </NavLink>
        <NavLink to="/messages">
        <div className="sidebar-item-container">
                <img src={Message} alt="" />
                <p> Messages</p>
        </div>
        </NavLink>

        {admin && (<NavLink to="/setting"> <div className="sidebar-item-container">
                <img src={Setting} alt="" />
                <p> Setting</p>
        </div></NavLink>)}
        
        <div className="sidebar-item-container" onClick={signOut}>
                <img src={SignOutImg} alt="" />
                <p> Sign Out</p>
        </div>
        
       
        
        
    </div>
  )
}

export default Sidebar