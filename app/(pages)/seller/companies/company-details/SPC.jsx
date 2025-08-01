"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  Pencil,
  CirclePercent,
  UsersRound,
  PackageOpen,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function SPC() {
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
            Shareholders, products and customers
          </h2>
          <p className="text-[#666c89] text-sm">
            Information about the company's shareholders, classification of the
            main clients and products and/or services.
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
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="border border-[#e5e8f0] rounded-2xl p-3 bg-white w-full">
            {/* Header: Business Plan */}
            <div className="p-3 bg-gray-100 rounded-xl flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center mr-3">
                <UsersRound className="h-5 w-5 text-[#3b3f51]" />
              </div>
              <div>
                <p className="text-lg  font-medium">Shareholders</p>
                <p className="text-sm text-[#666c89]">
                  and its weight in social capital
                </p>
              </div>
            </div>

            {/* Pill-style KPIs */}
            <div className="flex flex-wrap gap-3 mt-3 mb-3">
              <div className="inline-flex items-center px-4 py-1.5 bg-[#eef1fd] rounded-lg space-x-2">
                <span className="text-sm text-[#3b3f51] font-medium">
                  Shareholder 1
                </span>
                <span className="text-sm font-semibold text-[#1d2b7f] bg-gray-300 rounded-sm px-2 py-0.5">
                  100 %{/* {formData?.bp_grossMargin?.[years[1]]} % */}
                </span>
              </div>
            </div>
          </div>
          <div className="border border-[#e5e8f0] rounded-2xl p-3 bg-white w-full">
            {/* Header: Business Plan */}
            <div className="p-3 bg-gray-100 rounded-xl flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center mr-3">
                <PackageOpen className="h-5 w-5 text-[#3b3f51]" />
              </div>
              <div>
                <p className="text-lg  font-medium">Products & Services</p>
                <p className="text-sm text-[#666c89]">and its % on sales</p>
              </div>
            </div>

            {/* Pill-style KPIs */}
            <div className="flex flex-wrap gap-3 mt-3 mb-3">
              <div className="inline-flex items-center px-4 py-1.5 bg-[#eef1fd] rounded-lg space-x-2">
                <span className="text-sm text-[#3b3f51] font-medium">
                  Gross margin
                </span>
                <span className="text-sm font-semibold text-[#1d2b7f] bg-gray-300 rounded-sm px-2 py-0.5">
                  100 %{/* {formData?.bp_grossMargin?.[years[1]]} % */}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Shareholders Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#3b3f51] mb-1">
              Partners or shareholders and their weight in the share capital
            </h3>
            <p className="text-sm text-[#666c89] mb-6">
              The sum of each shareholder’s % must be 100%.
            </p>
            <p className="text-sm text-green-600 mb-4">
              With the current shareholders and %, you have completed the 0% of
              social capital.
            </p>

            {[1, 2].map((num) => (
              <div
                key={num}
                className="flex items-center justify-between mb-4 bg-[#f9fafc] p-3 rounded-lg border border-[#e5e8f0]"
              >
                {/* Icon (fixed width) */}
                <div className="flex-shrink-0 mr-3 p-2">
                  <UsersRound className="h-7 w-7 text-[#3b3f51]" />
                </div>

                {/* Slider and labels (expand to fill space) */}
                <div className="flex flex-col flex-grow gap-2">
                  <div className="flex justify-between w-full">
                    <span className="text-sm text-[#3b3f51] font-medium">
                      Shareholder {num}
                    </span>
                    <span className="text-sm text-[#3b3f51] font-semibold">
                      {formData?.shareholders?.[num]?.percentage || 0}%
                    </span>
                  </div>
                  <input
                    type="range"
                    className="w-full"
                    min="0"
                    max="100"
                    value={formData?.shareholders?.[num]?.percentage || 0}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        shareholders: {
                          ...prev?.shareholders,
                          [num]: {
                            ...prev?.shareholders?.[num],
                            percentage: parseInt(e.target.value),
                          },
                        },
                      }));
                    }}
                  />
                </div>

                {/* Delete button (fixed width) */}
                <div className="flex-shrink-0 ml-3 p-2">
                  <button className="text-[#1d2b7f] text-xl">🗑</button>
                </div>
              </div>
            ))}

            <button className="text-sm text-[#1d2b7f] font-semibold mt-2">
              + Add shareholder
            </button>
          </div>

          {/* Products & Services Section */}
          <div>
            {/* Section Title */}
            <h3 className="text-lg font-semibold text-[#3b3f51] mb-1">
              Products & Services
            </h3>

            {/* Instructional Text */}
            <p className="text-sm text-[#666c89] mb-6">
              You can add up to 5 products and/or services. If you add less than
              five, make sure the sum reaches 100% of sales.
            </p>

            {/* Sales Warning */}
            <p className="text-sm text-green-600 mb-4">
              You carry the 0% sales associated with products and services.
            </p>

            {/* Product Card */}
            <div className="border border-[#e5e8f0] rounded-2xl bg-white max-w-lg overflow-hidden shadow-sm mb-4">
              {/* Header */}
              <div className="flex justify-between items-center bg-[#f9fafc] px-4 py-2 rounded-t-2xl">
                <span className="text-sm font-medium text-[#3b3f51] px-2 py-1 border border-[#d0d5e4] rounded-md">
                  Product 1
                </span>
                <button className="text-[#1d2b7f] text-sm flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Delete
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Product name input */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#f2f5ff] rounded-xl">
                    <PackageOpen className="h-6 w-6 text-[#1d2b7f]" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-[#666c89] block mb-1">
                      Product and/or service
                    </label>
                    <input
                      type="text"
                      className="w-full border-b border-[#e5e8f0] text-sm text-[#3b3f51] focus:outline-none pb-1"
                      value="test"
                    />
                  </div>
                </div>

                {/* Slider input */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#f2f5ff] rounded-xl">
                    <CirclePercent className="h-6 w-6 text-[#1d2b7f]" />
                  </div>
                  <div className="flex-grow flex-col">
                    <div className="flex justify-between">
                      <label className="text-sm text-[#666c89] block mb-1">
                        % on sales
                      </label>
                      <span className="text-sm text-[#3b3f51]">0%</span>
                    </div>
                    <input
                      type="range"
                      className="w-full accent-[#3949ab]"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Add Button */}
            <button className="text-sm text-[#1d2b7f] font-semibold mt-2">
              + Add product
            </button>
          </div>

          {/* Main Clients Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#3b3f51] mb-1">
              Main clients
            </h3>
            <p className="text-sm text-[#666c89] mb-6">
              Include the percentage contribution to the billing of your five
              main clients or services. If you add less than five, make sure the
              sum reaches 100% of sales.
            </p>

            <div className="flex flex-col space-y-2 p-2">
              {[
                "I sell to companies",
                "I sell to final consumer",
                "I sell to companies and final consumers",
              ].map((option, i) => (
                <label key={i} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="clientType"
                    className="accent-[#1d2b7f]"
                    defaultChecked={i === 1}
                  />
                  <span className="text-lg text-[#3b3f51]">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <button className="bg-[#3b4cca] hover:bg-[#2a3ab9] text-white px-6 py-2 rounded-lg text-sm font-medium">
              Save
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
