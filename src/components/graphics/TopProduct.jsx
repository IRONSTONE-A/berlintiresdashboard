

import React from 'react';
import { Chart } from 'react-google-charts';



const TopProduct = ({chartData}) => {
  // console.log(chartData)
  
  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          title: 'Top 4 Products by Total Value',
          chartArea: { width: '50%' },
          hAxis: {
            
            minValue: 0,
          },
          
        }}
      />
    </div>
  );
};

export default TopProduct;

