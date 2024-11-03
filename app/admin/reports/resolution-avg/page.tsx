"use client"
import React, { useEffect, useState } from "react";
import axiosInstance from '@/utils/axiosInstance';

const AverageResolutionTimePage = () => {
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axiosInstance.get('/resolution-time-report');
                if (response.data.status == false) {
                    throw new Error("Failed to fetch status summary");
                }

                setReport(response.data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, []);

    if (loading) {
        return <p>Loading average resolution time report...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="w-3/4 mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Average Resolution Time Report</h1>
            <ul className="space-y-2">
                {report.map((item) => (
                    <li key={item.category} className="border rounded p-2">
                        <strong>Category:</strong> {item.category} -
                        <strong> Average Resolution Time:</strong> {item.averageResolutionTime}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AverageResolutionTimePage;
