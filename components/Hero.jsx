import Image from "next/image";

export default function Hero() {
  return (
    <section className="mt-20 px-6 md:px-12 pt-16 pb-24 flex flex-col-reverse lg:flex-row items-center gap-10 bg-white">
      {/* Left Content */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-[#f9f9f9] text-[#04295e] border border-gray-300">
          <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
          All-in-One Platform for M&A Transactions
        </div>

        <h1 className="text-4xl md:text-5xl  text-[#04295e] mb-6 leading-tight">
          The Largest Marketplace
          <br />
          to <span className="text-blue-700">buy</span> and{" "}
          <span className="text-blue-700">Sell</span> Companies
        </h1>

        <p className="text-gray-600 mb-8 text-lg">
          Discover a secure, transparent platform connecting verified business
          owners, investors, and advisors. Manage valuations, NDAs,
          negotiations, and deal closures seamlessly – all in one place.
        </p>

        <form className="flex max-w-md mx-auto lg:mx-0">
          <input
            type="email"
            placeholder="What's your work email?"
            className="flex-1 px-4 py-3 rounded-l-md border border-gray-300 text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-[#7589a6] to-[#04295e] text-white text-sm font-medium rounded-r-md hover:opacity-90"
          >
            Get started
          </button>
        </form>
      </div>

      {/* Right Images - horizontal and staggered */}
      <div className="lg:w-1/2 flex justify-center gap-6 items-end">
        <div className="relative top-[-40px] rounded-xl overflow-hidden w-56 md:w-64 lg:w-72">
          <Image
            src="/hero1.png"
            alt="Handshake"
            width={500}
            height={500}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
        <div className="relative top-[40px] rounded-xl overflow-hidden w-56 md:w-64 lg:w-72">
          <Image
            src="/hero2.png"
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
