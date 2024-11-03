"use client"
import React, { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import { getDashboardSummary } from "@/utils/getDashboardSummary";

interface DashboardSummary {
    total_user: number;
    totalComplaint: number;
    total_open: number;
    totalprogess: number;
    totalresolved: number;
    totalclosed: number;
}

const Dashboard: React.FC = () => {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardSummary = async () => {
            try {
                setLoading(true);
                const data = await getDashboardSummary();
                setSummary(data);
            } catch (err) {
                setError("Failed to load dashboard summary.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardSummary();
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Dashboard Summary</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <>
                        <DashboardCard
                            title="Total Users"
                            value={summary?.total_user ?? "N/A"}
                            description="Number of registered users"
                            bgColor="bg-blue-50"
                        />
                        <DashboardCard
                            title="Total Complaints"
                            value={`${summary?.totalComplaint?.toLocaleString() ?? 0}`}
                            description="Total Complaint"
                            bgColor="bg-green-50"
                        />
                        <DashboardCard
                            title="Total Open Complaints"
                            value={summary?.total_open ?? "N/A"}
                            description="Total number of Open States"
                            bgColor="bg-yellow-50"
                        />

                        <DashboardCard title="Total In Progress Complaint" value={summary?.totalprogess ?? 0} description="Number of In Progress states Complaint" bgColor="bg-purple-50" />
                        <DashboardCard title="Total Resolved Complaint" value={summary?.totalresolved ?? 0} description="Number of Resolved states Complaint" bgColor="bg-red-50" />
                        <DashboardCard title="Total Closed Complaint" value={summary?.totalclosed ?? 0} description="Number of Closed states Complaint" bgColor="bg-gray-50" />
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
