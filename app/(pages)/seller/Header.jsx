import React from 'react';
import { Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md h-16 fixed w-full top-0 z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center">
          <h1 className="p-1 text-xl font-semibold text-gray-800">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <Bell className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;