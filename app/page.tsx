// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Application</h1>
      <Link href="/admin/dashboard">
        Go to Admin Panel
      </Link>
    </div>
  );
}
