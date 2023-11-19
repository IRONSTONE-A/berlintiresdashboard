import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Chart } from 'react-google-charts';

const SalesMapping = ({data}) => {
  const defaultStartDate = new Date('2019-03-01');
  const defaultEndDate = new Date('2019-03-30');

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    handleFilterClick(); 
  }, []); 

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleFilterClick = () => {
    
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.Date); 
      return (
        !isNaN(itemDate.getTime()) &&
        ((startDate === null && endDate === null) ||
          (startDate !== null && endDate !== null && itemDate >= startDate && itemDate <= endDate))
      );
    });

   
    const totalByCountry = {};
    filtered.forEach((item) => {
      const country = item.Country;
      const total = totalByCountry[country] || 0;
      totalByCountry[country] = total + item.Total;
    });

    
    const result = Object.keys(totalByCountry).map((country) => [country, totalByCountry[country]]);

    setFilteredData(result);
  };

  return (
    <div className='sales-mapping-container'>
      <DatePicker
        selected={startDate}
        onChange={(date) => handleDateChange([date, endDate])}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Başlangıç Tarihi"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => handleDateChange([startDate, date])}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="Bitiş Tarihi"
      />
      <button onClick={handleFilterClick}>Filtrele</button>
      <Chart
        width={'100%'}
        height={'270px'}
        chartType="GeoChart"
        loader={<div>Loading Chart...</div>}
        data={[
          ['Country', 'Total'],
          ...filteredData,
        ]}
        options={{
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

