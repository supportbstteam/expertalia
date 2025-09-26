"use client";
import Image from "next/image";
import { getMessages } from "@/lib/getMessages";
import LanguageSwitcher from "./LanguageSwitcher";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Header() {
  const pathname = usePathname();
  // const [lang, setLang] = useState("en");
  const [t, setT] = useState(getMessages("en"));

  useEffect(() => {
    const updateLang = () => {
      const storedLang = localStorage.getItem("lang") || "en";
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
 
  const navLinks = [
    { href: "/", label: t.home },
    { href: "/buy-sell-company", label: t.buyandsale },
    { href: "/consulting", label: t.consulting },
    { href: "/outsource-financial-dept", label: t.outsourcefinancial },
    { href: "/about-us", label: t.Aboutus },
    { href: "/blog", label: t.blog },
  ];

  return (
    <header className="fixed bg-white top-0 left-0 shadow-md px-0 w-full z-10">
      <div className="container flex items-center py-4 justify-between">
        <Link href="/" className="space-x-4">
          <Image
            src="/header_logo.png"
            alt="Expertalia Logo"
            width={183}
            height={64}
            priority
          />
        </Link>
        <nav className="hidden lg:flex gap-6 text-sm text-gray-700 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`py-2.5 text-[var(--menu-default)] hover:border-b-2 hover:border-[#960F16] ${
                pathname === link.href ? "border-b-2 border-[#960F16] font-bold" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex gap-3">
          <LanguageSwitcher />
          <a
            href="/contact-us"
            className="flex gap-2 items-center bg-[var(--whatsapp-btn)] border-[#60D669] text-[#fff] px-4.5 py-3 rounded hover:bg-[var(--whatsapp-btn)]-50 text-sm font-medium"
          >
            <Image src="/whatsapp-logo.svg" alt="whatsapp logo" width={24} height={24} /> <span className="text-[16px]">676 435 804</span>
          </a>
        </div>
      </div>
    </header>
  );
}