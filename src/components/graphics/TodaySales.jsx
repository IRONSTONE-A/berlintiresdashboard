import React from 'react'
import todaySales from "../../datasets/todays_sales.json"

import TotalSales from "../../assets/TotalSales.svg"
import TotalOrder from "../../assets/TotalOrder.svg"
import ProductSold from "../../assets/ProductSold.svg"


const TodaySales = () => {

   

  return (
    <div className='today-sales-container'>
    <h2 className='today-sales-title'>Today's Sales </h2>
    <p className='today-sales-pag'>Sales Summery</p>
    <div className="today-sales-content">

    <div className="today_total_sales">
<img className='today-sales-img' src={TotalSales} alt="" />
<h2>${Math.floor(todaySales[0].today_total_sales)}</h2>
  
  <p>Total Sales</p>
  <p className='today-sales-comparasion'>+8% from last month</p>
</div>

<div className="today_total_order">
<img className='today-sales-img' src={TotalOrder} alt="" />
<h2>${todaySales[0].today_total_order}</h2>

<p>Total Order</p>
<p className='today-sales-comparasion'>+5% from last month</p>
</div>

<div className="today_product_sold">
<img className='today-sales-img' src={ProductSold} alt="" />
<h2>${todaySales[0].today_product_sold}</h2>

<p>Product Sold</p>
<p className='today-sales-comparasion'>+1.2% from last month</p>
</div>
    </div>

    </div>
  )
}

export default TodaySales