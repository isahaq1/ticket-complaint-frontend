// components/ComplaintReport.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';

interface Complaint {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    category: string;
    attachmentUrl?: string;
    complaint_by:string;
    complaint_at:string;

}

interface GroupedComplaints {
    [key: string]: Complaint[];
}

const ComplaintReport: React.FC = () => {
    const [complaints, setComplaints] = useState<GroupedComplaints | null>(null);
    const [loading, setLoading] = useState(false);
    const [priorityFilter, setPriorityFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');


    
    
    // Fetch filtered complaints based on priority and status
    const fetchFilteredComplaints = async () => {
        // setLoading(true);
        try {
            const response = await axiosInstance.post('/complaint-report', {
                priority: priorityFilter,
                status: statusFilter,
            });
            const complaintsData: Complaint[] = response.data.data;

            // Group by priority and status
            const grouped: GroupedComplaints = complaintsData.reduce((acc, complaint) => {
                const key = `${complaint.priority}-${complaint.status}`;
                if (!acc[key]) acc[key] = [];
                acc[key].push(complaint);
                return acc;
            }, {} as GroupedComplaints);

            setComplaints(grouped);
        } catch (error) {
            console.error("Error fetching complaints:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle filter change and fetch data
    const handleFilterChange = () => {
        fetchFilteredComplaints();
    };

    

    return (
        <div>
            <h1>Complaint Report by Priority and Status</h1>
        
            <div className="flex d-flex">
                <div className="flex items-center justify-between">
                <label style={{ marginLeft: '1rem' }}>
                    Priority:</label>
                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">All</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                
                </div>
                <div className="flex items-center justify-between">
                <label style={{ marginLeft: '1rem' }}>
                    Status:</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">All</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                
</div>
                <button onClick={handleFilterChange} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Apply Filters
                </button>
            </div>

            {complaints && Object.keys(complaints).map((key) => (
                <div key={key}>
                    <h2>{key.replace('-', ' - ')}</h2>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Description</th>
                        <th scope="col" className="px-6 py-3">Status </th>
                        <th scope="col" className="px-6 py-3">Complaint At </th>
                        
                        <th scope="col" className="px-6 py-3">Request By</th>
               
            
                    </tr>
                </thead>
                <tbody>
                   
                        {complaints[key].map((complaint) => (
                            <tr key={complaint.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{complaint.id}</td>
                            <td className="px-6 py-4">{complaint.title}</td>
                            <td className="px-6 py-4">{complaint.description}</td>
                            <td className="px-6 py-4">{complaint.status}</td>
                            <td className="px-6 py-4">{complaint.complaint_at}</td>
                          
                            <td className="px-6 py-4">{complaint.complaint_by}</td>
                     
                        
                        </tr>
                        ))}
                    
                    </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default ComplaintReport;
