// components/Header.tsx
import Link from 'next/link';
const WelcomeHeader: React.FC = () => {
    return (
        <header className="bg-orange-500 p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Ticket Complaint System</h1>
            <div><Link href="/register" className="bg-green-500 text-white px-4 py-2 rounded">Registration</Link><Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link></div>
        </header>
    );
};

export default WelcomeHeader;