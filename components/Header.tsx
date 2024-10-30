// components/Header.tsx
"use client"
import LogoutButton from '@/components/LogoutButton';
const Header: React.FC = () => {
    return (
        <header className="bg-gray-100 p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <LogoutButton />
        </header>
    );
};

export default Header;
