import Image from "next/image";

export default function Section1() {
  return (
    <section className="flex flex-col-reverse md:flex-row justify-between px-6 md:px-12 py-20 gap-12 bg-white">
      {/* Left Half - Image */}
      <div className="md:w-1/2 w-full">
        <Image
          src="/section1.png" // Replace with actual image
          alt="People discussing business"
          width={500}
          height={400}
          className="rounded-xl w-full h-auto object-cover"
        />
      </div>

      {/* Right Half - Text and Floating Card */}
      <div className="md:w-1/2 w-full text-center md:text-left">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-1 mb-12 text-sm font-medium rounded-full bg-white text-[#04295e] border border-gray-300 shadow-sm">
          <span className="w-2 h-2 bg-red-700 rounded-full mr-2" />
          Business Acquisition Opportunities
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#04295e] leading-snug mb-6">
          Make it effortless to{" "}
          <span className="bg-[#e9ecf7] text-[#04295e] px-1 rounded-md">
            buy
          </span>{" "}
          your next company.
        </h1>

        {/* Paragraphs */}
        <p className="text-gray-500 mb-4 text-lg">
          Full-service digital marketing agency helping local businesses grow
          their online presence.
        </p>
        <p className="text-gray-500 mb-8 text-lg">
          Our platform makes acquisitions straightforward and transparent.
          Access verified listings, detailed insights, and seamless negotiation
          tools to secure your ideal business faster.
        </p>

        {/* CTA Button */}
        <button className="border border-[#04295e] hover:bg-gray-100 text-sm text-[#04295e] font-medium px-5 py-2 rounded-md transition-all mb-10">
          Explore Listings
        </button>
      </div>
    </section>
  );
}

// Step (Client-Safe: no interactivity or hooks)
function Step({ icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      <div>
        <h4 className="font-medium text-sm text-[#0c1c3f]">{title}</h4>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
