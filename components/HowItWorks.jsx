import Image from "next/image";
import { cookies } from "next/headers";
import { getMessages } from "@/lib/getMessages";

export default function HowItWorks() {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value;
  const t = getMessages(lang);
  return (
    <section className="bg-white px-6 md:px-12 py-16 text-center relative">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0c1c3f] mb-16">
        {t.s12} <br /> {t.s13}
      </h2>

      <div className="relative flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Left Card */}
        <div className="relative w-full md:w-1/3 max-w-sm">
          <Image
            src="/how_it_works1.png"
            alt="Left Card"
            width={400}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Connecting Line (Left → Center) */}
        <div className="hidden md:block absolute left-1/3 top-1/2 w-1/3 h-px border-t-2 border-dashed border-[#4d47f5] z-0" />

        {/* Center Card (smaller & in front) */}
        <div className="relative z-5 w-full md:w-1/4 scale-90 bg-white">
          <Image
            src="/how_it_works2.png"
            alt="Center Card"
            width={300}
            height={300}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Connecting Line (Center → Right) */}
        <div className="hidden md:block absolute right-1/3 top-1/2 w-1/3 h-px border-t-2 border-dashed border-[#4d47f5] z-0" />

        {/* Right Card */}
        <div className="relative w-full md:w-1/3 max-w-sm">
          <Image
            src="/how_it_works3.png"
            alt="Right Card"
            width={400}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
