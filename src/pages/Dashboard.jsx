import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Header from '../components/header/Header'
import GraphicsContainer from '../components/graphics/GraphicsContainer'


const Dashboard = () => {
  return (
    <div className='page-wrapper'>
    <Sidebar/>
    <div className="main-header-wrapper">
    <Header/>
    <GraphicsContainer/>
    </div>
   
    

    </div>
  )
}

export default Dashboard