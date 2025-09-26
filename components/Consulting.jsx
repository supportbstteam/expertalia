"use client";
import { useEffect, useState } from "react";
import { getMessages } from "@/lib/getMessages";
import Commoncard from "@/components/ui/Commoncard";

export default function Consulting() {
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

  const services = [
    {
      icon: (
        <span className="material-symbols-outlined text-white buysellicon">
          receipt
        </span>
      ),
      ...t.consultingtext.tax,
    },
    {
      icon: (
        <span className="material-symbols-outlined text-white buysellicon">
          person_search
        </span>
      ),
      ...t.consultingtext.labor,
    },
    {
      icon: (
        <span className="material-symbols-outlined text-white buysellicon">
          calculate
        </span>
      ),
      ...t.consultingtext.accounting,
    },
  ];

  return (
    <div className="bg-[url('/consult_bg.png')]  bg-contain bg-bottom bg-no-repeat pt-25 opacity-100">
      <section className="container">
        <span className="border-1  p-2 rounded-4xl text-sm text-[#052766] font-medium relative before:absolute before:left-[10px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-[#960F16] before:rounded-full before:content-[''] pl-6">
          {t.consultingtext.badge}
        </span>
        <div className="flex items-center justify-between mb-[44px]">
          <h2 className="h2 text-[#052766] mt-3 mb-4 max-w-xl">
            {t.consultingtext.heading}
          </h2>
          <p className="subtext max-w-2xl pl-8 !leading-10">
            {t.consultingtext.subtext}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <Commoncard
              key={idx}
              icon={service.icon}
              title={service.title}
              description={service.description}
              buttonText={service.button}
              onClick={() => alert(`${service.title} clicked`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
