'use client';
import { ArrowRight } from "lucide-react";

export default function BannerSection({
  headingHighlight,
  headingRest,
  buttonText,
  headingRest1,
  backgroundImage,
  textwrap = false,
  showbtn = true,  
  blueoverlay = false,
  customclass = '',
}) {
  return (
    <section
      className={` ${customclass} relative bg-cover bg-center py-24 text-white`}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
     {blueoverlay && (<div className="absolute inset-0 bg-[#052766] opacity-35 rounded-lg"></div>)}
      <div className="container mx-auto text-center px-4">
        {/* Heading */}
        <h1 className={`${textwrap ? 'max-w-2xl' : 'max-w-3xl'}  h1  mx-auto !text-white mb-6`}>
          {headingRest1}{" "}
          <span className="bg-[#960F16]">{headingHighlight}</span>{" "}
          {headingRest}
        </h1>

        {/* Button */}
       { showbtn &&
        <a
          href="#quote"
          className="flex items-center justify-center mx-auto w-fit gap-2 bg-[#052766] text-center text-white py-4 px-6 rounded-md transition cursor-pointer"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 text-white rotate-300" />
        </a> }
      </div>
    </section>
  );
}
