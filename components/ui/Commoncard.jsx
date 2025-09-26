"use client";
import { ArrowRight } from "lucide-react";

export default function Commoncard({ 
  icon, 
  title, 
  description, 
  buttonText,   
  onClick ,
  center = false,
  size = "full",
}) {
  return (
    <div className="border bg-white rounded-xl p-6 shadow-sm flex flex-col justify-between h-full">
      <div className={ center ? "flex flex-col items-center text-center" : "" }>
        {/* Icon */}
        <div className={size === 'full' ? "w-20 h-20 rounded-full bg-[#052766] flex items-center justify-center mb-8" : "w-15 h-15 rounded-full bg-[#052766] flex items-center justify-center mb-6" }>
          {icon}
        </div>

        {/* Title */}
        <h3 className={size === 'full' ? "h3 mb-8" : "h3 !leading-6 mb-2"}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-[16px] text-[#6F6C8F] leading-8">
          {description}
        </p>
      </div>

      {/* Button */}
      {buttonText && (
        <button
          onClick={onClick}
          className="mt-6 flex w-fit items-center gap-2 px-5 py-4 bg-[#052766] text-white rounded-md hover:bg-white hover:text-[#052766] hover:border-[#052766] border transition"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
