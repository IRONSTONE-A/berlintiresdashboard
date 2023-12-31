import React from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import { Chart } from 'react-google-charts';

const SalesMapping = ({filteredData}) => {
  
  return (
    <div className='sales-mapping-container'>
      
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="GeoChart"
        loader={<div>Loading Chart...</div>}
        data={[
          ['Country', 'Total'],
          ...filteredData,
        ]}
        options={{
          title: "Sales Mapping by Country",
          colorAxis: { colors: ['yellow', 'red'] },
          backgroundColor: 'white',
          datalessRegionColor: 'lightgrey',
          defaultColor: '#f5f5f5',
        }}
      />
    </div>
  );
};

export default SalesMapping

