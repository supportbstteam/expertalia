"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, Pencil, Info } from "lucide-react";
import { useSelector } from "react-redux"; // optional, if needed for context/state

export default function BalanceSheet({ apiData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = [currentYear - 3, currentYear - 2, currentYear - 1];

  const id = useSelector((state) => state.company.companyId);

  const initialFormData = {
    currentAssets: { [years[0]]: "", [years[1]]: "", [years[2]]: "" },
    treasury: { [years[0]]: "", [years[1]]: "", [years[2]]: "" },
    nonCurrentAsset: { [years[0]]: "", [years[1]]: "", [years[2]]: "" },
    totalActive: { [years[0]]: "", [years[1]]: "", [years[2]]: "" },
    currentLiabilities: { [years[0]]: "", [years[1]]: "", [years[2]]: "" },
    shortTermDebts: { [years[0]]: "", [years[1]]: "", [years[2]]: "" },
    nonCurrentLiabilities: { [years[0]]: "", [years[1]]: "", [years[2]]: "" },
    longTermDebts: { [years[0]]: "", [years[1]]: "", [years[2]]: "" },
    netWorth: { [years[0]]: "", [years[1]]: "", [years[2]]: "" },
    totalLiabilitiesAndNetWorth: {
      [years[0]]: "",
      [years[1]]: "",
      [years[2]]: "",
    },
  };

  const rowMeta = [
    { key: "currentAssets", label: "Current assets" },
    { key: "treasury", label: "Treasury" },
    { key: "nonCurrentAsset", label: "Non-current asset" },
    { key: "totalActive", label: "Total Active", isGreen: true },
    { key: "currentLiabilities", label: "Current liabilities" },
    { key: "shortTermDebts", label: "Short-term debts (optional)" },
    {
      key: "nonCurrentLiabilities",
      label: "Non-current liabilities (optional)",
    },
    { key: "longTermDebts", label: "Long-term debts (optional)" },
    { key: "netWorth", label: "Net worth" },
    {
      key: "totalLiabilitiesAndNetWorth",
      label: "Total Liabilities and Net Worth",
      isGreen: true,
    },
  ];

  const [formData, setFormData] = useState(initialFormData);
  useEffect(() => {
    if (id) {
      setFormData((prev) => ({
        ...prev,
        _id: id,
      }));
    }
  }, [id]);

  const handleChange = (field, year, value) => {
    if (!isEditing) return;
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [year]: value,
      },
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/company/balance-sheet");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setFormData(data?.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch("/api/company/balance-sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save data");

      console.log("Saved successfully");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 bg-white border rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Balance</h2>
          <p className="text-sm text-gray-500">
            This panel is auto-filled from the Commercial Registry, if
            available.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <CheckCircle size={14} /> Completed
          </span>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#f9fafc] p-6 rounded-xl relative">
            <p className="text-sm text-[#666c89] mb-1">
              Total Active {years[2]}
            </p>
            <p className="text-2xl font-semibold text-[#3b3f51]">
              {formData?.totalActive?.[years[2]]} €
            </p>
          </div>
          <div className="bg-[#f9fafc] p-6 rounded-xl relative">
            <p className="text-sm text-[#666c89] mb-1">
              Total Liabilities and Net Worth {years[2]}
            </p>
            <p className="text-2xl font-semibold text-[#3b3f51]">
              {formData?.totalLiabilitiesAndNetWorth?.[years[2]]} €
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-[#f0f4ff] p-3 rounded-md text-sm text-[#2a3281] mb-4">
            <Info size={18} className="inline-block mr-3 text-[#2a3281]" />
            <span className="font-medium">In your case, </span>
            <span>
              we <strong>have not found this information</strong> and you will
              need to complete the panel manually.
            </span>
          </div>
          <form onSubmit={handleSave}>
            <div className="overflow-auto">
              <table className="w-full text-sm text-gray-800">
                <thead>
                  <tr className="bg-gray-100 border-b text-left text-gray-600 font-medium">
                    <th className="p-3">Balance (€)</th>
                    {years.map((year) => (
                      <th key={year} className="p-3 text-right">
                        {year}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rowMeta.map(({ key, label, isGreen }) => (
                    <tr key={key}>
                      <td
                        className={`pr-4 ${
                          isGreen ? "font-bold text-[#3b3f51]" : ""
                        }`}
                      >
                        {label}
                      </td>
                      {years.map((year) => (
                        <td key={year} className="p-3 text-right">
                          {isGreen ? (
                            <input
                              type="text"
                              value={formData?.[key]?.[year] || ""}
                              onChange={(e) =>
                                handleChange(key, year, e.target.value)
                              }
                              className="py-1 px-2 text-right rounded-md border border-gray-300 bg-green-100 text-[#3b3f51] focus:outline-none focus:ring-1 focus:ring-[#3f4fff]"
                            />
                          ) : (
                            <input
                              type="text"
                              value={formData?.[key]?.[year] || ""}
                              onChange={(e) =>
                                handleChange(key, year, e.target.value)
                              }
                              className="py-1 px-2 text-right rounded-md border border-gray-300 bg-white text-[#3b3f51] focus:outline-none focus:ring-1 focus:ring-[#3f4fff]"
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-right">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-[#3f4fff] text-white px-5 py-2 rounded-md font-medium hover:bg-[#2d38e3]"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
