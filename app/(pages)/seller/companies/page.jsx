import React from "react";
import Link from "next/link";
import action from "./action";

const companies = [
  {
    id: "1",
    name: "Tech Solutions Inc.",
    industry: "Technology",
    status: "Active",
    revenue: "$5M",
    employees: "50",
  },
  {
    id: "2",
    name: "Global Logistics Co.",
    industry: "Logistics",
    status: "Pending",
    revenue: "$10M",
    employees: "120",
  },
  {
    id: "3",
    name: "Creative Marketing Agency",
    industry: "Marketing",
    status: "Sold",
    revenue: "$2M",
    employees: "15",
  },
  {
    id: "4",
    name: "Health Innovations LLC",
    industry: "Healthcare",
    status: "Active",
    revenue: "$8M",
    employees: "80",
  },
];

export default async function CompaniesPage() {
  const companiesfromdb = await action();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Companies</h1>
        <div className="flex items-center space-x-4">
          <select className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
          <Link
            href="/seller/companies/create"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors whitespace-nowrap"
          >
            List Company
          </Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {companies.map((company) => (
            <li
              key={company.id}
              className="px-4 py-5 sm:px-6 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center text-sm">
                    <p className="font-medium text-indigo-600 truncate">
                      {company.name}
                    </p>
                    <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {company.industry}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <p className="mr-4">
                      Revenue:{" "}
                      <span className="font-semibold text-gray-700">
                        {company.revenue}
                      </span>
                    </p>
                    <p>
                      Employees:{" "}
                      <span className="font-semibold text-gray-700">
                        {company.employees}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      company.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : company.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {company.status}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
