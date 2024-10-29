// components/Header.tsx


const Header: React.FC = () => {
    return (
        <header className="bg-gray-100 p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" >Logout</button>
        </header>
    );
};

export default Header;
