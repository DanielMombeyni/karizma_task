import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProductPriceComparisonChart = ({ data }) => {
    return (
        <ResponsiveContainer width="90%" height={300}>
            <BarChart
                width={500}
                height={300}
                data={data}
                // margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                className='m-auto'
            >
                <XAxis dataKey="product" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="price" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ProductPriceComparisonChart;