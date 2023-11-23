import React from "react";
import { Chart } from "react-google-charts";

const SalesBranch = ({ filteredChartData }) => {
  

  return (
    <div className="sales-branch-container">
      

      
        {filteredChartData && (
          <>
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="100%"
              data={filteredChartData}
              options={{
                title: 'Sales by Branch',
                chartArea: { width: '70%', height: '60%' },
                isStacked: true,
                vAxis: {  viewWindow: { max: 5000 } },
                
              }}
            />
          </>
        )}
      
    </div>
  );
};

export default SalesBranch;