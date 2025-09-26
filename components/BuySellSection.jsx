"use client";
import { useEffect, useState } from "react";
import Commoncard from "@/components/ui/Commoncard";
import ImageCard from "@/components/ui/ImageCard";
import { getMessages } from "@/lib/getMessages";

export default function BuySellSection() {
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

  return (
    <section className="container pt-10">
      {/* Section Heading */}
      <div className="flex gap-5 items-end">
        <div className="mb-0 !w-[67%]">
          <span className="border-1  p-4 rounded-4xl text-sm text-[#052766] font-medium relative before:absolute before:left-[10px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-[#960F16] before:rounded-full before:content-[''] pl-6">
            {t.buysell.badge}
          </span>
          <h2 className="h2 text-[#052766] mt-6 mb-6 max-w-sm !leading-10">{t.buysell.heading}</h2>
          <p className="subtext max-w-2xl pr-5 !leading-10">{t.buysell.subtext}</p>

          {/* Layout: 2 cards + 1 image card */}
          <div className="grid mt-[44px] md:grid-cols-2 gap-5">
            {/* SELL Card */}
            <Commoncard
              icon={<span className="material-symbols-outlined buysellicon text-white">sell</span>}
              title={t.buysell.sell.title}
              description={t.buysell.sell.description}
              buttonText={t.buysell.sell.button}
              onClick={() => alert("Sell clicked")}
            />

            {/* BUY Card */}
            <Commoncard
              icon={<span className="material-symbols-outlined buysellicon text-white">business_center</span>}
              title={t.buysell.buy.title}
              description={t.buysell.buy.description}
              buttonText={t.buysell.buy.button}
              onClick={() => alert("Buy clicked")}
            />
          </div>
        </div>
        {/* Image Card */}
        <div className="w-[33%]">
          <ImageCard
            image="/bogo_img.jpg"
            title={t.buysell.valuation.title}
            description={t.buysell.valuation.description}
            buttonText={t.buysell.valuation.button}
            onClick={() => alert("Valuation clicked")}
          />
        </div>
      </div>
    </section>
  );
}
