"use client";

import React from "react";
import { Bell, CircleUserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md h-16 fixed w-full top-0 z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center">
          <h1 className="p-1 text-xl font-semibold text-gray-800">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
          <button className="text-gray-600 hover:text-gray-800">
            <Bell className="h-5 w-5" />
          </button>
          <div className="relative">
            <button
              className="h-8 w-8 rounded-full focus:bg-gray-200"
              onClick={toggleDropdown}
            >
              <CircleUserRound className="h-8 w-8 text-gray-600" strokeWidth={2}/>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
