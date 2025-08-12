import Image from "next/image";
import { cookies } from "next/headers";
import { getMessages } from "@/lib/getMessages";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value;
  const t = getMessages(lang);
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md px-10 py-3 flex items-center justify-between z-10">
      <div className="space-x-4">
        {/* Logo */}
        <Image
          src="/header_logo.png"
          alt="Expertalia Logo"
          width={130}
          height={100}
          priority // Optional: prioritize loading for LCP
        />
      </div>

      {/* Navigation */}
      <nav className="hidden lg:flex gap-6 text-sm text-gray-700 font-medium">
        <a href="#" className="hover:text-blue-600">
          { t.investors }
        </a>
        <a href="#" className="hover:text-blue-600">
          { t.companies }
        </a>
        <a href="#" className="hover:text-blue-600">
          { t.advisors }
        </a>
        <a href="#" className="hover:text-blue-600">
          { t.resource }
        </a>
        <a href="#" className="hover:text-blue-600">
          { t.contact_us }
        </a>
      </nav>

      {/* CTA Buttons */}
      <div className="hidden md:flex gap-3">
        <a
          href="#"
          className="border border-[#04295e] text-[#04295e] px-4 py-2 rounded hover:bg-blue-50 text-sm font-medium"
        >
          { t.become_advisors }
        </a>
        <a
          href="/login"
          className="bg-gradient-to-r from-[#7589a6] to-[#04295e] text-white px-4 py-2 rounded hover:opacity-90 text-sm font-medium"
        >
          {t.login}
        </a>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
