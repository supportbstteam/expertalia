import Image from "next/image";
import { cookies } from "next/headers";
import { getMessages } from "@/lib/getMessages";
import { ArrowRight } from "lucide-react";
export default function Section6() {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value;
  const t = getMessages(lang);
  const stories = [
    {
      title: t.s47,
      desc: t.s48,
      image: "/section6_image1.png",
    },
    {
      title: t.s49,
      desc: t.s50,
      image: "/facuin.png",
    },
    {
      title: t.sn51,
      desc: t.sn52,
      image: "/tech-card.png",
    },
    {
      title: t.s51,
      desc: t.s52,
      image: "/health-card.jpg",
    },
    {
      title: t.sne51,
      desc: t.sne52,
      image: "/market-card.jpg",
    },
  ];

  return (
    <section className="container pt-16 pb-25 bg-white">
      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-4 px-2 no-scrollbar">
        {stories.map((story, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl  overflow-hidden transition  relative flex-shrink-0 w-90 snap-start"
          >
            <div className="w-full h-[180px] relative">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 text-left pb-8">
              <h3 className="text-lg font-semibold text-[#04295e] mb-2">
                {story.title}
              </h3>
              <p className="text-[#666c89] min-h-[72px] line-clamp-3">{story.desc}</p>
            </div>

            {/* Button fixed to bottom-left of the card */}
            <div className="px-6 pb-6">
              <button className="group  bg-[#052766] text-white rounded-md px-4 py-3.5 flex items-center justify-center gap-2 hover:bg-white hover:text-[#052766] hover:border-[#052766] border border-transparent transition">
                {t.s77}
                <ArrowRight className="w-4 h-4 text-white group-hover:text-[#052766]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
