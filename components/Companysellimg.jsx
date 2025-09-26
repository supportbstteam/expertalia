"use client";
import { ArrowRight } from "lucide-react";
import ImageCard from "./ui/ImageCard";
import { Button } from "./ui/button";

export default function Companysellingimg({
  badge,
  title,
  description,
  // benefits now each has its own text and icon
  benefits = [], // [{ text: "Benefit 1", icon: <YourIcon /> }]
  stats = [],
  buttonText,
  path,
  cardImage,
  cardTitle,
  cardDescription,
  imageFirst = false, // ✅ toggle layout
  showButton = true,
  iconstate = true,
  blueoverlay = false,
  showimg = true,
  pagedescription,
  pagedecclass,
  clx,
  componentclass1,
  componentclass2
}) {
  const handleRedirect = () => {
    window.location.href = path; // ✅ redirect to given path
  };

  return (
    <section
      className={clx ? `${clx} container mx-auto ` : `container mx-auto py-25`}
    >
      <div
        className={`flex gap-10 flex-col md:flex-row items-center ${
          imageFirst ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Left Content */}
        <div className={`w-full md:w-[58%] ${componentclass1 ? componentclass1 : '' }`}>
          {/* Badge */}
          <span className="border p-4 rounded-3xl text-sm text-[#052766] font-medium relative before:absolute before:left-[10px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-[#960F16] before:rounded-full before:content-[''] pl-6">
            {badge}
          </span>

          {/* Title */}
          <h2 className="h2 text-[#052766] mt-8 mb-6  pr-5 !leading-10">
            {title}
          </h2>

          {/* Description */}
          <p className="subtext !text-[16px] max-w-3xl !leading-10">{description}</p>

          {/* Benefits */}
          {showimg ? (
            <ul className="grid grid-cols-2 gap-y-3 mt-6 mb-6 text-gray-700">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center">
                  <span
                    className={
                      benefit.bg
                        ? "bg-[#052766] h-5 w-5 rounded-3xl text-white flex items-center justify-center mr-2 p-2"
                        : "text-[#052766] mr-2"
                    }
                  >
                    {benefit.icon}
                  </span>
                  <span className=" subtext !text-[16px]"> {benefit.text}</span>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}

          {/* Stats */}
          <div className="flex items-center justify-center md:justify-start gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-start w-1/2">
                <div className="text-3xl leading-11 font-semibold text-[#052766] mr-4 mb-2">
                  {stat.value}
                </div>
                <span className="text-gray-700">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Button */}
          {showButton ? (
            <Button
              onClick={handleRedirect}
              variant="customBlue"
              className="mt-8 py-4 flex items-center"
            >
              {buttonText} <ArrowRight className="size-5 ml-2" />
            </Button>
          ) : (
            ""
          )}
        </div>

        {/* Right Content (ImageCard) */}
        <div className={`w-full md:w-[42%] mt-10 md:mt-0 ${componentclass2 ? componentclass2 : '' }`}>
          {showimg ? (
            <ImageCard
              image={cardImage}
              title={cardTitle}
              description={cardDescription}
              showIcon={iconstate}
              blueoverlay={blueoverlay}
            />
          ) : (
            <div>
              <p className={`${pagedecclass} subtext !text-[16px] max-w-3xl !leading-10`}>
                {pagedescription}
              </p>
              <ul className="grid grid-cols-2 gap-y-3 mt-6 mb-6 text-gray-700">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center">
                    <span
                      className={
                        benefit.bg
                          ? "bg-[#052766] h-5 w-5 rounded-3xl text-white flex items-center justify-center mr-2 p-2"
                          : "text-[#052766] mr-2"
                      }
                    >
                      {benefit.icon}
                    </span>
                  <span className=" subtext !text-[16px]"> {benefit.text}</span> 
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
