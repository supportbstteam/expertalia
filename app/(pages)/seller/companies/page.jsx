"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);

  // Fetch companies on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/company");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setCompanies(data?.company || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Create company
  const createCompany = async () => {
    try {
      const res = await fetch("/api/company", {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to create company");
      const data = await res.json();
      setCompanies([...companies, data?.company]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCompany = async (id) => {
    try {
      const res = await fetch(`/api/company?_id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete company");

      setCompanies((prev) => prev.filter((company) => company._id !== id));

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Companies</h1>
        <button
          onClick={createCompany}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-indigo-500 transition"
        >
          List Company
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Sr No.</th>
              <th className="px-6 py-4">Company Name</th>
              <th className="px-6 py-4">NIF</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {companies.map((company, index) => (
              <tr
                key={company._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-6 py-4">{company.name}</td>
                <td className="px-6 py-4">{company.nif || "N/A"}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/seller/companies/company-details/${company._id}`}
                      className="px-3 py-1.5 bg-green-600 text-white rounded-md text-xs font-medium hover:bg-green-200 transition"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => deleteCompany(company._id)}
                      className="px-3 py-1.5 bg-red-600 text-white rounded-md text-xs font-medium hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {companies.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-6 text-center text-gray-500">
                  No companies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
