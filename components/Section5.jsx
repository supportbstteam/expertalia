import { cookies } from "next/headers";
import { getMessages } from "@/lib/getMessages";
import { ArrowRight } from "lucide-react";
export default function Section5() {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value;
  const t = getMessages(lang);

  return (
    <section className="container pt-25 pb-10 bg-white">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="lg:w-1/2">
          {/* Heading */}
          <h2 className="h2 mb-10 leading-tight">
            {t.s43} <br className="hidden md:block" /> {t.s44}
          </h2>
        </div>

        <div className="lg:w-1/2">
          {/* Paragraph */}
          <p className="text-[#666c89] text-base md:text-lg">{t.s45}</p>
          <div className="flex items-center justify-between mt-8">
            {/* Button */}
            <button className="mt-6 flex w-fit items-center gap-2 px-5 py-4 bg-[#052766] text-white rounded-md hover:bg-white hover:text-[#052766] hover:border-[#052766] border transition cursor-pointer">
              {t.s46}
                <ArrowRight className="w-4 h-4 text-white rotate-300" />
  
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
