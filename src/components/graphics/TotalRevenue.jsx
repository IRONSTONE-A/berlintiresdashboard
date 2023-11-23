

import React from 'react';
import { Chart } from 'react-google-charts';

const TotalRevenue = ({ data }) => {
  
  const totalData = data.reduce((acc, item) => {
    const productLine = item['Product line'];
    acc[productLine] = (acc[productLine] || 0) + item.Total;
    return acc;
  }, {});

  
  const chartData = [['Product Line', 'Total'], ...Object.entries(totalData)];

  return (
    <div className="total-revenue-container">
    <Chart
    // max-width={"80%"}
      width={'100%'}
      height={'100%'}
      chartType="ColumnChart"
      loader={<div>Loading Chart</div>}
      data={chartData}
      options={{
        title: 'Total Sales by Product Line',
        hAxis: {  titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 },
      }}
    />
    </div>
  );
};

export default TotalRevenue;

