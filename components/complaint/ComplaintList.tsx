"use client"
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';
import Link from "next/link";
import { FaComment,FaRegEye } from "react-icons/fa";

type Complaint = {
    id: number;
    title: string;
    description: string;
    category: string;
    priority: string;
    attachmentUrl?: string;
    status: string;
    complaint_by:string;
    complaint_at:string;

};

    const authuinfo = localStorage.getItem("authuser");
    const authuserrole = authuinfo ? (JSON.parse(authuinfo)).role : "";



const statusOptions = ['Open', 'In Progress', 'Resolved', 'Closed'];

const ComplaintList: React.FC = () => {
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axiosInstance.get('/complaints');
                setComplaints(response.data.data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };

        fetchComplaints();
    }, []);

    const handleStatusChange = async (id: number, newStatus: string) => {
        
        try {
            await axiosInstance.put(`/complaintStatus/change/${id}`, { status: newStatus });
            setComplaints((prevComplaints) =>
                prevComplaints.map((complaint) =>
                    complaint.id === id ? { ...complaint, status: newStatus } : complaint
                )
            );
            toast.success('Status Successfully Changed');
            
        } catch (error) {
            toast.error('Failed to change status');
            
        }
    };

    return (
        <div>
            
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Description</th>
                        <th scope="col" className="px-6 py-3">Status </th>
                        <th scope="col" className="px-6 py-3">Complaint At </th>
                        {authuserrole === 'admin' ? ( 
                        <th scope="col" className="px-6 py-3">Request By</th>
                    ) : null}
                    {authuserrole === 'admin' ? ( 
                        <th scope="col" className="px-6 py-3">Change Status</th>
                    ) : null}
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map((complaint) => (
                        <tr key={complaint.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{complaint.id}</td>
                            <td className="px-6 py-4">{complaint.title}</td>
                            <td className="px-6 py-4">{complaint.description}</td>
                            <td className="px-6 py-4">{complaint.status}</td>
                            <td className="px-6 py-4">{complaint.complaint_at}</td>
                            {authuserrole === 'admin' ? ( 
                            <td className="px-6 py-4">{complaint.complaint_by}</td>
                        ) : null}
                         {authuserrole === 'admin' ? ( 
                            <td className="px-6 py-4">
                            <select value={complaint.status}
                                    onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            ) : null}
                            <td> <Link key={complaint.id} href={`/admin/complaint/${complaint.id}`}>
          <button className="block p-2 border rounded bg-orange-300 hover:bg-orange-500">
          <FaRegEye className="mr-1" />
          </button>
        </Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComplaintList;

