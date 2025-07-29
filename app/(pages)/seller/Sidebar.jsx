"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  Building2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Sidebar = () => {
  const [isCompaniesSubMenuOpen, setIsCompaniesSubMenuOpen] = useState(false);

  const menuItems = [
    { title: "Dashboard", icon: Home, href: "/seller/dashboard" },
    {
      title: "Companies",
      icon: Building2,
      href: "#", // Use '#' as a placeholder for the main link if it's just a toggle
      onClick: () => setIsCompaniesSubMenuOpen(!isCompaniesSubMenuOpen),
      subMenu: [
        { title: "Basic Information", href: "/seller/companies/basic-info" },
        { title: "Documentation", href: "/seller/companies/documentation" },
      ],
    },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen fixed left-0 top-0 z-40">
      <div className="p-4 mt-14">
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={item.onClick}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon />
                    <span>{item.title}</span>
                  </div>
                  {item.subMenu &&
                    (isCompaniesSubMenuOpen ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </Link>
                {item.subMenu && isCompaniesSubMenuOpen && (
                  <ul className="ml-8 mt-2 space-y-2">
                    {item.subMenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.href}
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
