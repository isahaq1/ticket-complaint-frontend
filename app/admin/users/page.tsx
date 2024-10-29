"use client"
import axiosInstance from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
        const tresponse = await axiosInstance.get('/user-list'); 
        console.log(tresponse);
      try {
        const response = await axiosInstance.get('/user-list'); // Adjust this endpoint as necessary
        setUsers(response.data.data);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2 border-b pb-2">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
