import Image from "next/image";

const stories = [
  {
    title: "Acquired Tech Innovators",
    desc: "A mid-size SaaS startup secured acquisition within 45 days through our investor network, enabling rapid market expansion and team growth.",
    image: "/section6_image1.png",
  },
  {
    title: "Fashion Brand Exit",
    desc: "A D2C fashion brand achieved a successful exit at 2.3x valuation by positioning its strong brand loyalty and streamlined operations.",
    image: "/section6_image2.png",
  },
  {
    title: "Healthcare Platform Acquisition",
    desc: "Our expert advisors facilitated the acquisition of a fast-growing telehealth platform, enabling nationwide service expansion and operational integration within 60 days.",
    image: "/section6_image3.png",
  },
];

export default function Section6() {
  return (
    <section className="px-4 md:px-12 pt-16 pb-10 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition hover:shadow-md"
          >
            <div className="w-full h-[280px] relative">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-left">
              <h3 className="text-lg font-semibold text-[#04295e] mb-2">
                {story.title}
              </h3>
              <p className="text-[#666c89] mb-4">{story.desc}</p>
              <button className="px-4 py-2 text-sm text-[#04295e] font-medium border border-[#04295e] rounded-md hover:bg-gray-100 transition">
                View Stories
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
