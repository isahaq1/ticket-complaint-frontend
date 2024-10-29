// components/Sidebar.tsx
import Link from 'next/link';

const Sidebar: React.FC = () => {
    return (
        <div className="bg-gray-800 text-white h-full p-4 w-64">
            <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
            <nav className="space-y-4">
                <Link href="/admin/dashboard">
                    Dashboard
                </Link>
                <Link href="/admin/users">
                    Users
                </Link>
                <Link href="/admin/settings">
                    <button className="block p-2 bg-gray-700 rounded">Settings</button>
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
