import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const SalesBranch = ({ data }) => {
  const [startDate, setStartDate] = useState("2019-03-01");
  const [endDate, setEndDate] = useState("2019-03-30");
  const [filteredChartData, setFilteredChartData] = useState(null);

  const handleFilter = () => {
   
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.Date);
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });

   
    const branchTotals = {
      A: 0,
      B: 0,
      C: 0,
    };

    filteredData.forEach((item) => {
      branchTotals[item.Branch] += item.Total;
    });

    
    setFilteredChartData([
      ["Date", "A", "B", "C"],
      ...filteredData.map((item) => [
        item.Date,
        item.Branch === "A" ? item.Total : 0,
        item.Branch === "B" ? item.Total : 0,
        item.Branch === "C" ? item.Total : 0,
      ]),
      [
        "Total",
        Math.min(branchTotals.A, 10000),
        Math.min(branchTotals.B, 10000),
        Math.min(branchTotals.C, 10000),
      ],
    ]);
  };

  useEffect(() => {
   
    handleFilter();
  }, []); 

  return (
    <div className="sales-branch-container">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button onClick={handleFilter}>Filtrele</button>

      <div >
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
    </div>
  );
};

export default SalesBranch;