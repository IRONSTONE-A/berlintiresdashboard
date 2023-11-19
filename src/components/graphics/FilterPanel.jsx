import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TopProduct from './TopProduct'
import SalesMapping from './SalesMaping'
import SalesBranch from './SalesBranch'


import SalesMapingData from "../../datasets/sales_mapping_by_country.json"
const SalesMapingDataParse = JSON.parse(SalesMapingData)
// console.log(SalesMapingDataParse)
import SalesBranchData from '../../datasets/sales_by_branch.json'
const SalesBranchDataParse = JSON.parse(SalesBranchData)
// console.log(SalesBranchDataParse)

const FilterPanel = () => {
  const defaultStartDate = new Date('2019-03-01');
  const defaultEndDate = new Date('2019-03-30');

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);



  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleFilterClick = () => {
   
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.Date); 
      return (
        !isNaN(itemDate.getTime()) &&
        ((startDate === null && endDate === null) ||
          (startDate !== null && endDate !== null && itemDate >= startDate && itemDate <= endDate))
      );
    });
  }
  return (
    <div className='filter-panel-container' >
    <div className='filter-picker'>
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
    </div>
    
<div className="filter-panel-container-content">
<TopProduct/>
<SalesMapping data= {SalesMapingDataParse}  />
<SalesBranch data = {SalesBranchDataParse}  />

</div>

    </div>
  )
}

export default FilterPanel