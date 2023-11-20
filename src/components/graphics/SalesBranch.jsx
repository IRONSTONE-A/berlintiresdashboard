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
              height="270px"
              data={filteredChartData}
              options={{
                isStacked: true,
                vAxis: { title: "Total", viewWindow: { max: 5000 } },
                hAxis: { title: "Date" },
              }}
            />
          </>
        )}
      
    </div>
  );
};

export default SalesBranch;