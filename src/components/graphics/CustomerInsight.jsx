import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import CustomerInsightData from '../../datasets/customer_insights_by_type.json';

const CustomerInsight = () => {
  const CustomerInsightDataParse = JSON.parse(CustomerInsightData);

  // console.log(CustomerInsightDataParse)

  const [janTotalNormal, setJanTotalNormal] = useState(0);
  const [janTotalMember, setJanTotalMember] = useState(0);
  const [febTotalNormal, setFebTotalNormal] = useState(0);
  const [febTotalMember, setFebTotalMember] = useState(0);
  const [marTotalNormal, setMarTotalNormal] = useState(0);
  const [marTotalMember, setMarTotalMember] = useState(0);

  useEffect(() => {
    CustomerInsightDataParse.forEach((entry) => {
      const month = entry.Month;
      const total = entry.Total;
      const customerType = entry['Customer type'];

      if (customerType === 'Member') {
        if (month === 1) {
          setJanTotalMember( total);
        } else if (month === 2) {
          setFebTotalMember( total);
        } else if (month === 3) {
          setMarTotalMember( total);
        }
      } else if (customerType === 'Normal') {
        if (month === 1) {
          setJanTotalNormal( total);
        } else if (month === 2) {
          setFebTotalNormal( total);
        } else if (month === 3) {
          setMarTotalNormal( total);
        }
      }
    });
  }, []);

  const data = [
    ['Month', 'Normal', 'Member'],
    ['Jan', janTotalNormal, janTotalMember],
    ['Feb', febTotalNormal, febTotalMember],
    ['Mar', marTotalNormal, marTotalMember],
  ];

  const options = {
    title: 'Customer Insights by Type',
    curveType: 'function',
    chartArea: { width: '80%', height: '70%' },
    legend: { position: 'bottom' },
  };

  return (
    <div className="customer-insight-container">
    <Chart
      chartType="LineChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
    </div>
  );
};

export default CustomerInsight;