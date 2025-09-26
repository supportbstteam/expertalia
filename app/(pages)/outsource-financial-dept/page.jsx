"use client";
import { useEffect, useState } from "react";
import BuySellBanner from "@/components/ui/BuySellBanner";
import Companysellingimg from "@/components/Companysellimg";
import { getMessages } from "@/lib/getMessages";
import BudgetCalculatorForm from "@/components/BudgetCalculatorForm";

function outsourefinancialdept() {
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
        headingHighlight={t.outsource_page.banner.heading.highlight}
        headingRest={t.outsource_page.banner.heading.rest}
        buttonText={t.outsource_page.banner.button}
        backgroundImage="/out_source.png"
        textwrap={true}
      />
      <Companysellingimg
        badge={t.outsource_page.adminstration.badge}
        title={t.outsource_page.adminstration.title}
        description={t.outsource_page.adminstration.description}
        pagedescription={t.outsource_page.adminstration.subdescription}
        benefits={[
          {
            text: t.outsource_page.adminstration.benefit1,
            icon: (
              <span className="material-symbols-outlined !text-[60px]">
                fact_check
              </span>
            ),
          },
          {
            text: t.outsource_page.adminstration.benefit2,
            icon: (
              <span className="material-symbols-outlined !text-[60px]">
                article_shortcut
              </span>
            ),
          },
        ]}
        showButton={false}
        buttonText="Learn More"
        path="/services/tax-advisory"
        showimg={false}
        pagedecclass="subtext max-w-3xl !leading-10"
        componentclass1="!w-[45%]"
        componentclass2="!w-[55%]"
      />
      <div className="container">
        <BuySellBanner
          backgroundImage={"/outsource_banner.jpg"}
          showbtn={false}
          blueoverlay={true}
          customclass="py-16 rounded-lg mb-0"
        />
      </div>
      <Companysellingimg
        badge={t.outsource_page.cfo.badge}
        title={t.outsource_page.cfo.title}
        description={t.outsource_page.cfo.description}
        benefits={[
          {
            text: (
              <p className="text-[16px] leading-8 w-[80%] ml-2">
                {t.outsource_page.cfo.benefit1}
              </p>
            ),
            icon: (
              <span className="material-symbols-outlined !text-[60px]">
                payment_arrow_down
              </span>
            ),
          },
          {
            text: (
              <p className="text-[16px] leading-8 w-[80%] ml-2">
                {t.outsource_page.cfo.benefit2}
              </p>
            ),
            icon: (
              <span className="material-symbols-outlined !text-[60px]">
                approval_delegation
              </span>
            ),
          },
        ]}
        cardImage="/cfo.jpg"
        showButton={false}
        iconstate={false}
        imageFirst={true}
        blueoverlay={true}
      />
      <BudgetCalculatorForm />
    </div>
  );
}

export default outsourefinancialdept;
