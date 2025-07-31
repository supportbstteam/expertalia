"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Pencil, Info } from "lucide-react";
import { useSelector } from "react-redux";

export default function ProfitAndLoss() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = [currentYear - 3, currentYear - 2, currentYear - 1];

  const id = useSelector((state) => state.company.companyId);

  const initialData = {
    sales: {
      [years[0]]: "",
      [years[1]]: "",
      [years[2]]: "",
    },
    provisioning: {
      [years[0]]: "",
      [years[1]]: "",
      [years[2]]: "",
    },
    grossMargin: {
      [years[0]]: "0",
      [years[1]]: "0",
      [years[2]]: "0",
    },
    personnelCosts: {
      [years[0]]: "",
      [years[1]]: "",
      [years[2]]: "",
    },
    otherOperatingCosts: {
      [years[0]]: "",
      [years[1]]: "",
      [years[2]]: "",
    },
    ebitda: {
      [years[0]]: "0",
      [years[1]]: "0",
      [years[2]]: "0",
    },
    adjustedEbitda: {
      [years[0]]: "",
      [years[1]]: "",
      [years[2]]: "",
    },
  };

  const rowMeta = [
    { key: "sales", label: "Sales" },
    { key: "provisioning", label: "Provisioning", hasTooltip: true },
    {
      key: "grossMargin",
      label: "Gross margin",
      isGreen: true,
    },
    { key: "personnelCosts", label: "Personnel costs" },
    { key: "otherOperatingCosts", label: "Other operating costs" },
    {
      key: "ebitda",
      label: "EBITDA",
      isGreen: true,
      hasTooltip: true,
    },
    {
      key: "adjustedEbitda",
      label: "Adjusted EBITDA (optional)",
      hasTooltip: true,
    },
  ];

  const [formData, setFormData] = useState(() =>
    JSON.parse(JSON.stringify(initialData))
  );

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
        const res = await fetch("/api/company/profit-loss");
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
      const res = await fetch("/api/company/profit-loss", {
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
            Profit and loss
          </h2>
          <p className="text-[#666c89] text-sm">
            This panel is autocomplete with data extracted from the Commercial
            Registry.
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#f9fafc] p-6 rounded-xl relative">
            <p className="text-sm text-[#666c89] mb-1">
              Billing (sales) {years[2]}
            </p>
            <p className="text-2xl font-semibold text-[#3b3f51]">
              {formData?.sales?.[years[2]]} €
            </p>
          </div>
          <div className="bg-[#f9fafc] p-6 rounded-xl relative">
            <p className="text-sm text-[#666c89] mb-1">EBITDA {years[2]}</p>
            <p className="text-2xl font-semibold text-[#3b3f51]">
              {formData?.ebitda?.[years[2]]} €
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
                        const value = formData[row.key][year] || "";
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
