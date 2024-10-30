// lib/menuData.ts
import { IconType } from 'react-icons';
import { usePathname } from 'next/navigation';
import { FaHome, FaClipboardCheck,FaUserFriends,FaAngleDoubleRight } from 'react-icons/fa'; 
export interface SubMenu {
    title: string;
    route: string;
    icon: IconType;
  }
  
  export interface MenuItem {
    title: string;
    route: string;
    icon: IconType;
    subMenu?: SubMenu[];
  }
  
  export const menuData: MenuItem[] = [
    {
      title: "Dashboard",
      route: "dashboard",
      icon:FaHome,
    },
    {
      title: "Ticket Complaints",
      route: "/",
      icon:FaClipboardCheck,
      subMenu: [
        { title: "Complaint List", route: "/admin/complaint/list", icon:FaAngleDoubleRight, },
        { title: "Add New Complaint", route: "/admin/complaint/create", icon: FaAngleDoubleRight, },
   
      ],
    },
    {
      title: "Users",
      route: "/admin/users",
      icon:FaUserFriends,
    },
  ];
  