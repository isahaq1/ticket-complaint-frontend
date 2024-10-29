// app/admin/layout.tsx
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-4 flex-1 bg-gray-50">{children}</main>
            </div>
        </div>
    );
}
