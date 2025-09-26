import Image from "next/image";
import { getMessages } from "@/lib/getMessages";
import { MapPin, Phone } from "lucide-react";
import { TbBrandFacebook } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useEffect, useState } from "react";

export default function Footer() {
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
    <footer className=" pb-10 bg-[#052766] border-t border-[#e5e5e5]">
      <div className="pt-25 pb-25 container grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1fr_1fr_2fr] gap-20 text-sm">
        {/* Leftmost Column — Logo & Address */}
        <div>
          {/* Logo */}
          <div className="mb-5">
            <Image
              src="/header_logo.png"
              alt="Expertalia Logo"
              width={199}
              height={80}
            />
            <p className="text-sm mt-10 leading-6 font-light text-white">
              {t.footer.about}
            </p>
          </div>
        </div>

        {/* User Links */}
        <div>
          <h4 className="text-[#fff] text-lg font-semibold mb-6">{t.s57}</h4>
          <ul className="space-y-4 text-[#fff]">
            <li>{t.s58}</li>
            <li>{t.s59}</li>
            <li>{t.s60}</li>
            <li>{t.s61}</li>
            {/* <li>{t.s62}</li> */}
          </ul>
        </div>

        {/* Info Links */}
        <div>
          <h4 className="text-[#fff] text-lg font-semibold mb-6">{t.s73}</h4>
          <ul className="space-y-4 text-[#fff]">
            <li>{t.s63}</li>
            <li>{t.s64}</li>
            <li>{t.s65}</li>
            <li>{t.s66}</li>
            {/* <li>{t.s67}</li> */}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-[#fff] text-lg font-semibold mb-6">{t.s74}</h4>
          <ul className="space-y-4 text-[#fff]">
            <li>{t.s67}</li>
            <li>{t.s62}</li>
            <li>{t.snlega1}</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[#fff] text-2xl font-semibold mb-6">
            {t.scontact}
          </h4>
          <div className="flex items-start gap-2 text-[#fff] mb-4">
            <MapPin size={24} className="" />
            <p>
              {t.s53} <br />
              {t.s54}
            </p>
          </div>

          <div className="flex items-start gap-2 text-[#fff] mb-4">
            <Phone size={24} />
            <p>{t.s55}</p>
          </div>
          <div className="flex items-center gap-3">
            <TbBrandFacebook color="white" size={24} />
            <FaXTwitter color="white" size={24} />
            <MdOutlineEmail color="white" size={24} />
            <BsLinkedin color="white" size={24} />
            <FaWhatsapp color="white" size={24} />
          </div>
        </div>
      </div>
      <div className="container mt-10 text-center text-sm text-white font-light border-t-1 pt-8 mb-3">
        {t.copyright}
      </div>
    </footer>
  );
}
