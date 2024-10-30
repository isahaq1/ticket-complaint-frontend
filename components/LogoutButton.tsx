"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const handleLogout = async () => {
        // Call the logout API
        await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include any necessary authorization headers
            },
        });

        // Clear the token from localStorage
        localStorage.removeItem('token');

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
