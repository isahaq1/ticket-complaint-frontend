"use client"
import React, { useEffect, useState } from "react";
import axiosInstance from '@/utils/axiosInstance';

const ComplaintSummaryPage = () => {
    const [summary, setSummary] = useState({ total_open: 0, total_progress: 0, total_resolved: 0, total_closed: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await axiosInstance.get('/status-report');
                if (response.data.status == false) {
                    throw new Error("Failed to fetch status summary");
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
                    <strong>Total Open:</strong> {summary.total_open}
                </li>
                <li className="border rounded p-2">
                    <strong>Total In Progress:</strong> {summary.total_progress}
                </li>
                <li className="border rounded p-2">
                    <strong>Total Resolved:</strong> {summary.total_resolved}
                </li>
                <li className="border rounded p-2">
                    <strong>Total Closed:</strong> {summary.total_closed}
                </li>
            </ul>
        </div>
    );
};

export default ComplaintSummaryPage;
