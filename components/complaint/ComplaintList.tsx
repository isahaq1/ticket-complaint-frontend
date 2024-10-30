"use client"
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';

type Complaint = {
    id: string;
    title: string;
    description: string;
    category: string;
    priority: string;
    attachmentUrl?: string;
};

const ComplaintList: React.FC = () => {
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axiosInstance.get('/complaints');
                setComplaints(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchComplaints();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Complaint List</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr><th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Priority</th>
                        <th scope="col" className="px-6 py-3">Description</th>
                        <th scope="col" className="px-6 py-3">Attachment</th>
                    </tr>

                </thead>
                <tbody>
                    {complaints.map((complaint) => (
                        <tr key={complaint.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{complaint.title}</td>
                            <td className="px-6 py-4">{complaint.priority}</td>
                            <td className="px-6 py-4">{complaint.description}</td>
                            <td className="px-6 py-4"> {complaint.attachmentUrl && (
                                <a href={complaint.attachmentUrl} target="_blank" rel="noopener noreferrer">
                                    View Attachment
                                </a>
                            )}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComplaintList;
