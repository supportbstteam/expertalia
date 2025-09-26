"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getMessages } from "@/lib/getMessages";
import MapEmbed from "@/components/ui/Mapebeded";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    query: "",
    message: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className="bg-white p-8 rounded-lg container !px-6 pt-40 pb-25">
      <div className="flex mb-8 gap-15 pt-10">
        {/* LEFT COLUMN */}
        <div className="w-[45%] flex-1">
          <span className="border px-5 py-3 rounded-3xl text-sm text-[#052766] font-medium relative before:absolute before:left-[10px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-[#960F16] before:rounded-full before:content-[''] pl-6">
            {t.contact.badge}
          </span>
          <h2 className="h2 mt-3">{t.contact.title}</h2>
          <p className="subtext !text-lg !leading-8 mt-3">
            {t.contact.description}
          </p>
          <div className="flex my-[44px]">
            <MapEmbed />
          </div>

          <div>
            <p className="subtext flex items-center mb-6">
              <span className="bg-[#052766] h-9 w-9 rounded-3xl text-white flex items-center justify-center mr-2 p-4">
                <span className="material-symbols-outlined">distance</span>
              </span>
              {t.contact.address}
            </p>
            <p className="subtext flex items-center mb-6">
              <span className="bg-[#052766] h-9 w-9 rounded-3xl text-white flex items-center justify-center mr-2 p-4">
                <span className="material-symbols-outlined">drafts</span>
              </span>
              {t.contact.email}
            </p>
            <p className="subtext flex items-center mb-11">
              <span className="bg-[#052766] h-9 w-9 rounded-3xl text-white flex items-center justify-center mr-2 p-4">
                <span className="material-symbols-outlined">call</span>
              </span>
              {t.contact.phone}
            </p>

            <a
              href="https://wa.me/676435804"
              className="flex gap-2 w-fit items-center bg-[var(--whatsapp-btn)] border-[#60D669] text-[#fff] px-4.5 py-4 rounded-lg hover:bg-[var(--whatsapp-btn)]-50 text-sm font-medium"
            >
              <Image
                src="/whatsapp-logo.svg"
                alt="whatsapp logo"
                width={24}
                height={24}
              />
              <span className="text-[16px]">{t.contact.whatsapp}</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN FORM */}
        <div className="w-[55%]">
          <form
            onSubmit={handleSubmit}
            className="bg-[#EBF7FC] p-8 rounded-lg"
          >
            <div className="space-y-4">
              {/* First & Last Name */}
              <div className="flex space-x-6">
                <div className="w-1/2 flex flex-col">
                  <label className="font-medium mb-3 text-[#052766] text-[16px] block">
                    {t.contact.form.firstname}
                    <span className="text-[#960F16]">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={t.contact.form.firstname_placeholder}
                    required
                    className="border bg-white border-gray-300 text-[#6F6C8F] rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="w-1/2 flex flex-col">
                  <label className="font-medium mb-3 text-[#052766] text-[16px] block">
                    {t.contact.form.lastName}
                    <span className="text-[#960F16]">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={t.contact.form.lastname_placeholder}
                    required
                    className="border bg-white border-gray-300 text-[#6F6C8F] rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="flex space-x-6">
                <div className="w-1/2 flex flex-col">
                  <label className="font-medium mb-3 text-[#052766] text-[16px] block">
                    {t.contact.form.email}
                    <span className="text-[#960F16]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.contact.form.email_placeholder}
                    required
                    className="border bg-white border-gray-300 text-[#6F6C8F] rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="w-1/2 flex flex-col">
                  <label className="font-medium mb-3 text-[#052766] text-[16px] block">
                    {t.contact.form.phone}
                    <span className="text-[#960F16]">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.contact.form.phone_placeholder}
                    required
                    className="border bg-white border-gray-300 text-[#6F6C8F] rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Radio Options */}
              <div className="flex flex-col mt-6">
                <label className="font-medium mb-3 text-[#052766] text-[16px] block">
                  {t.contact.form.wanttext}
                  <span className="text-[#960F16]">*</span>
                </label>
                {Object.values(t.contact.form.queries).map((q) => (
                  <label key={q} className="subtext mb-3 flex items-center">
                    <input
                      type="radio"
                      name="query"
                      value={q}
                      checked={formData.query === q}
                      onChange={handleChange}
                      className="mr-2 accent-[#052766] p-3 h-4 w-4"
                    />
                    {q}
                  </label>
                ))}
              </div>

              {/* Message */}
              <div>
                <label className="font-medium mb-3 text-[#052766] text-[16px] block">
                  {t.contact.form.howcanwehelp}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full border bg-white border-gray-300 text-[#6F6C8F] rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  variant="customBlue"
                  className="mt-8 py-4 px-8 w-fit flex items-center justify-center"
                >
                  {t.contact.form.button}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
