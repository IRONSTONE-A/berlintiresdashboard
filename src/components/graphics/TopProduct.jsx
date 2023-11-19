

import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

import TopProductData from "../../datasets/top_products.json"
const TopProductDataParse = JSON.parse(TopProductData)
console.log(TopProductDataParse)

const TopProduct = () => {
  
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState('2019-03-01');
  const [endDate, setEndDate] = useState('2019-03-30');

  useEffect(() => {
    
    handleFilterClick();
  }, []); 

  const handleFilterClick = () => {
    
    const filteredData = TopProductDataParse
      .filter((item) => {
       
        if (startDate && endDate) {
          return item.Date >= startDate && item.Date <= endDate;
        }
        return true; 
      })
      .sort((a, b) => b.Total - a.Total) 
      .slice(0, 4); 

    
    const data = [['Product', 'Total']];
    filteredData.forEach((item) => {
      data.push([item.Product, item.Total]);
    });

    
    setChartData(data);
  };

  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      <div>
        {/* <label>Başlangıç Tarihi:</label> */}
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        {/* <label>Bitiş Tarihi:</label> */}
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={handleFilterClick}>Filtrele</button>
      </div>
      <Chart
        width={'100%'}
        height={'300px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          title: 'Top 4 Products by Total Value',
          chartArea: { width: '50%' },
          hAxis: {
            title: 'Total Value',
            minValue: 0,
          },
          vAxis: {
            title: 'Product',
          },
        }}
      />
    </div>
  );
};

export default TopProduct;

