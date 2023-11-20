

import React from 'react';
import { Chart } from 'react-google-charts';



const TopProduct = ({chartData}) => {
  console.log(chartData)
  
  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      
      <Chart
        width={'100%'}
        height={'270px'}
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

