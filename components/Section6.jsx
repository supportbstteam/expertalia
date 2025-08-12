import Image from "next/image";
import { cookies } from "next/headers";
import { getMessages } from "@/lib/getMessages";

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
      image: "/section6_image2.png",
    },
    {
      title: t.s51,
      desc: t.s52,
      image: "/section6_image3.png",
    },
  ];

  return (
    <section className="px-4 md:px-12 pt-16 pb-10 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition hover:shadow-md relative"
          >
            <div className="w-full h-[280px] relative">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 text-left pb-16 mb-4">
              <h3 className="text-lg font-semibold text-[#04295e] mb-2">
                {story.title}
              </h3>
              <p className="text-[#666c89]">{story.desc}</p>
            </div>

            {/* Button fixed to bottom-left of the card */}
            <button className="px-4 py-2 text-sm text-[#04295e] font-medium border border-[#04295e] rounded-md hover:bg-gray-100 transition absolute bottom-6 left-6">
              {t.s77}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
