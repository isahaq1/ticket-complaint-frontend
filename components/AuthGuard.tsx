"use client"
// components/AuthGuard.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Ensure code runs only on the client side
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                router.push('/login');
            }
        }
    }, [router]);

    // Show loading or fallback content while checking auth status
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return <>{isAuthenticated ? children : null}</>;
};

export default AuthGuard;

