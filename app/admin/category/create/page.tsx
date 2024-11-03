"use client"
import React, { useState } from "react";
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';



const CategoryPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.post("/categories", { name });
      if (response.data.status == true) {
        setName("");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.errors);
      }

    } catch (err) {
      setError("Failed to create category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="w-full ">
        <h2 className="text-2xl font-bold mb-4">Create Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              id="categoryName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-2/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-1/4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
          {success && <p className="text-green-500 mt-2">Category created successfully!</p>}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CategoryPage;
