"use client";
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from "react";
import { getMessages } from "@/lib/getMessages";

export default function CompanyCard({
  name,
  industry,
  location,
  status,
  sales,
  ebitda,
  employees,
  description,
  onClick,
}) {
  const [lang, setLang] = useState("en");
  const [t, setT] = useState(getMessages("en"));

  useEffect(() => {
    const updateLang = () => {
      const storedLang = localStorage.getItem("lang") || "en";
      setLang(storedLang);
      setT(getMessages(storedLang));
    };
    updateLang(); // Initial load
    window.addEventListener("langchange", updateLang);
    window.addEventListener("storage", (e) => {
      if (e.key === "lang") updateLang();
    });
    return () => {
      window.removeEventListener("langchange", updateLang);
      window.removeEventListener("storage", updateLang);
    };
  }, []);

  return (
    <div className="border bg-white rounded-xl p-6 shadow-md flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between gap-2 mb-8">
          <h3 className="text-2xl text-[#052766] font-semibold">{name}</h3>
          {status && (
            <span className="text-sm bg-[#05C1680F] text-[#16A282] px-2.5 py-2.5 border-1 leading-3 border-[#05C1684D] rounded-full font-semibold">
              {status}
            </span>
          )}
        </div>
        <div className="text-sm text-[#052766] flex items-center flex-wrap gap-3 mb-8">
          {industry && (
            <span className="px-2 py-0.5 border rounded-full border-gray-300">
              {industry}
            </span>
          )}
          {location && (
            <span className="text-[#052766] relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-[#052766] before:rounded-full before:content-[''] pl-4">{location}</span>
          )}
        </div>
        <div className="mb-6 justify-between flex ">
          <span className="text-lg text-[#6F6C8F] leading-5">{t.labels.sales} </span>
          <span className="text-teal-600 font-semibold">{sales}</span>
        </div>
        <div className="mb-6 justify-between flex">
          <span className="text-lg text-[#6F6C8F] leading-5">{t.labels.ebitda} </span>
          <span className="text-[#052766] font-semibold">{ebitda}</span>
        </div>
        <div className="mb-8 justify-between flex">
          <span className="text-lg text-[#6F6C8F] leading-5">{t.labels.employees}</span>
          <span className="text-[#052766] font-semibold">{employees}</span>
        </div>
        <p className="text-[#6F6C8F] text-[16px] leading-8">{description}</p>
      </div>
      <button
        onClick={onClick}
        className="group bg-[#052766] text-white rounded-md px-4 py-3.5 flex items-center justify-center gap-2 hover:bg-white hover:text-[#052766] hover:border-[#052766] border border-transparent transition mt-6"
      >
        {t.labels.viewOpportunity}  <ArrowRight className="w-4 h-4 text-white group-hover:text-[#052766]" />
      </button>
    </div>
  );
}
