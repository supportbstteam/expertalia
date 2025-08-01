import Image from "next/image";

export default function Section2() {
  return (
    <section className="flex flex-col md:flex-row justify-between px-6 md:px-12 py-8 gap-12 bg-white">
      {/* Left Half - Text Content */}
      <div className="md:w-1/2 w-full text-center md:text-left">
        {/* Top Pill Link */}
        <div className="inline-flex items-center px-4 py-1 mb-12 text-sm font-medium rounded-full bg-white text-[#04295e] border border-gray-300 shadow-sm">
          <span className="w-2 h-2 bg-red-700 rounded-full mr-2" />
          List Your Company for Sale
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#04295e] leading-snug mb-6">
          <span className="bg-[#e9ecf7] text-[#04295e] px-1 rounded-md">Sell</span>{" "}
          your company smoothly and confidently.
        </h1>

        {/* Paragraphs */}
        <p className="text-gray-500 mb-4 text-lg">
          Get accurate valuations, connect with serious buyers, and sell faster
          with expert guidance.
        </p>
        <p className="text-gray-500 mb-8 text-lg">
          From valuations to negotiations and final deal closure, we simplify
          every step. Focus on running your business while we handle the selling
          process efficiently.
        </p>

        {/* CTA Button */}
        <button className="border border-[#04295e] hover:bg-gray-100 text-sm text-[#04295e] font-medium px-5 py-2 rounded-md transition-all">
          Find Buyers Now
        </button>
      </div>

      {/* Right Half - Image and Floating Card */}
      <div className="md:w-1/2 w-full relative">
        {/* Image */}
        <Image
          src="/section2.png" // Replace with actual image
          alt="Business deal closing"
          width={600}
          height={500}
          className="rounded-xl w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}

// Step component (static, client-safe)
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
