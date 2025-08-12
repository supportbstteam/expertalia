import Image from "next/image";
import { cookies } from "next/headers";
import { getMessages } from "@/lib/getMessages";

export default function Section3() {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value;
  const t = getMessages(lang);
  return (
    <section className="px-6 md:px-12 pt-16 pb-10 flex flex-col-reverse lg:flex-row gap-10 bg-[#fafbfc]">
      {/* Left Text Content */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <div className="inline-flex items-center px-4 py-1 mb-12 text-sm font-medium rounded-full bg-white text-[#04295e] border border-gray-300 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
          {t.s28}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#04295e] mb-6 leading-tight">
          {t.s29}
          <br /> {t.s30}{" "}
          <span className="bg-[#e8eef9] px-2 rounded-md">{t.s31}</span>
        </h1>

        <p className="text-gray-500 mb-8 text-lg">
          {t.s32}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button className="px-5 py-2 border border-[#04295e] rounded-md text-[#04295e] font-medium hover:bg-gray-100 transition">
            {t.s33}
          </button>
          <button className="px-5 py-2 border border-[#04295e] rounded-md text-[#04295e] font-medium hover:bg-gray-100 transition">
            {t.s34}
          </button>
        </div>
      </div>

      {/* Right Images */}
      <div className="lg:w-1/2 flex justify-center gap-6 items-end">
        <div className="relative top-[-40px] rounded-xl overflow-hidden w-56 md:w-64 lg:w-72">
          <Image
            src="/section3_image1.png"
            alt="Handshake"
            width={500}
            height={500}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
        <div className="relative top-[40px] rounded-xl overflow-hidden w-56 md:w-64 lg:w-72">
          <Image
            src="/section3_image2.png"
            alt="Business Discussion"
            width={500}
            height={500}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
