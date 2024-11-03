// lib/menuData.ts
import { IconType } from 'react-icons';
import { usePathname } from 'next/navigation';
import { FaHome, FaClipboardCheck, FaUserFriends, FaAngleDoubleRight, FaSnowflake, FaFilter } from 'react-icons/fa';
import { checkAdmin } from "@/utils/auth";
const admin = checkAdmin();


// Function to check if the user is an admin
const isAdmin = (): boolean => {
  return !!admin;

};

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

// Menu items specifically for admin users
const adminMenuData: MenuItem[] = [
  {
    title: "Dashboard",
    route: "dashboard",
    icon: FaHome,
  },
  {
    title: "Ticket Complaints",
    route: "/",
    icon: FaClipboardCheck,
    subMenu: [
      { title: "Complaint List", route: "/admin/complaint/list", icon: FaAngleDoubleRight },
      { title: "Add New Complaint", route: "/admin/complaint/create", icon: FaAngleDoubleRight },
      { title: "Complaint Report", route: "/admin/complaint/report", icon: FaAngleDoubleRight },
    ],
  },
  {
    title: "User",
    route: "/",
    icon: FaUserFriends,
    subMenu: [
      { title: "User List", route: "/admin/user", icon: FaAngleDoubleRight },
      { title: "Add New User", route: "/admin/user/create", icon: FaAngleDoubleRight },

    ],
  },
  {
    title: "Category",
    route: "/",
    icon: FaSnowflake,
    subMenu: [
      { title: "Catgory List", route: "/admin/category", icon: FaAngleDoubleRight },
      { title: "Add Category", route: "/admin/category/create", icon: FaAngleDoubleRight },

    ],
  },
  {
    title: "Report",
    route: "/",
    icon: FaFilter,
    subMenu: [
      { title: "Complaint Report(Status)", route: "/admin/reports/status", icon: FaAngleDoubleRight },
      { title: "Complaint Report(Priority)", route: "/admin/reports/priority", icon: FaAngleDoubleRight },
      { title: "Complaint Report(Category)", route: "/admin/reports/category", icon: FaAngleDoubleRight },
      { title: "Resolution Avg Report(Category)", route: "/admin/reports/resolution-avg", icon: FaAngleDoubleRight },
      { title: "Complaint Trend", route: "/admin/reports/trend", icon: FaAngleDoubleRight },

    ],
  },
];

// Menu items specifically for regular users
const userMenuData: MenuItem[] = [
  {
    title: "Dashboard",
    route: "dashboard",
    icon: FaHome,
  },
  {
    title: "Ticket Complaints",
    route: "/",
    icon: FaClipboardCheck,
    subMenu: [
      { title: "Complaint List", route: "/admin/complaint/list", icon: FaAngleDoubleRight },
      { title: "Add New Complaint", route: "/admin/complaint/create", icon: FaAngleDoubleRight },
      { title: "Complaint Report", route: "/admin/complaint/report", icon: FaAngleDoubleRight },
    ],
  },
];


// Conditionally export the menu data based on the admin status
export const menuData: MenuItem[] = isAdmin() ? adminMenuData : userMenuData;