"use client";

import { useState,useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import WelcomeHeader from '@/components/WelcomeHeader';
import axiosInstance from '@/utils/axiosInstance';
import { isAuthenticated } from "@/utils/auth";

import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();



    useEffect(() => {
      // Check if user is already authenticated
      if (isAuthenticated()) {
        router.push("/admin/dashboard"); // Redirect to dashboard if logged in
      }
    }, [router]);

    const fetchCsrfToken = async () => {
        await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
            withCredentials: true, // Include credentials
        });
    };
    
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
          
            await fetchCsrfToken();
            const response = await axiosInstance.post('login', {
                email,
                password,
            });

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);

                localStorage.setItem("authuser", JSON.stringify(response.data.data));
              location.reload();
                router.push('admin/dashboard'); // Redirect to a dashboard or home
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div> <WelcomeHeader />
            <div className="p-8 max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 w-full">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
