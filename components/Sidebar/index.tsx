"use client"
import { useState } from "react";
import Link from "next/link";

import { menuData, MenuItem } from "@/components/MenuData";
import MenuItemComponent from "@/components/Sidebar/MenuItem";

const Sidebar = () => {
  const authuserinfo = localStorage.getItem("authuser");
  const authusername = authuserinfo ? (JSON.parse(authuserinfo)).name : "";
  return (
    <aside className="w-64 h-full bg-gray-800 text-white">
      <div className="pt-2 text-blue-500 text-center text-2xl font-extrabold">Complaint System </div>
      <div className="p-2 text-red-500 text-center text-xl font-extrabold">Mr. {authusername}</div>
      <nav className="space-y-2">
        {menuData.map((item, index) => (
          <MenuItemComponent key={index} item={item} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
