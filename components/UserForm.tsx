"use client"
import React, { useState } from "react";
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';

const UserForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user", // Default role
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/create-user', formData);
            if (response.data.success == true) {
                toast.success('User Successfully Created');
            } else {
                toast.error(response.data.errors);
            }
            setFormData({ name: "", email: "", password: "", role: "user" }); // Reset form
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border rounded p-2 w-full"
                />
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border rounded p-2 w-full"
                />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="border rounded p-2 w-full"
                />
            </div>

            <div>
                <label htmlFor="role">Role</label>
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="border rounded p-2 w-full"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Create User
            </button>
        </form>
    );
};

export default UserForm;
