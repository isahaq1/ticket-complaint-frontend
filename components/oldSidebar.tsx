"use client"
import React, { useState } from 'react';
import Link from 'next/link';

interface MenuItem {
  label: string;
  path: string;
  subItems?: MenuItem[];
}

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
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

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <>
    <aside
    id="sidebar-multi-level-sidebar"
    className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
    aria-label="Sidebar"
>
    <div className="h-full px-3 py-4 overflow-y-auto bg-cyan-950 dark:bg-gray-800">
      <ul className="space-y-2 font-medium">
        {menuItems.map((item) => (
          <li key={item.label} className="flex items-center p-2 bg-teal-50 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group">
            <div onClick={() => item.subItems && toggleSubmenu(item.label)} style={{ cursor: 'pointer' }}>
              <Link href={item.path}>{item.label}</Link>
            </div>
            {item.subItems && openSubmenu === item.label && (
              <ul className="submenu py-2 space-y-2">
                {item.subItems.map((subItem) => (
                  <li key={subItem.label} className="flex items-center p-2 bg-teal-50 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group">
                    <Link href={subItem.path}>{subItem.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
    </aside>
    </>
  );
};

export default Sidebar;
