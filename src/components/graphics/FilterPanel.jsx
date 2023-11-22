import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TopProduct from './TopProduct';
import SalesMapping from './SalesMaping';
import SalesBranch from './SalesBranch';


import SalesMapingData from "../../datasets/sales_mapping_by_country.json";
const SalesMapingDataParse = JSON.parse(SalesMapingData);

import SalesBranchData from '../../datasets/sales_by_branch.json';
const SalesBranchDataParse = JSON.parse(SalesBranchData);

import TopProductData from "../../datasets/top_products.json";
const TopProductDataParse = JSON.parse(TopProductData);

const FilterPanel = () => {
  const defaultEndDate = new Date('2019-03-30');
  const defaultStartDate = new Date('2019-03-01')
  const switchStart = new Date(defaultEndDate);

  const calculateStartDate = (option, endDate) => {
    setFilterOption(option)
    console.log("start",switchStart, typeof switchStart)
    console.log("option", option)
    switch (option) {
      case 'last7Days':
        new Date (switchStart.setDate(endDate.getDate() - 7));
        
        break;
      case 'last15Days':
       new Date (switchStart.setDate(endDate.getDate() - 15));
        break;
      case 'last30Days':
       new Date (switchStart.setDate(endDate.getDate() - 30));
        break;
      
      default:
        break;
    }
    

setStartDate(switchStart)
    return switchStart
    
  };

  const [filterOption, setFilterOption] = useState('currentMonth');
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState(null);
  const [chartData, setChartData] = useState([]);
  console.log("end", endDate)
  console.log("start", startDate)

  useEffect(() => {
    handleFilterClick();
  }, [filterOption]);

  

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleFilterClick = () => {
    handleFilterClickMaping();
    handleFilter();
    handleFilterClickTopProduct();
  };

  const handleFilterClickMaping = () => {
    const filtered = SalesMapingDataParse.filter((item) => {
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

  const handleFilter = () => {
    const filteredData = SalesBranchDataParse.filter((item) => {
      const itemDate = new Date(item.Date);
      return itemDate >= startDate && itemDate <= endDate;
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

  const handleFilterClickTopProduct = () => {
    const filteredData = TopProductDataParse.filter((item) => {
      const itemDate = new Date(item.Date);
      return itemDate >= startDate && itemDate <= endDate;
    })
      .sort((a, b) => b.Total - a.Total)
      .slice(0, 4);

    const data = [['Product', 'Total']];
    filteredData.forEach((item) => {
      data.push([item.Product, item.Total]);
    });

    setChartData(data);
  };

  

  return (
    <div className='filter-panel-container'>
      <div className='filter-picker'>
        <DatePicker
        className='date-picker'
          selected={startDate}
          onChange={(date) => handleDateChange([date, endDate])}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <DatePicker
        className='date-picker'
          selected={endDate}
          onChange={(date) => handleDateChange([startDate, date])}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="Finish Date"
        />
        <button className='filterBtn' onClick={handleFilterClick}>Filter</button>
        <select
          className='select-picker'
          value={filterOption}
          onChange={(e) => calculateStartDate(e.target.value, defaultEndDate )}
        >
          <option value="last7Days">Last 7 Days</option>
          <option value="last15Days">Last 15 Days</option>
          <option value="last30Days">Last 30 Days</option>
          
        </select>
        
      </div>

      <div className="filter-panel-container-content">
        <TopProduct chartData={chartData} />
        <SalesMapping filteredData={filteredData} />
        <SalesBranch filteredChartData={filteredChartData} />
      </div>
    </div>
  );
};

export default FilterPanel;
