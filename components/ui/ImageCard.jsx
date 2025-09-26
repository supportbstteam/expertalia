"use client";
import { ArrowRight } from "lucide-react";
import { tr } from "zod/v4/locales";

export default function ImageCard({
  image,
  title,
  description,
  showIcon = true,
  blueoverlay = false,
}) {
  return (
    <div
      className="relative rounded-xl w-full overflow-hidden shadow-lg h-[400px] md:h-[538px] flex items-end"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className= {blueoverlay ? `${blueoverlay} absolute inset-0 bg-[#052766] opacity-35` : "absolute inset-0 bg-black/40" }/>

      {/* Content */}
      <div className="relative z-3 text-white px-6 pt-9 pb-16 h-full flex flex-col justify-between ">
        <h3 className="text-2xl font-semibold mb-2 flex items-center justify-between gap-4">{title} <span> {showIcon ? <ArrowRight className="w-9 rounded-4xl h-9 border-2 p-1 rotate-300" />: ' ' }</span></h3>
        <p className="text-[16px] mb-4 leading-8">{description}</p>

      </div>
    </div>
  );
}
