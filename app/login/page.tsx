
"use client";

import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import WelcomeHeader from '@/components/WelcomeHeader';
import axiosInstance from '@/utils/axiosInstance';
import { useAuth } from "../../components/AuthProvider";

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            router.push('admin/dashboard');
            // alert("Logged in successfully!");
            // Optional: Redirect to user list
        } catch (error) {
            alert("Login failed");
        }
    };

    return (
        <div> <WelcomeHeader />
            <div className="p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="email"
                value={email} className="border p-2 w-full"
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password" className="border p-2 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
        </form>
        </div>
        </div>
    );
}
