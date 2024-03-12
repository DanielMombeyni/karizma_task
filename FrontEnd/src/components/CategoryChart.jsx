import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CategoryChart = ({ data }) => {
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="90%" height={300}>

            <PieChart className='mx-auto'>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx={150}
                    cy={150}
                    outerRadius={80}
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`#${Math.random().toString(16).substr(2, 6)}`} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CategoryChart;