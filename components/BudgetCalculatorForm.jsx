"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { getMessages } from "@/lib/getMessages";

export default function BudgetCalculatorForm() {
  const [lang, setLang] = useState("en");
  const [t, setT] = useState(getMessages("en"));
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    companySize: "",
    estimatedBilling: "",
    preferredTimeline: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // Add your submission logic here (API call / redirect)
  };

  return (
    <div className="bg-[url('/consult_bg.png')]  bg-contain bg-center bg-no-repeat ">
      <div className=" bg-white rounded-xl text-center max-w-4xl mx-auto">
        <h2 className="h2">{t.consulting_page.form.title}</h2>
        <p className="subtext mb-10 !leading-8 max-w-3xl mx-auto">
          {t.consulting_page.form.description}
        </p>
        <form onSubmit={handleSubmit} className=" bg-[#EBF7FC] p-9 rounded-xl ">
            <span className="material-symbols-outlined buysellicon text-white bg-[#052766] p-3.5 rounded-4xl mb-8">business_center</span>
          <h3 className="h3 !leading-10">{t.consulting_page.form.form_heading}</h3>
          <p className="subtext mb-8">{t.consulting_page.form.form_subtext}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start">
            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="fullName" className="font-medium mb-3 text-[#052766] text-[16px]">
                {t.consulting_page.form.firstname}
                <span className="text-[#960F16]">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t.consulting_page.form.firstname_placeholder}
                className="border bg-white border-gray-300 text-[#6F6C8F] rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium mb-3 text-[#052766] text-[16px]">
                {t.consulting_page.form.email}
                <span className="text-[#960F16]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.consulting_page.form.email_placeholder}
                className="border bg-white border-gray-300 text-[#6F6C8F] rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="font-medium mb-3 text-[#052766] text-[16px]">
                {t.consulting_page.form.phone}
                <span className="text-[#960F16]">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t.consulting_page.form.phone_placeholder}
                className="border bg-white border-gray-300 text-[#6F6C8F] rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Company */}
            <div className="flex flex-col">
              <label htmlFor="company" className="font-medium mb-3 text-[#052766] text-[16px]">
                {t.consulting_page.form.Company}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={t.consulting_page.form.Company_placeholder}
                className="border bg-white border-gray-300 text-[#6F6C8F] rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Service Type */}
            <div className="flex flex-col">
              <label htmlFor="serviceType" className="font-medium mb-3 text-[#052766] text-[16px]">
                {t.consulting_page.form.service}
                <span className="text-[#960F16]">*</span>
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="border bg-white border-gray-300 text-[#6F6C8F] rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">
                  {t.consulting_page.form.service_placeholder}
                </option>
                <option value="tax">Tax Advisory</option>
                <option value="labour">Labour Advisory</option>
                <option value="accounting">Accounting</option>
              </select>
            </div>

            {/* Company Size */}
            <div className="flex flex-col">
              <label htmlFor="companySize" className="font-medium mb-3 text-[#052766] text-[16px]">
                {t.consulting_page.form.companysize}
                <span className="text-[#960F16]">*</span>
              </label>
              <select
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className="border bg-white border-gray-300 text-[#6F6C8F] rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">
                  {t.consulting_page.form.companysize_placeholder}
                </option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
              </select>
            </div>

            {/* Estimated Billing */}
            <div className="flex flex-col">
              <label htmlFor="estimatedBilling" className="font-medium mb-3 text-[#052766] text-[16px]">
                {t.consulting_page.form.billing}
                <span className="text-[#960F16]">*</span>
              </label>
              <select
                id="estimatedBilling"
                name="estimatedBilling"
                value={formData.estimatedBilling}
                onChange={handleChange}
                className="border bg-white border-gray-300 text-[#6F6C8F] rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">
                  {t.consulting_page.form.billing_placeholder}
                </option>
                <option value="0-1000">$0 - $1,000</option>
                <option value="1000-5000">$1,000 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="10000+">$10,000+</option>
              </select>
            </div>

            {/* Preferred Timeline */}
            <div className="flex flex-col">
              <label htmlFor="preferredTimeline" className="font-medium mb-3 text-[#052766] text-[16px]">
                {t.consulting_page.form.timeline}
                <span className="text-[#960F16]">*</span>
              </label>
              <select
                id="preferredTimeline"
                name="preferredTimeline"
                value={formData.preferredTimeline}
                onChange={handleChange}
                className="border bg-white border-gray-300 text-[#6F6C8F] rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">
                  {t.consulting_page.form.timeline_placeholder}
                </option>
                <option value="immediate">Immediate</option>
                <option value="1-2 weeks">1-2 Weeks</option>
                <option value="1 month">1 Month</option>
                <option value="3 months">3 Months</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center mt-4">
              <Button
                type="submit"
                variant="customBlue"
                className="px-6 py-3 flex items-center"
              >
                {t.consulting_page.form.button}{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
