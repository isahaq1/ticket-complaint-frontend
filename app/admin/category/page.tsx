"use client"
import React, { useEffect, useState } from "react";
import axiosInstance from '@/utils/axiosInstance';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]); // No type defined
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/categories');
                if (response.data.status == false) {
                    throw new Error("Failed to fetch categories");
                }

                setCategories(response.data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <p>Loading categories...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="w-2/4 mt-10">
            <h1 className="text-2xl font-bold mb-5">Categories</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">SL.</th>
                        <th scope="col" className="px-6 py-3">Name</th>

                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{category.id}</td>
                            <td className="px-6 py-4">{category.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoriesPage;
