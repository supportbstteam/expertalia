"use client";
import BuySellBanner from "@/components/ui/BuySellBanner";
import Companysellingimg from "@/components/Companysellimg";
import BuySellTrust from "@/components/BuySellTrust";
import { getMessages } from "@/lib/getMessages";
import { useEffect, useState } from "react";

const BuySellCompanies = () => {
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
        headingHighlight={t.banner.heading.highlight}
        headingRest={t.banner.heading.rest}
        buttonText={t.banner.button}
        backgroundImage="/buy_salebanner.png"
        highlightColor
        buttonColor
      />

      {/* First Companysellingimg */}
      <Companysellingimg
        badge={t.buy_sellcompany.badge}
        title={t.buy_sellcompany.title}
        description={t.buy_sellcompany.description}
        benefits={[
          { text: t.buy_sellcompany.benefit1, icon: <span className="material-symbols-outlined small_icon">check</span> , bg: true },
          { text: t.buy_sellcompany.benefit2, icon: <span className="material-symbols-outlined small_icon">check</span> , bg: true },
          { text: t.buy_sellcompany.benefit3, icon: <span className="material-symbols-outlined small_icon">check</span> , bg: true },
          { text: t.buy_sellcompany.benefit4, icon: <span className="material-symbols-outlined small_icon">check</span> , bg: true },
        ]}
        stats={[
          { value: "150,000+", label: t.buy_sellcompany.record1 },
          { value: "90%", label: t.buy_sellcompany.record2 },
        ]}
        cardImage="/buy_sellcard.jpg"
        cardTitle={t.buy_sellcompany.imagecrdtitle}
        cardDescription={t.buy_sellcompany.imagecrddesc}
        buttonText={t.buy_sellcompany.button}
        path="/login"
      />

      <BuySellTrust />

      {/* Image first, then text */}
      <Companysellingimg
        badge={t.buy_sellcompany.badge}
        title={t.buy_sellcompany.title2}
        description={t.buy_sellcompany.description2}
        benefits={[
          { text: t.buy_sellcompany.benefit1_2, icon: <span className="material-symbols-outlined small_icon">check</span> , bg: true },
          { text: t.buy_sellcompany.benefit2_2, icon: <span className="material-symbols-outlined small_icon">check</span> , bg: true },
          { text: t.buy_sellcompany.benefit3_2, icon: <span className="material-symbols-outlined small_icon">check</span> , bg: true },
          { text: t.buy_sellcompany.benefit4_2, icon: <span className="material-symbols-outlined small_icon">check</span> , bg: true },
        ]}
        stats={[
          { value: "200,000+", label: t.buy_sellcompany.record1_2 },
          { value: "85%", label: t.buy_sellcompany.record2_2 },
        ]}
        buttonText={t.buy_sellcompany.button2}
        cardImage="/new_buysell.jpg"
        cardTitle={t.buy_sellcompany.imagecrdtitle}
        cardDescription={t.buy_sellcompany.imagecrddesc}
        imageFirst={true} // ✅ flips layout
        path="/login"
      />
    </div>
  );
};

export default BuySellCompanies;
