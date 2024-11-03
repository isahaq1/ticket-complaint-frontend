"use client"
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axiosInstance from '@/utils/axiosInstance';



import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ComplaintTrendReport = () => {
    const [trendData, setTrendData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchTrendData = async () => {
        const response = await axiosInstance.get(`/complaint-trend-report?start_date=${startDate}&end_date=${endDate}`);

        setTrendData(response.data.data);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchTrendData();
    };

    const chartData = {
        labels: trendData.map(item => item.date),
        datasets: [
            {
                label: 'Total Submitted',
                data: trendData.map(item => item.total_submitted),
                fill: false,
                borderColor: 'blue',
            },
            {
                label: 'Total Resolved',
                data: trendData.map(item => item.total_resolved),
                fill: false,
                borderColor: 'green',
            },
            {
                label: 'Total Closed',
                data: trendData.map(item => item.total_closed),
                fill: false,
                borderColor: 'red',
            },
        ],
    };

    return (
        <div>
            <h2 className='text-green-950 mb-2 font-extrabold'>Geting Trend Report by Finding Your Date Range</h2>
            <form onSubmit={handleSubmit} >
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate} className='border border-gray-300 rounded-lg p-2'
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)} className='border border-gray-300 rounded-lg p-2'
                        required
                    />
                </label>
                <button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Find Trend Data</button>
            </form>
            {trendData.length > 0 && <Line data={chartData} />}
        </div>
    );
};

export default ComplaintTrendReport;

