import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PriceTrendChart = ({ data }) => {
    return (
        <ResponsiveContainer width="90%" height={300}>
            <LineChart
                // width={500}
                // height={300}
                data={data}
                className='m-auto'
            >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PriceTrendChart;