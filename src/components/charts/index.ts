import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'X Axis Label',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Y Axis Label',
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};

const BarChart = ({ data }) => {
    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'X Axis Label',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Y Axis Label',
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

const PieChart = ({ data }) => {
    const options = {
        responsive: true,
    };

    return <Pie data={data} options={options} />;
};

export { LineChart, BarChart, PieChart };