"use client";
import React, { useState, memo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load icons
const HomeIcon = dynamic(() => import("lucide-react").then(mod => mod.Home), { ssr: false });
const Building2Icon = dynamic(() => import("lucide-react").then(mod => mod.Building2), { ssr: false });
const ChevronDownIcon = dynamic(() => import("lucide-react").then(mod => mod.ChevronDown), { ssr: false });
const ChevronUpIcon = dynamic(() => import("lucide-react").then(mod => mod.ChevronUp), { ssr: false });

// Menu data (static)
const menuItems = [
  { title: "Dashboard", icon: HomeIcon, href: "/seller/dashboard" },
  // {
  //   title: "Companies",
  //   icon: Building2Icon,
  //   href: "#", // toggle only
  //   subMenu: [
  //     {
  //       title: "Basic Information",
  //       href: "/seller/companies/company-details?tab=company",
  //     },
  //     {
  //       title: "Documentation",
  //       href: "/seller/companies/company-details?tab=documents",
  //     },
  //   ],
  // },
  {
    title: "Companies",
    icon: Building2Icon,
    href: "/seller/companies",
  },
];

function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen fixed left-0 top-0 z-40">
      <div className="p-4 mt-14">
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={item.subMenu ? () => toggleMenu(index) : undefined}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-700 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon />
                    <span>{item.title}</span>
                  </div>
                  {item.subMenu &&
                    (openMenu === index ? (
                      <ChevronUpIcon size={16} />
                    ) : (
                      <ChevronDownIcon size={16} />
                    ))}
                </Link>

                {/* Submenu */}
                {item.subMenu && openMenu === index && (
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
}

export default memo(Sidebar);
