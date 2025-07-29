"use client";

import { CheckCircle, Pencil } from "lucide-react";
import { useState, useEffect } from "react";

export default function BasicInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // loading state
  const [companyData, setCompanyData] = useState({
    name: "",
    nif: "",
    postalCode: "",
    sectors: [],
  });

  const availablesectors = [
    { category: "construction", name: "building" },
    { category: "construction", name: "civil construction" },
    { category: "tech", name: "AI" },
    { category: "tech", name: "Cloud" },
  ];

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch("/api/company/basic-info");
        const data = await response.json();
        if (data.company) {
          setCompanyData(data.company);
        }
      } catch (err) {
        console.error("Failed to fetch company data:", err);
      } finally {
        setLoading(false); // done loading
      }
    };
    fetchCompanyData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const response = await fetch("/api/company/basic-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(companyData),
    });
    const data = await response.json();
    console.log(data);
  };

  // Show loading screen or return null while loading
  if (loading || !companyData) {
    return (
      <section className="p-6 md:p-10 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading company data...</p>
      </section>
    );
  }

  return (
    <section className="p-6 md:p-10 bg-white min-h-screen">
      {/* Info Banner */}
      <div className="bg-yellow-100 border border-yellow-200 rounded-md p-4 text-sm text-yellow-800 flex justify-between items-center mb-6">
        <span>
          <strong>You have information pending to fill out.</strong> Complete
          and check that your information is correct, or contact a Deal Manager.
        </span>
        <a href="#" className="underline font-medium">
          Contact
        </a>
      </div>

      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#0c1c3f]">
          Company details
        </h2>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="border border-[#cfcfe4] rounded-full px-5 py-2 text-sm font-medium hover:bg-gray-100 transition">
            Download Teaser
          </button>
          <button className="bg-[#3f4fff] hover:bg-[#2f3fe4] text-white rounded-full px-5 py-2 text-sm font-medium">
            Company state
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b text-sm mb-6 space-x-8">
        <button className="pb-2 border-b-2 border-[#3f4fff] font-medium text-[#0c1c3f]">
          Company information
        </button>
        <button className="text-[#666c89]">Transaction information</button>
        <button className="text-[#666c89]">Additional documentation</button>
      </div>

      {/* Basic Info Box */}
      <div className="bg-[#f9f9fb] border border-[#ececf2] rounded-xl p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold text-[#0c1c3f]">
              Basic information
            </h3>
            <p className="text-sm text-[#666c89]">
              Main data about your company
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-full">
              <CheckCircle size={14} /> Completed
            </span>

            {isEditing ? (
              <button
                onClick={() => {
                  handleEditToggle();
                  handleSubmit();
                }}
                className="flex items-center gap-1 text-[#666c89] text-sm font-medium hover:text-[#0c1c3f] transition"
              >
                <Pencil size={14} /> Save
              </button>
            ) : (
              <button
                onClick={handleEditToggle}
                className="flex items-center gap-1 text-[#666c89] text-sm font-medium hover:text-[#0c1c3f] transition"
              >
                <Pencil size={14} /> Edit
              </button>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#0c1c3f] text-sm font-medium mb-6">
          <div className="flex flex-col gap-1">
            <span className="text-[#666c89] font-normal">Name</span>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={companyData.name}
                onChange={handleChange}
                className="border border-[#ececf2] rounded-md p-2"
              />
            ) : (
              <span>{companyData.name}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#666c89] font-normal">NIF</span>
            {isEditing ? (
              <input
                type="text"
                name="nif"
                value={companyData.nif}
                onChange={handleChange}
                className="border border-[#ececf2] rounded-md p-2"
              />
            ) : (
              <span>{companyData.nif}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#666c89] font-normal">Postal code</span>
            {isEditing ? (
              <input
                type="text"
                name="postalCode"
                value={companyData.postalCode}
                onChange={handleChange}
                className="border border-[#ececf2] rounded-md p-2"
              />
            ) : (
              <span>{companyData.postalCode}</span>
            )}
          </div>
        </div>

        {/* sectors */}
        <div className="flex flex-col gap-4 mt-4">
          <label className="text-[#666c89] font-normal text-sm">sectors</label>

          {!isEditing ? (
            <div className="flex flex-wrap gap-4">
              {companyData.sectors.map((sector, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#ececf2] rounded-xl px-5 py-3 flex items-center gap-2 text-sm text-[#0c1c3f]"
                >
                  <span className="text-[#666c89]">{sector.category}</span>
                  <span className="font-medium">{sector.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative inline-block w-64">
              <details className="bg-white border border-[#ececf2] rounded-md p-3 cursor-pointer">
                <summary className="text-sm text-[#0c1c3f] font-medium">
                  Select sectors
                </summary>
                <div className="mt-2 max-h-40 overflow-y-auto flex flex-col gap-2">
                  {availablesectors.map((sector, idx) => {
                    const isChecked = companyData.sectors.some(
                      (t) =>
                        t.category === sector.category && t.name === sector.name
                    );
                    return (
                      <label key={idx} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            setCompanyData((prevData) => {
                              const exists = prevData.sectors.some(
                                (t) =>
                                  t.category === sector.category &&
                                  t.name === sector.name
                              );
                              const updatedsectors = exists
                                ? prevData.sectors.filter(
                                    (t) =>
                                      !(
                                        t.category === sector.category &&
                                        t.name === sector.name
                                      )
                                  )
                                : [...prevData.sectors, sector];
                              return { ...prevData, sectors: updatedsectors };
                            });
                          }}
                        />
                        <span className="text-sm text-[#0c1c3f]">
                          {sector.category} - {sector.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </details>

              {/* Selected sectors Preview */}
              <div className="mt-3 flex flex-wrap gap-2">
                {companyData.sectors.map((sector, index) => (
                  <span
                    key={index}
                    className="bg-[#eef0f6] px-3 py-1 rounded-full text-sm text-[#3f4fff] font-medium"
                  >
                    {sector.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
