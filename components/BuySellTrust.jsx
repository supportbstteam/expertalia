import { useEffect, useState } from "react";
import { getMessages } from "@/lib/getMessages";
import Commoncard from './ui/Commoncard';

function BuySellTrust() {
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
    <div className="bg-[url('/consult_bg.png')]  bg-cover bg-bottom bg-no-repeat py-15 px-15 opacity-100">
      <section className="container">
        <div className="grid md:grid-cols-3 gap-5">
          <Commoncard
            className="text-center"
            icon={<span className="material-symbols-outlined text-white buysellicon p-2">diamond</span>}
            title={t.trustcard_title1}
            description={t.trustcard_desc1}
            center={true}
            size="half"
          />
          <Commoncard
            icon={<span className="material-symbols-outlined text-white buysellicon">percent_discount</span>}
            title={t.trustcard_title2}
            description={t.trustcard_desc2}
            center={true}
            size="half"
          />
          <Commoncard
            icon={<span className="material-symbols-outlined text-white buysellicon">handshake</span>}
            title={t.trustcard_title3}
            description={t.trustcard_desc3}
            center={true}
            size="half"
          />
        </div>
      </section>
    </div>
  );
}

export default BuySellTrust;