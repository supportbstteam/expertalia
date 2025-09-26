"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/redux/languageSlice";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

const languages = [
  { code: "en", label: "ENG", flag: "gb" },
  { code: "esp", label: "ESP", flag: "es" },
];

export default function LanguageSwitcher() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const reduxLang = useSelector((state) => state.language.lang);
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(reduxLang);

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      setCurrentLang(lang);
    }
  }, [reduxLang]);

  const changeLang = (lang) => {
    localStorage.setItem("lang", lang);
    window.dispatchEvent(new Event("langchange"));
    Cookies.set("lang", lang, { expires: 365 });
    dispatch(setLanguage(lang));
    router.replace(pathname);
    setIsOpen(false);
  };

  const current = languages.find((l) => l.code === currentLang);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-3 font-bold text-sm border border-gray-700 rounded bg-white  focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-2">
          <span className={`fi fi-${current?.flag} w-5 h-4`} />
          {current?.label}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 left-0 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLang(lang.code)}
              className="flex items-center px-3 py-2 font-bold text-sm text-gray-700 hover:bg-gray-100"
            >
              <span className={`fi fi-${lang.flag} w-5 h-4 mr-2`} />
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
