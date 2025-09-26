"use client";
import { useEffect, useState } from "react";
import { getMessages } from "@/lib/getMessages";
import Commoncard from "@/components/ui/Commoncard";
import Image from "next/image";

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
          business_center
        </span>
      ),
      ...t.outsource.administration,
    },
    {
      icon: (
        <span className="material-symbols-outlined text-white buysellicon">
          sell
        </span>
      ),
      ...t.outsource.cfo,
    },
  ];

  return (
    <section className="container pt-25  ">
      <span className="border-1  p-2 rounded-4xl text-sm text-[#052766] font-medium relative before:absolute before:left-[10px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-[#960F16] before:rounded-full before:content-[''] pl-6">
        {t.outsource.badge}
      </span>
      <div className="flex justify-between items-center mb-[44px]">
        <div className="flex w-[42%] items-start flex-col justify-between ">
          <h2 className="h2 text-[#052766] mt-3 mb-4 max-w-xl">
            {t.outsource.heading}
          </h2>
          <p className="subtext max-w-2xl  !leading-10">
            {t.outsource.subtext}
          </p>
        </div>
        <div className="w-[50%]">
          <Image
            src="/outsource_img.png"
            width={650}
            height={400}
            style={{ width: "100%", height: "auto" }}
            alt="Outsource"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
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
  );
}
