"use client";
import { useEffect, useState } from "react";
import BuySellBanner from '@/components/ui/BuySellBanner';
import Companysellingimg from '@/components/Companysellimg';
import { getMessages } from "@/lib/getMessages";
import BudgetCalculatorForm from '@/components/BudgetCalculatorForm';

function Consulting() {
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
    <div className="py-14 pt-20">
      <BuySellBanner 
        headingRest1={t.banner2.heading.rest1}
        headingHighlight={t.banner2.heading.highlight}
        headingRest={t.banner2.heading.rest}
        buttonText={t.banner2.button}
        backgroundImage="/new_consulting.png"
        textwrap={true}
      />
      <Companysellingimg
        badge={t.consulting_page.Advice.badge}
        title={t.consulting_page.Advice.title}
        description={t.consulting_page.Advice.description}
        benefits={[
          {text: <p className="text-[16px] leading-8 w-[72%] ml-2">{t.consulting_page.Advice.benefit1}</p>, icon: <span className="material-symbols-outlined !text-[60px]">rocket_launch</span> },
          {text: <p className="text-[16px] leading-8 w-[72%] ml-2">{t.consulting_page.Advice.benefit2}</p>, icon: <span className="material-symbols-outlined !text-[60px]">shield_with_heart</span> },
        ]}
        cardImage="/tax.jpg"
        showButton={false}
        iconstate={false}
        imageFirst={true}
        blueoverlay={true}
      />
      <Companysellingimg
        badge={t.consulting_page.Labor.badge}
        title={t.consulting_page.Labor.title}
        description={t.consulting_page.Labor.description}
        benefits={[
          {text: <p className="text-[16px] leading-8 w-[72%] ml-2">{t.consulting_page.Labor.benefit1}</p>, icon: <span className="material-symbols-outlined !text-[60px]">balance</span> },
          {text: <p className="text-[16px] leading-8 w-[72%] ml-2">{t.consulting_page.Labor.benefit2}</p>, icon: <span className="material-symbols-outlined !text-[60px]">credit_score</span> },
        ]}
        cardImage="/labour.jpg"
        showButton={false}
        iconstate={false}
        imageFirst={false}
        blueoverlay={true}
        clx="py-0"
      />
      <Companysellingimg
        badge={t.consulting_page.Accounting.badge}
        title={t.consulting_page.Accounting.title}
        description={t.consulting_page.Accounting.description}
        benefits={[
          {text: <p className="text-[16px] leading-8 w-[72%] ml-2">{t.consulting_page.Accounting.benefit1}</p>, icon: <span className="material-symbols-outlined !text-[60px]">contract</span> },
          {text: <p className="text-[16px] leading-8 w-[72%] ml-2">{t.consulting_page.Accounting.benefit2}</p>, icon: <span className="material-symbols-outlined !text-[60px]">checkbook</span> },
        ]}
        cardImage="/account.jpg"
        showButton={false}
        iconstate={false}
        imageFirst={true}
        blueoverlay={true}
      />
      <BudgetCalculatorForm />
    </div>
  );
}

export default Consulting;
