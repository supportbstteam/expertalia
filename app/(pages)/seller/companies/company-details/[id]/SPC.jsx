"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  Pencil,
  CirclePercent,
  User,
  UsersRound,
  PackageOpen,
  Crosshair,
  Trash2,
  ShoppingBag,
  Building2,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function SPC() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState();
  const [shareholder, setShareholder] = useState([1]);
  const [clients, setClients] = useState([1]);
  const [products, setProducts] = useState([1]); // New state for products
  const [clientType, setClientType] = useState(1); // New state for client type

  const id = useSelector((state) => state.company.companyId);
  const initialData = {
    shareholders: [
      {
        name: "",
        percentage: "",
      },
    ],
    products: [
      {
        name: "",
        description: "",
      },
    ],
  };

  useEffect(() => {
    if (id) {
      setFormData((prev) => ({
        ...prev,
        _id: id,
      }));
    }
  }, [id]);

  const handleToggleEdit = () => setIsEditing((prev) => !prev);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/company/spc");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setFormData(data?.data);
        setShareholder(Object.keys(data?.data?.shareholders));
        setProducts(Object.keys(data?.data?.products));
        setClients(Object.keys(data?.data?.clients));
        setClientType(data?.data?.clientType);
        console.log(data?.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    console.log("hii", formData);

    try {
      const res = await fetch("/api/company/spc", {
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
              {shareholder.map((i) => (
                <div
                  key={i}
                  className="inline-flex items-center px-4 py-1.5 bg-[#eef1fd] rounded-lg space-x-2"
                >
                  <span className="text-sm text-[#3b3f51] font-medium">
                    Shareholder {i}
                  </span>
                  <span className="text-sm font-semibold text-[#1d2b7f] bg-gray-300 rounded-sm px-2 py-0.5">
                    {formData?.shareholders?.[i]?.percentage} %
                  </span>
                </div>
              ))}
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
              {products.map((i) => (
                <div
                  key={i}
                  className="inline-flex items-center px-4 py-1.5 bg-[#eef1fd] rounded-lg space-x-2"
                >
                  <span className="text-sm text-[#3b3f51] font-medium">
                    Product {i}
                  </span>
                  <span className="text-sm font-semibold text-[#1d2b7f] bg-gray-300 rounded-sm px-2 py-0.5">
                    {formData?.products?.[i]?.percentage} %
                  </span>
                </div>
              ))}
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

            {shareholder.map((num) => (
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
                    className="w-full accent-[#3949ab]"
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
                  <button
                    className="text-[#1d2b7f] text-xl"
                    onClick={() => {
                      setShareholder(shareholder.filter((p) => p !== num));
                    }}
                  >
                    <Trash2 className="w-7 h-7" />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setShareholder([...shareholder, shareholder.length + 1])
              }
              className="text-sm text-[#1d2b7f] font-semibold mt-2"
            >
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

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {products.map((num) => (
                <div
                  key={num}
                  className="border border-[#e5e8f0] rounded-2xl bg-white overflow-hidden shadow-sm"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center bg-[#f9fafc] px-4 py-2 rounded-t-2xl">
                    <span className="text-sm font-medium text-[#3b3f51] px-2 py-1 border border-[#d0d5e4] rounded-md">
                      Product {num}
                    </span>
                    <button
                      className="text-[#1d2b7f] text-sm flex items-center gap-1"
                      onClick={() => {
                        setProducts(products.filter((p) => p !== num));
                      }}
                    >
                      <Trash2 className="w-5 h-5" />
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
                          placeholder="Enter product name"
                          value={formData?.products?.[num]?.name || ""}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              products: {
                                ...prev?.products,
                                [num]: {
                                  ...prev?.products?.[num],
                                  name: e.target.value,
                                },
                              },
                            }));
                          }}
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
                          <span className="text-sm text-[#3b3f51]">
                            {formData?.products?.[num]?.percentage || 0}%
                          </span>
                        </div>
                        <input
                          type="range"
                          className="w-full accent-[#3949ab]"
                          min="0"
                          max="100"
                          value={formData?.products?.[num]?.percentage || 0}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              products: {
                                ...prev?.products,
                                [num]: {
                                  ...prev?.products?.[num],
                                  percentage: parseInt(e.target.value),
                                },
                              },
                            }));
                          }}
                          // onBlur={handleValidation} // Add this line to trigger validation on mouse up
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Button */}
            <button
              className="text-sm text-[#1d2b7f] font-semibold mt-2"
              onClick={() => setProducts([...products, products.length + 1])}
            >
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

            <div className="flex flex-col space-y-2 p-2 mb-4">
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
                    defaultChecked={i === clientType}
                    onClick={() => {
                      setClientType(i);
                      setFormData((prev) => {
                        const newData = { ...prev };
                        if (i === 0) {
                          newData.clientType = 0;
                          delete newData.cc;
                        }
                        if (i === 1) {
                          newData.clientType = 1;
                        }
                        if (i === 2) {
                          newData.clientType = 2;
                          delete newData.clients;
                        }

                        return newData;
                      });
                    }}
                  />
                  <span className="text-lg text-[#3b3f51]">{option}</span>
                </label>
              ))}
            </div>
            {clientType === 0 && (
              <>
                <span className="text-sm text-green-600">With current clients and %, you have completed the 100% sales.</span>
                {clients.map((num) => (
                  <div
                    key={num}
                    className="flex items-center justify-between mt-4 mb-4 bg-[#f9fafc] p-3 rounded-lg border border-[#e5e8f0]"
                  >
                    {/* Icon (fixed width) */}
                    <div className="relative w-9 h-9 mr-2">
                      <Crosshair
                        strokeWidth={0.5}
                        className="absolute inset-0 w-full h-full text-[#1d2b7f]"
                      />
                      <User
                        strokeWidth={2}
                        className="absolute inset-2.5 w-4 h-4 text-[#1d2b7f]"
                      />
                    </div>

                    {/* Slider and labels (expand to fill space) */}
                    <div className="flex flex-col flex-grow gap-2">
                      <div className="flex justify-between w-full">
                        <span className="text-sm text-[#3b3f51] font-medium">
                          Client {num}
                        </span>
                        <span className="text-sm text-[#3b3f51] font-semibold">
                          {formData?.clients?.[num]?.percentage || 0}%
                        </span>
                      </div>
                      <input
                        type="range"
                        className="w-full accent-[#3949ab]"
                        min="0"
                        max="100"
                        value={formData?.clients?.[num]?.percentage || 0}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            clients: {
                              ...prev?.clients,
                              [num]: {
                                ...prev?.clients?.[num],
                                percentage: parseInt(e.target.value),
                              },
                            },
                          }));
                        }}
                      />
                    </div>

                    {/* Delete button (fixed width) */}
                    <div className="flex-shrink-0 ml-3 p-2">
                      <button
                        className="text-[#1d2b7f] text-xl"
                        onClick={() => {
                          setClients(clients.filter((p) => p !== num));
                        }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setClients([...clients, clients.length + 1])}
                  className="text-sm text-[#1d2b7f] font-semibold mt-2"
                >
                  + Add client
                </button>
              </>
            )}
            {clientType === 2 && (
              <>
                <span className="text-sm text-green-600">With current clients and %, you have completed the 100% sales.</span>
                <div className="flex items-center justify-between mt-4 mb-4 bg-[#f9fafc] p-3 rounded-lg border border-[#e5e8f0]">
                  {/* Icon (fixed width) */}
                  <div className="flex items-center">
                    <Building2 className="w-7 h-7 mr-3 text-[#1d2b7f]" />
                  </div>

                  {/* Slider and labels (expand to fill space) */}
                  <div className="flex flex-col flex-grow gap-2">
                    <div className="flex justify-between w-full">
                      <span className="text-sm text-[#3b3f51] font-medium">
                        Sale to Companies
                      </span>
                      <span className="text-sm text-[#3b3f51] font-semibold">
                        {formData?.cc?.company || 0}%
                      </span>
                    </div>
                    <input
                      type="range"
                      className="w-full accent-[#3949ab]"
                      min="0"
                      max="100"
                      value={formData?.cc?.company || 0}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          cc: {
                            ...prev?.cc,
                            company: parseInt(e.target.value),
                            consumer: 100 - parseInt(e.target.value),
                          },
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4 bg-[#f9fafc] p-3 rounded-lg border border-[#e5e8f0]">
                  {/* Icon (fixed width) */}
                  <div className="flex items-center">
                    <ShoppingBag className="w-7 h-7 mr-3 text-[#1d2b7f]" />
                  </div>

                  {/* Slider and labels (expand to fill space) */}
                  <div className="flex flex-col flex-grow gap-2">
                    <div className="flex justify-between w-full">
                      <span className="text-sm text-[#3b3f51] font-medium">
                        Sale to Final Consumer
                      </span>
                      <span className="text-sm text-[#3b3f51] font-semibold">
                        {formData?.cc?.consumer || 0}%
                      </span>
                    </div>
                    <input
                      type="range"
                      className="w-full accent-[#3949ab]"
                      min="0"
                      max="100"
                      value={formData?.cc?.consumer || 0}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          cc: {
                            ...prev?.cc,
                            consumer: parseInt(e.target.value),
                            company: 100 - parseInt(e.target.value),
                          },
                        }));
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <button
              className="bg-[#3b4cca] hover:bg-[#2a3ab9] text-white px-6 py-2 rounded-lg text-sm font-medium"
              onClick={handleSave}
              // disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
