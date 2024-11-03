"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const handleLogout = async () => {
        // Call the logout API
        const response = await axiosInstance.post('logout');

        // Clear the token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem("authuser");
        // Redirect to the login page
        router.push('/login');
    };

    return (
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
            Logout
        </button>
    );
};

export default LogoutButton;
