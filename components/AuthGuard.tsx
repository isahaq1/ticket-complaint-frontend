"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            router.push('/login'); // Navigate to login if not authenticated
        }
    }, [token, router]); // Dependencies to watch

    return <>{children}</>;
};

export default AuthGuard;
