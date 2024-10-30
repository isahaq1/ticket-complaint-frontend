"use client"
import { useState } from "react";
import Link from "next/link";

import { menuData, MenuItem } from "@/components/MenuData";
import MenuItemComponent from "@/components/Sidebar/MenuItem";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4">My App</div>
      <nav className="space-y-2">
        {menuData.map((item, index) => (
          <MenuItemComponent key={index} item={item} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
