"use client"
import React, { useState,useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';

type ComplaintFormProps = {
    onSubmitSuccess: () => void;
};

interface Category {
    id: number;
    name: string;
  }

const ComplaintForm: React.FC<ComplaintFormProps> = ({ onSubmitSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('Low');
    const [attachment, setAttachment] = useState<File | null>(null);

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const fetchCategories = async () => {
        try {
          const response = await axiosInstance.get("/category-list");
          setCategories(response.data.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
    
      useEffect(() => {
        fetchCategories();
      }, []);
    
      const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
      };
  

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAttachment(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', selectedCategory);
        formData.append('priority', priority);
        if (attachment) formData.append('attachment', attachment);

        try {
           const response =  await axiosInstance.post('/complaints', formData);
           if(response.data.status == true){
            toast.success(response.data.message);
           }else{
            toast.error(response.data.errors);
           }
            
            onSubmitSuccess();
        } catch (error) {
            
            console.error(error);
            alert('An error occurred');
        }
    };

    return (
        <form className="w-3/4 max-w-auto mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input
                    type="text" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Title"

                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea
                    placeholder="Description" id="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <select  value={selectedCategory || ""}
           onChange={handleCategoryChange} required id="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                     <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)} id="priority" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="attachment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Attachment</label>
                <input type="file" onChange={handleFileChange} id="attachment" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit Complaint</button>
        </form>
    );
};

export default ComplaintForm;
