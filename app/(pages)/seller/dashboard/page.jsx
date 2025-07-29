import React from 'react';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Active Listings</h3>
        <p className="text-3xl font-bold">5</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Total Views</h3>
        <p className="text-3xl font-bold">128</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Interested Buyers</h3>
        <p className="text-3xl font-bold">12</p>
      </div>
    </div>
  );
}