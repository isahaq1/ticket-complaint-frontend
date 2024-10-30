"use client"
import axiosInstance from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';
import DataTable from '@/components/DataTable';
import { Column } from 'react-table';

interface User {
    id: number;
    name: string;
    email: string;
}

const UserListPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const response = await axiosInstance.get('/user-list');
                setUsers(response.data.data);
            } catch (err) {
                setError('Failed to load users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const columns: Column<User>[] = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Email', accessor: 'email' },

    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>User List</h1>
            <DataTable columns={columns} data={users} />
        </div>
    );
};

export default UserListPage;

