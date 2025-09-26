"use client";
import Slider from "react-slick";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMessages } from "@/lib/getMessages";
export default function Runningbrand() {
  const logos = [
    "/ayesa.png",
    "/cogenio.png",
    "/infracapital.png",
    "/enedsa.png",
    "/investmente.png",
    "/aicia.png",
    "/cores.png",
    "/mecavinox.png"
  ];

  const [lang, setLang] = useState("en");
  const [t, setT] = useState(getMessages("en"));

  useEffect(() => {
    const updateLang = () => {
      const storedLang = localStorage.getItem("lang") || "en";
      setLang(storedLang);
      setT(getMessages(storedLang));
    };
    updateLang(); // Initial load
    window.addEventListener("langchange", updateLang);
    window.addEventListener("storage", (e) => {
      if (e.key === "lang") updateLang();
    });
    return () => {
      window.removeEventListener("langchange", updateLang);
      window.removeEventListener("storage", updateLang);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: false,
    ltr:true,
  };

  return (
    <div className="pt-25 bg-white">
      <h2 className="h2  text-center mb-11">
        {t.trustedbg}
      </h2>
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index} className="flex items-center justify-center px-4">
            <Image
              src={logo}
              alt={`brand-${index}`}
              width={200}
              height={60}
              className="object-contain"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
