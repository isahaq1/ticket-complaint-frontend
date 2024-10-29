// components/AuthProvider.tsx
"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) setToken(savedToken);
    }, []);

    const login = async (email: string, password: string) => {
        const response = await axiosInstance.post("/login", { email, password });
        const receivedToken = response.data.token;
        setToken(receivedToken);
        localStorage.setItem("token", receivedToken);
    };

    const logout = () => {
        const router = useRouter();
        setToken(null);
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
