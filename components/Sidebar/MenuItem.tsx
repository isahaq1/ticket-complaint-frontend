"use client"
import { useState } from "react";
import Link from "next/link";
import styles from './Sidebar.module.css';
import { usePathname } from 'next/navigation';
import { MenuItem } from "@/components/MenuData";



interface MenuItemProps {
  item: MenuItem;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = pathname === item.route;

  return (
    <div>
      {item.subMenu ? (
        <>
          <button
            className="flex items-center w-full p-2 text-left hover:bg-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          ><item.icon className="mr-0" />
            <span className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-700">{item.title}<svg
              className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
            </span>
          </button>
          {isOpen && (
            <div className="ml-4 space-y-1">
              {item.subMenu.map((subItem, idx) => {
                const isSubActive = pathname === subItem.route;
                return (
                  <Link href={subItem.route} key={idx} className={`${styles.menuItem} ${isSubActive ? styles.active : ''}`}>
                    <button className="flex items-center w-full p-2 text-left hover:bg-gray-700">
                      <subItem.icon className="mr-1" /> {subItem.title}
                    </button>
                  </Link>
                )
              })}
            </div>
          )}
        </>
      ) : (
        <Link href={item.route} className={`${styles.menuItem} ${isActive ? styles.active : ''}`}>
          <button className="flex items-center w-full p-2 text-left hover:bg-gray-700"><item.icon className="mr-2" /><span>{item.title}</span></button>
        </Link>
      )}
    </div>
  );
};



export default MenuItemComponent;
