import React from 'react'
import "./graphics.css"
import TodaySales from './TodaySales'
import CustomerInsight from './CustomerInsight'
import TotalRevenue from './TotalRevenue'
import CustomerSatisfaction from './CustomerSatisfaction'
import RevenuePayments from './RevenuePayments'
import TopProduct from './TopProduct'
import SalesMaping from './SalesMaping'
import SalesBranch from './SalesBranch'
import FilterPanel from './FilterPanel'


import CustomerSatisfactionData from "../../datasets/customer_satisfaction_by_ratings.json"
const CustomerSatisfactionDataParse = JSON.parse(CustomerSatisfactionData)

import RevenuePaymentsData from "../../datasets/revenue_by_payments.json"
const RevenuePaymentsDataParse = JSON.parse(RevenuePaymentsData)

import TotalRevenueData from '../../datasets/total_revenue_by_product_line.json'

const TotalRevenueDataParse = JSON.parse(TotalRevenueData)

const GraphicsContainer = () => {
  return (
    <div className='graphics-container'>
    <div className="graphics-container-first-line">
    
    <TodaySales/>
    <CustomerInsight/>
    </div>
    <div className="graphics-container-second-line">
    
    <TotalRevenue data= {TotalRevenueDataParse} />
    <CustomerSatisfaction data={CustomerSatisfactionDataParse}/>
    <RevenuePayments data={RevenuePaymentsDataParse}/>
    </div>
    
    <div className="graphics-container-third-line">
    <FilterPanel/>
    
    </div>

    </div>
  )
}

export default GraphicsContainer