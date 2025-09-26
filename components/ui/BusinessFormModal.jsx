"use client";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { getMessages } from "@/lib/getMessages";

export default function BusinessFormModal({
  isOpen,
  onClose,
  defaultRole = "seller",
}) {
  const [role, setRole] = useState(defaultRole);
  const [step, setStep] = useState(1); // 1 = first form, 2 = second form
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-8 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-[#052766]">
          {t.businessform.heading}
        </h2>
        <p className="text-gray-500 text-center mt-2 mx-auto max-w-xs leading-7 mb-2">
          {t.businessform.subtext}
        </p>
        <hr className="my-6 h-0.5 bg-blue-200" />
        {step === 1 && (
          <>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3 items-start">
                  <label className="text-[#052766] font-semibold">
                    {t.businessform.firstname}{" "}
                    <span className="text-red-700 font-bold">*</span>
                  </label>
                  <input
                    placeholder={t.businessform.firstname}
                    className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-3 items-start">
                  <label className="text-[#052766] font-semibold">
                    {t.businessform.lastname}{" "}
                    <span className="text-red-700 font-bold">*</span>
                  </label>
                  <input
                    placeholder={t.businessform.lastname}
                    className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-3 items-start">
                  <label className="text-[#052766] font-semibold">
                    Email <span className="text-red-700 font-bold">*</span>
                  </label>
                  <input
                    placeholder="Enter your Email Id"
                    className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-3 items-start ">
                  <label className="text-[#052766] font-semibold">
                    {t.businessform.phone}{" "}
                    <span className="text-red-700 font-bold">*</span>
                  </label>
                  <input
                    placeholder={t.businessform.phone_placeholder}
                    className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="flex flex-col gap-3 items-start">
                <label className="text-[#052766] font-semibold">
                  {t.businessform.role_label}
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-500">
                    <input
                      type="radio"
                      checked={role === "seller"}
                      onChange={() => setRole("seller")}
                      className="accent-[#052766] p-2"
                    />
                    {t.businessform.role_seller}
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-gray-500">
                    <input
                      type="radio"
                      checked={role === "buyer"}
                      onChange={() => setRole("buyer")}
                      className="accent-[#052766] p-2"
                    />
                    {t.businessform.role_buyer}
                  </label>
                </div>
              </div>

              <hr className="my-8 h-0.5 bg-blue-200" />

              <div className="flex justify-between">
                <button
                  type="button"
                  className="border border-[#052766] text-[#052766] px-6 py-4 font-semibold rounded-md hover:bg-blue-50"
                >
                  {t.businessform.value_button}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="group flex gap-2 items-center justify-center bg-[#052766] text-white px-6 py-2.5 rounded-md border border-transparent hover:bg-white hover:text-[#052766] hover:border-[#052766]"
                >
                  {t.businessform.next}{" "}
                  <ArrowRight className="w-4 h-4 text-white group-hover:text-[#052766]" />
                </button>
              </div>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3 items-start">
                  <label className="text-[#052766] font-semibold">
                    {t.businessform.industry}
                  </label>
                  <select className="border rounded-md px-3 py-3 focus:ring-2 focus:ring-blue-500 w-full">
                    <option>{t.businessform.industry_placeholder}</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3 items-start">
                  <label className="text-[#052766] font-semibold">
                    {t.businessform.size}
                  </label>
                  <select className="border rounded-md px-3 py-3 focus:ring-2 focus:ring-blue-500 w-full">
                    <option>{t.businessform.size_placeholder}</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3 items-start">
                  <label className="text-[#052766] font-semibold">
                    {t.businessform.budget}
                  </label>
                  <input
                    placeholder={t.businessform.budget_placeholder}
                    className="border rounded-md px-3 py-3 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-3 items-start">
                  <label className="text-[#052766] font-semibold">
                    {t.businessform.timeline}
                  </label>
                  <input
                    placeholder={t.businessform.timeline_placeholder}
                    className="border rounded-md px-3 py-3 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 items-start">
                <label className="text-[#052766] font-semibold">
                  {t.businessform.additional}
                </label>
                <textarea className="border rounded-md px-3 py-5 w-full focus:ring-2 focus:ring-blue-500"></textarea>
              </div>

              <hr className="my-8 h-0.5 bg-blue-200 border-0" />

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center justify-center gap-2 border border-[#052766] text-[#052766] px-6 py-4 rounded-md hover:bg-blue-50"
                >
                  <ArrowRight className="w-4 h-4 text-[#052766] rotate-180" />{" "}
                  {t.businessform.back}
                </button>
                <button
                  type="submit"
                  className="group flex gap-2 items-center justify-center bg-[#052766] text-white px-6 py-2.5 rounded-md border border-transparent hover:bg-white hover:text-[#052766] hover:border-[#052766]"
                >
                  {t.businessform.submit}{" "}
                  <ArrowRight className="w-4 h-4 text-white group-hover:text-[#052766]" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
