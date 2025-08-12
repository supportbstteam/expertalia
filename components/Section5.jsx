import { cookies } from "next/headers";
import { getMessages } from "@/lib/getMessages";

export default function Section5() {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value;
  const t = getMessages(lang);

  return (
    <section className="px-4 md:px-12 pt-16 pb-10 bg-white">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="lg:w-1/2">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#04295e] mb-10 leading-tight">
            {t.s43} <br className="hidden md:block" /> {t.s44}
          </h2>
        </div>

        <div className="lg:w-1/2">
          {/* Paragraph */}
          <p className="text-[#666c89] text-base md:text-lg">{t.s45}</p>
          <div className="flex items-center justify-between mt-8">
            {/* Button */}
            <button className="px-6 py-3 border border-[#04295e] rounded-lg text-[#04295e] hover:bg-gray-100 transition">
              {t.s46}
            </button>
            {/* Arrows */}
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                <span className="text-lg">&#8592;</span>
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                <span className="text-lg">&#8594;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
