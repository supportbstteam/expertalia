import Image from "next/image";
import { cookies } from "next/headers";
import { getMessages } from "@/lib/getMessages";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value;
  const t = getMessages(lang);

  return (
    <footer className="px-4 md:px-12 pt-16 pb-10 bg-white border-t border-[#e5e5e5]">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_1.5fr] gap-10 text-sm">
        {/* Leftmost Column — Logo & Address */}
        <div>
          {/* Logo */}
          <div className="mb-5">
            <Image
              src="/header_logo.png"
              alt="Expertalia Logo"
              width={150}
              height={60}
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-3 text-[#666c89] text-sm">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="mt-1" />
              <p>
                {t.s53} <br />
                {t.s54}
              </p>
            </div>

            <div className="flex items-start gap-2">
              <Phone size={16} />
              <p>{t.s55}</p>
            </div>

            <div className="flex items-start gap-2">
              <Mail size={16} />
              <p>{t.s56}</p>
            </div>

            <div className="flex items-start gap-2">
              <Phone size={16} />
              <p>676 435 804</p>
            </div>
          </div>
        </div>

        {/* User Links */}
        <div>
          <h4 className="text-[#04295e] text-lg font-semibold mb-2">{t.s57}</h4>
          <ul className="space-y-4 text-[#666c89]">
            <li>{t.s58}</li>
            <li>{t.s59}</li>
            <li>{t.s60}</li>
            <li>{t.s61}</li>
            <li>{t.s62}</li>
          </ul>
        </div>

        {/* Info Links */}
        <div>
          <h4 className="text-[#04295e] text-lg font-semibold mb-2">{t.s73}</h4>
          <ul className="space-y-4 text-[#666c89]">
            <li>{t.s63}</li>
            <li>{t.s64}</li>
            <li>{t.s65}</li>
            <li>{t.s66}</li>
            <li>{t.s67}</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-[#04295e] text-lg font-semibold mb-2">{t.s74}</h4>
          <ul className="space-y-4 text-[#666c89]">
            <li>{t.s68}</li>
            <li>{t.s69}</li>
            <li>{t.s70}</li>
            <li>{t.s71}</li>
            <li>{t.s72}</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[#04295e] text-2xl font-semibold mb-2">
            {t.s75}
          </h4>
          <form className="mt-4 flex border rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder={t.s76}
              className="w-full px-4 py-2 outline-none text-[#3b3f51]"
            />
            <button className="bg-gradient-to-r from-[#7589a6] to-[#04295e] text-white px-4 py-2 font-semibold w-45">
              {t.s10}
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
