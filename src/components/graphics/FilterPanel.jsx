import React, { useEffect, useState } from 'react'
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

import TopProductData from "../../datasets/top_products.json"
const TopProductDataParse = JSON.parse(TopProductData)
// console.log(TopProductDataParse)

const FilterPanel = () => {
  const defaultStartDate = new Date('2019-03-01');
  const defaultEndDate = new Date('2019-03-30');

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [filteredData, setFilteredData] = useState([]); // sales maping
  const [filteredChartData, setFilteredChartData] = useState(null); //sales Branch
  const [chartData, setChartData] = useState([]); //top product

  useEffect(() => {
    handleFilterClick()
  
    
  }, [])

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

const handleFilterClick = ( ) => {
  handleFilterClickMaping()
  handleFilter()
  handleFilterClickTopProduct()
}



const handleFilterClickMaping = () => {
  // Seçilen tarih aralığına göre verileri filtrele
  const filtered = SalesMapingDataParse.filter((item) => {
    const itemDate = new Date(item.Date); // Veri setinizdeki tarih formatına göre ayarlayın
    return (
      !isNaN(itemDate.getTime()) &&
      ((startDate === null && endDate === null) ||
        (startDate !== null && endDate !== null && itemDate >= startDate && itemDate <= endDate))
    );
  });

  // Her ülke için toplam total değerini hesapla
  const totalByCountry = {};
  filtered.forEach((item) => {
    const country = item.Country;
    const total = totalByCountry[country] || 0;
    totalByCountry[country] = total + item.Total;
  });

  // Sonuçları tek bir değere çevir
  const result = Object.keys(totalByCountry).map((country) => [country, totalByCountry[country]]);

  setFilteredData(result);
};

const handleFilter = () => {
  // Tarih aralığına göre filtreleme işlemi
  const filteredData = SalesBranchDataParse.filter((item) => {
    const itemDate = new Date(item.Date);
    return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
  });

  // Branchara göre toplam değerleri hesapla
  const branchTotals = {
    A: 0,
    B: 0,
    C: 0,
  };

  filteredData.forEach((item) => {
    branchTotals[item.Branch] += item.Total;
  });

  // Toplam değerleri state'e kaydet
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
  // Filtreleme butonuna basıldığında tarih aralığına göre filtreleme yap
  const filteredData = TopProductDataParse.filter((item) => {
    const itemDate = new Date(item.Date);
    return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
  })
    .sort((a, b) => b.Total - a.Total) // Total değerine göre sırala (büyükten küçüğe)
    .slice(0, 4); // İlk dört ürünü al

  // Chart verilerini oluştur
  const data = [['Product', 'Total']];
  filteredData.forEach((item) => {
    data.push([item.Product, item.Total]);
  });

  // State'i güncelle
  setChartData(data);
};
  return (
    <div className='filter-panel-container' >
    <div className='filter-picker'>
    <DatePicker
        selected={startDate}
        onChange={(date) => handleDateChange([date, endDate])}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => handleDateChange([startDate, date])}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="Finish Date"
      />
      <button onClick={handleFilterClick}>Filter</button>
    </div>
    
<div className="filter-panel-container-content">
<TopProduct chartData = {chartData} />
<SalesMapping filteredData= {filteredData}  />
<SalesBranch filteredChartData = {filteredChartData}  />

</div>

    </div>
  )
}

export default FilterPanel