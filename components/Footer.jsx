import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
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
                Avenida República Argentina, <br />
                26 Puerta E 41011 Sevilla
              </p>
            </div>

            <div className="flex items-start gap-2">
              <Phone size={16} />
              <p>Telephone: 955 190 908</p>
            </div>

            <div className="flex items-start gap-2">
              <Mail size={16} />
              <p>info@example.com</p>
            </div>

            <div className="flex items-start gap-2">
              <Phone size={16} />
              <p>676 435 804</p>
            </div>
          </div>
        </div>

        {/* User Links */}
        <div>
          <h4 className="text-[#04295e] text-lg font-semibold mb-2">User</h4>
          <ul className="space-y-4 text-[#666c89]">
            <li>For Company</li>
            <li>For Investors</li>
            <li>For Advisors</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Info Links */}
        <div>
          <h4 className="text-[#04295e] text-lg font-semibold mb-2">Information</h4>
          <ul className="space-y-4 text-[#666c89]">
            <li>Home</li>
            <li>How It Works</li>
            <li>Marketplace</li>
            <li>Contact Us</li>
            <li>Cookies Policy</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-[#04295e] text-lg font-semibold mb-2">Connect With Us</h4>
          <ul className="space-y-4 text-[#666c89]">
            <li>LinkedIn</li>
            <li>Twitter</li>
            <li>Facebook</li>
            <li>Whatsapp</li>
            <li>Affiliate Program</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[#04295e] text-2xl font-semibold mb-2">

            Let’s keep in touch
          </h4>
          <form className="mt-4 flex border rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Email Id"
              className="w-full px-4 py-2 outline-none text-[#3b3f51]"
            />
            <button className="bg-gradient-to-r from-[#7589a6] to-[#04295e] text-white px-4 py-2 font-semibold w-45">
              Get started
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
