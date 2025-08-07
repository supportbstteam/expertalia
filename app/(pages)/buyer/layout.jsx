import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function SellerLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Sidebar />
      <main className="ml-64 pt-20 p-6">
        {children}
      </main>
    </div>
  );
}