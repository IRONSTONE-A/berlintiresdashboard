import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const RevenuePayments = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    
    const chartDataFormatted = [["Month", "Cash", "Credit Card", "Ewallet"]];

    data.forEach((entry) => {
      const { Month, Payment, Total } = entry;

     
      if (!chartDataFormatted[Month]) {
        chartDataFormatted[Month] = [Month, 0, 0, 0];
      }

      
      switch (Payment) {
        case "Cash":
          chartDataFormatted[Month][1] += Total;
          break;
        case "Credit card":
          chartDataFormatted[Month][2] += Total;
          break;
        case "Ewallet":
          chartDataFormatted[Month][3] += Total;
          break;
        default:
          break;
      }
    });

  
    chartDataFormatted.forEach((monthData, index) => {
      if (!monthData) {
        chartDataFormatted[index] = [index, 0, 0, 0];
      }
    });

    setChartData(chartDataFormatted);
  }, [data]);

  return (
    <div className="revenue-payments-container">

    
    <Chart
      width={"100%"}
      height={"300px"}
      chartType="ColumnChart"
      loader={<div>Loading Chart</div>}
      data={chartData}
      options={{
        title: "Revenue by Payments",
        hAxis: {
          title: "Month",
          minValue: 0,
        },
        vAxis: {
          title: "Total",
        },
        seriesType: "bars",
        series: { 5: { type: "line" } },
      }}
      rootProps={{ "data-testid": "1" }}
    />
    </div>
  );
};

export default RevenuePayments;