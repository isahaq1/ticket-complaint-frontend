"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
interface MenuItem {
    label: string;
    path: string;
    subItems?: MenuItem[];
}

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubmenu = (label: string) => {
        setOpenSubmenu(openSubmenu === label ? null : label);
    };

    const menuItems: MenuItem[] = [
        {
            label: 'Dashboard',
            path: '/dashboard',
        },
        {
            label: 'Settings',
            path: '/settings',
            subItems: [
                { label: 'Profile', path: '/settings/profile' },
                { label: 'Account', path: '/settings/account' },
            ],
        },
        {
            label: 'Reports',
            path: '/reports',
        },
    ];

    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);



    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        // Check if window is defined to access localStorage safely
        if (typeof window !== 'undefined') {
            const storedUserData = localStorage.getItem('authuser'); // Replace with your storage key
            if (storedUserData) {
                const userData = JSON.parse(storedUserData);
                setUsername(userData.name); // Adjust the key based on your stored data structure
            }
        }
    }, []);

    return (
        <>
            <button
                data-drawer-target="sidebar-multi-level-sidebar"
                data-drawer-toggle="sidebar-multi-level-sidebar"
                aria-controls="sidebar-multi-level-sidebar"
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
                </svg>
            </button>

            <aside
                id="sidebar-multi-level-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-cyan-950 dark:bg-gray-800">

                    <ul className="space-y-2 font-medium">
                        {menuItems.map((item) => (
                            <li key={item.label} className="flex items-center p-2 bg-teal-50 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group">
                                <button
                                    type="button"
                                    onClick={() => item.subItems && toggleSubmenu(item.label)}
                                    className="flex items-center w-full p-2 text-base bg-teal-50 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    aria-controls={item.label}
                                    data-collapse-toggle={item.label}
                                >
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:bg-teal-50 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 18 21">
                                        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                    </svg>
                                    <span className="flex-1 ms-3 text-left whitespace-nowrap">{item.label}{openSubmenu}</span>
                                    {item.subItems && (
                                        <svg className={`w-3 h-3 ${isSubmenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                        </svg>
                                    )}
                                </button>
                                {item.subItems && openSubmenu === item.label && (
                                    <ul id={item.label} className={`${isSubmenuOpen ? 'block' : 'hidden'} py-2 space-y-2`}>
                                        {item.subItems.map((subItem) => (
                                            <li key={subItem.label} className="flex items-center p-2 bg-teal-50 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group">
                                                <Link href={subItem.path}>{subItem.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}


                                {item.subItems && openSubmenu === item.label && (
                                    <ul className="submenu">
                                        {item.subItems.map((subItem) => (
                                            <li key={subItem.label}>
                                                <Link href={subItem.path}>{subItem.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                        {/* <li>
                            <a href="#" className="flex items-center p-2 bg-teal-50 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:bg-teal-50 dark:group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li> */}
                        {/* <li>
                            <button
                                type="button"
                                onClick={toggleSubmenu}
                                className="flex items-center w-full p-2 text-base bg-teal-50 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                            >
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:bg-teal-50 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                </svg>
                                <span className="flex-1 ms-3 text-left whitespace-nowrap">E-commerce</span>
                                <svg className={`w-3 h-3 ${isSubmenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-example" className={`${isSubmenuOpen ? 'block' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 bg-teal-50 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 bg-teal-50 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 bg-teal-50 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
                                </li>
                            </ul>
                        </li> */}
                        {/* Add other sidebar items here */}
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
