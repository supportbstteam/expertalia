"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Pencil, Info, Coins } from "lucide-react";
import { useSelector } from "react-redux";

export default function BusinessPlan() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState();

  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear + 1];

  const id = useSelector((state) => state.company.companyId);

  const rowMeta = [
    { key: "bp_sales", label: "Sales" },
    { key: "bp_provisioning", label: "Provisioning", hasTooltip: true },
    {
      key: "bp_grossMargin",
      label: "Gross margin",
      isGreen: true,
    },
    { key: "bp_personnelCosts", label: "Personnel costs" },
    { key: "bp_otherOperatingCosts", label: "Other operating costs" },
    {
      key: "bp_ebitda",
      label: "EBITDA",
      isGreen: true,
      hasTooltip: true,
    },
  ];

  useEffect(() => {
    if (id) {
      setFormData((prev) => ({
        ...prev,
        _id: id,
      }));
    }
  }, [id]);

  const handleToggleEdit = () => setIsEditing((prev) => !prev);

  const handleInputChange = (e, rowKey, year) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [rowKey]: {
        ...prev[rowKey],
        [year]: value,
      },
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/company/business-plan");
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
      const res = await fetch("/api/company/business-plan", {
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
    <section className="bg-white p-6 rounded-xl shadow-sm mb-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-[#0c1c3f]">
            Business Plan
          </h2>
          <p className="text-[#666c89] text-sm">
            Data for the coming years has been automatically generated from
            projections based on previous years.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <CheckCircle size={14} /> Completed
          </span>
          <button
            onClick={handleToggleEdit}
            className="text-[#3f4fff] text-sm font-medium flex items-center"
          >
            {isEditing ? (
              "Cancel"
            ) : (
              <>
                <Pencil className="mr-1" size={14} /> Edit
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      {!isEditing ? (
        <div className="border border-[#e5e8f0] rounded-2xl p-3 bg-white w-full mt-6">
          {/* Header: Business Plan */}
          <div className="p-3 bg-gray-100 rounded-xl flex items-center mb-4">
            <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center mr-3">
              <Coins className="h-5 w-5 text-[#3b3f51]" />
            </div>
            <div>
              <p className="text-lg  font-medium">Business plan</p>
              <p className="text-sm text-[#666c89]">
                Evolution {years[0] - 1} - {years[1]}
              </p>
            </div>
          </div>

          {/* Pill-style KPIs */}
          <div className="flex flex-wrap gap-3 mt-3 mb-3">
            <div className="inline-flex items-center px-4 py-1.5 bg-[#eef1fd] rounded-lg space-x-2">
              <span className="text-sm text-[#3b3f51] font-medium">
                Gross margin
              </span>
              <span className="text-sm font-semibold text-[#1d2b7f]">
                {formData?.bp_grossMargin?.[years[1]]} €
              </span>
            </div>
            <div className="inline-flex items-center px-4 py-1.5 bg-[#eef1fd] rounded-lg space-x-2">
              <span className="text-sm text-[#3b3f51] font-medium">EBITDA</span>
              <span className="text-sm font-semibold text-[#1d2b7f]">
                {formData?.bp_ebitda?.[years[1]]} €
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSave}>
            <div className="overflow-auto">
              <table className="w-full text-sm text-[#3b3f51] border-separate border-spacing-y-4">
                <thead>
                  <tr className="bg-gray-100 border-b text-left text-gray-600 font-medium">
                    <th className="p-3">Profit and loss(€)</th>
                    {years.map((year) => (
                      <th key={year} className="p-2 text-right">
                        {year}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rowMeta.map((row, idx) => (
                    <tr key={idx}>
                      <td
                        className={`pr-4 ${
                          row.isGreen ? "font-bold text-[#3b3f51]" : ""
                        }`}
                      >
                        {row.label}
                        {row.hasTooltip && (
                          <Info
                            size={14}
                            className="inline-block ml-1 text-[#7f8caa]"
                          />
                        )}
                      </td>
                      {years.map((year) => {
                        const value = formData?.[row.key]?.[year] || "";
                        return (
                          <td key={year} className="text-right">
                            {row.isGreen ? (
                              <input
                                type="text"
                                name={`${row.key}_${year}`}
                                value={value}
                                onChange={(e) =>
                                  handleInputChange(e, row.key, year)
                                }
                                placeholder="Enter value in €"
                                className="py-1 px-2 text-right rounded-md border border-gray-300 bg-green-100 text-[#3b3f51] focus:outline-none focus:ring-1 focus:ring-[#3f4fff]"
                              />
                            ) : (
                              <input
                                type="text"
                                name={`${row.key}_${year}`}
                                value={value}
                                onChange={(e) =>
                                  handleInputChange(e, row.key, year)
                                }
                                placeholder="Enter value in €"
                                className="py-1 px-2 text-right rounded-md border border-gray-300 bg-white text-[#3b3f51] focus:outline-none focus:ring-1 focus:ring-[#3f4fff]"
                              />
                            )}
                          </td>
                        );
                      })}
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
    </section>
  );
}
