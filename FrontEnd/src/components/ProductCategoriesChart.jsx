import React, { useState } from 'react';
// import StackedBarChart from './StackedBarChart';

const StackedBarChart = ({ data, category }) => {
    const filteredData = category ? data.filter((d) => d.category === category) : data;

    return (
        <BarChart
            width={500}
            height={300}
            data={filteredData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <XAxis dataKey="product" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="product1" stackId="a" fill="#8884d8" />
            <Bar dataKey="product2" stackId="a" fill="#d88488" />
            <Bar dataKey="product3" stackId="a" fill="#88d884" />
        </BarChart>
    );
};

const ProductCategoriesChart = ({ data }) => {
    const [selectedCategory, setSelectedCategory] = useState('Category A');

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredData = data.filter((d) => d.category === selectedCategory);

    return (
        <div>
            <h1>Product Categories Chart</h1>
            <label htmlFor="category-select">Select a category:</label>
            <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="Category A">Category A</option>
                <option value="Category B">Category B</option>
                <option value="Category C">Category C</option>
            </select>
            <StackedBarChart data={filteredData} />
        </div>
    );
};

export default ProductCategoriesChart;