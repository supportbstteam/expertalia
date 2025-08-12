import Image from "next/image";
import { cookies } from "next/headers";
import { getMessages } from "@/lib/getMessages";

export default function Confidentiality() {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value;
  const t = getMessages(lang);
  
  return (
    <section className="px-6 md:px-12 pt-16 pb-10 flex flex-col lg:flex-row justify-between gap-18 bg-white">
      {/* Left Text Content */}
      <div className="lg:w-1/2">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-1 mb-6 text-sm font-medium rounded-full bg-[#f6f6f6] text-[#04295e] border border-gray-200">
          <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
          {t.s35}
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#04295e] mb-10 leading-tight">
          {t.s36} <br /> {t.s37} <br /> {t.s38}
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              label: t.s39,
              icon: "💡",
            },
            {
              label: t.s40,
              icon: "🖥️",
            },
            {
              label: t.s41,
              icon: "🛡️",
            },
            {
              label: t.s42,
              icon: "🔗",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-start gap-3 bg-[#f9f9ff] border border-[#ececec] rounded-lg p-4"
            >
              <span className="text-xl">{item.icon}</span>
              <p className=" text-[#04295e] font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Image */}
      <div className="lg:w-1/2">
        <div className="w-full rounded-3xl overflow-hidden">
          <Image
            src="/section4.png" // Make sure this image exists in public/
            alt="Confidential UI"
            width={700}
            height={500}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
