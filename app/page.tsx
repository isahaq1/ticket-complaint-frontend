// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (<div> <header className="bg-orange-500 p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">Ticket Complaint System</h1>
    <div><Link href="/register" className="bg-green-500 text-white px-4 py-2 rounded">Registration</Link><Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link></div>
  </header>
    <div className="text-center p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Ticket Complaint Application</h1>
      <h3 className="text-2xl font-bold mb-4">If You Are a new User you should Register Your info</h3>
      <Link href="/register" className="bg-green-500 text-white px-4 py-2 rounded">
        Register Now!!
      </Link>
    </div>
  </div>
  );
}
