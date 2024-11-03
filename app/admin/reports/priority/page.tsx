"use client"
import React, { useEffect, useState } from "react";
import axiosInstance from '@/utils/axiosInstance';

const ComplaintSummaryPage = () => {
    const [summary, setSummary] = useState({ total_high: 0, total_medium: 0, total_low: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await axiosInstance.get('/priority-report');
                if (response.data.status == false) {
                    throw new Error("Failed to fetch complaint summary");
                }

                setSummary(response.data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    if (loading) {
        return <p>Loading summary...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="w-3/4 mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Complaint Summary Report</h1>
            <ul className="space-y-2">
                <li className="border rounded p-2">
                    <strong>Total High Priority:</strong> {summary.total_high}
                </li>
                <li className="border rounded p-2">
                    <strong>Total Medium Priority:</strong> {summary.total_medium}
                </li>
                <li className="border rounded p-2">
                    <strong>Total Low Priority:</strong> {summary.total_low}
                </li>
            </ul>
        </div>
    );
};

export default ComplaintSummaryPage;
