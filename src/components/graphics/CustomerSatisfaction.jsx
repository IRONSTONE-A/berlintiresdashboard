import React from 'react';
import { Chart } from 'react-google-charts';

const CustomerSatisfaction = ({ data }) => {
  
  const chartData = [['Day', 'Rating']];
  data.forEach((item) => {
    chartData.push([item.Date, item.Rating]);
  });

  return (
    <div className="customer-satisfaction-container">
    <Chart
      chartType="AreaChart"
      width="100%"
      height="100%"
      data={chartData}
      options={{
        title: 'Customer Satisfaction by Ratings',
        hAxis: {  titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 },
        chartArea: { width: '70%', height: '60%' },
        colors: ['#4285F4'],
      }}
    />
    </div>
  );
};

export default CustomerSatisfaction;