"use client";

import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import WelcomeHeader from '@/components/WelcomeHeader';
import axiosInstance from '@/utils/axiosInstance';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('register', {
                email,
                password,
                name
            });
            if (response.data.success) {
                router.push('/login'); // Redirect to login page
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div> <WelcomeHeader />
            <div className="p-8 max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-6">Register</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
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
                    <button type="submit" className="bg-green-500 text-white p-2 w-full">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
