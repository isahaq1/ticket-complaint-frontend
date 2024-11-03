"use client"
import React, { useEffect, useState } from "react";
import axiosInstance from '@/utils/axiosInstance';

const ComplaintSummaryPage = () => {
    const [summary, setSummary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {

                const response = await axiosInstance.get('/category-report');
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
            <h1 className="text-2xl font-bold mb-5">Complaint Summary Report by Category</h1>
            <ul className="space-y-2">
                {summary.map((item) => (
                    <li key={item.category} className="border rounded p-2">
                        <strong>Category:</strong> {item.category} - <strong>Total Complaints:</strong> {item.total}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ComplaintSummaryPage;
