"use client";
import { useState } from "react";

const companies = [
  { name: "PureGlow Organics", tag: "Profitable" },
  { name: "Mendoza Digital Marketing", tag: "Profitable" },
  { name: "Santa Fe Logistics", tag: "Profitable" },
  { name: "WellNest Health", tag: "Profitable" },
  { name: "EcoTech Supplies", tag: "Profitable" },
];

export default function AcquisitionList() {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 3;

  const start = currentPage * cardsPerPage;
  const paginated = companies.slice(start, start + cardsPerPage);

  return (
    <section className="bg-white px-2 md:px-2 py-20 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0c1c3f]">
        Companies Ready for Acquisition
      </h2>
      <p className="text-gray-500 mt-3 mb-12">
        Discover vetted businesses across industries, ready for acquisition
        today.
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full max-w-6xl mx-auto">
        {paginated.map((company, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 text-left w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#0c1c3f] font-semibold">{company.name}</h3>
              <span className="text-green-600 text-xs bg-green-50 px-2 py-1 rounded-full">
                {company.tag}
              </span>
            </div>
            {/* Optional content placeholder */}
            <div className="h-24 bg-gray-50 rounded-lg" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 text-sm">
        <a 
          href="#" 
          className="border-2 border-[#04295e] text-[#04295e] px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
        >
          View All Listings
        </a>
      </div>
    </section>
  );
}
