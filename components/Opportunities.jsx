"use client";
import { useEffect, useState } from "react";
import Companycard from "./ui/Companycard";
import { getMessages } from "@/lib/getMessages";

export default function Opportunities() {
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

  const companies = t?.opportunities?.companies || [];

  return (
    <div className="container py-14">
      <h2 className="h2 text-center mb-2">
        {t?.opportunities?.heading}
      </h2>
      <p className="subtext text-center mb-10">
        {t?.opportunities?.subtext}
      </p>

      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-4 px-2 no-scrollbar">
        {companies.map((company) => (
          <div key={company.name} className="flex-shrink-0 w-94 snap-start">
            <Companycard
              {...company}
              onClick={() => alert(`Viewing opportunity for: ${company.name}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
