"use client";
import { useState, useEffect } from "react";
import Maincard from "@/components/ui/maincard";
import BusinessFormModal from "@/components/ui/BusinessFormModal";
import { getMessages } from "@/lib/getMessages";

export default function Ourservice() {
  const [isModalOpen, setModalOpen] = useState(false);
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

  const services = [
    {
      icon: <span className="material-symbols-outlined">business_center</span>,
      title: t.ourservice.services.buyandsell.title,
      items: [t.ourservice.services.buyandsell.items1, t.ourservice.services.buyandsell.items2],
      buttonText: t.ourservice.services.buyandsell.button,
      buttonLink: "/buy-sell-company",
      mainbuttonlink: "/buy-sell-company",
      opensModal: true,
    },
    {
      icon: <span className="material-symbols-outlined">clinical_notes</span>,
      title: t.ourservice.services.consulting.title,
      items: { tax: t.ourservice.services.consulting.items1, labour: t.ourservice.services.consulting.items2, accounting: t.ourservice.services.consulting.items3 },
      buttonText: t.ourservice.services.consulting.button,
      buttonLink: "/consulting",
      mainbuttonlink: "/consulting",
    },
    {
      icon: <span className="material-symbols-outlined">money_bag</span>,
      title: t.ourservice.services.outsource.title,
      items: { admin: t.ourservice.services.outsource.items1, chief: t.ourservice.services.outsource.items2 },
      buttonText: t.ourservice.services.outsource.button,
      buttonLink: "/outsource-financial-dept",
      mainbuttonlink: "/outsource-financial-dept",
    },
  ];

  return (
    <section className="container pt-38  text-center">
      <h1 className="h1 text-[#052766]">
        {t.ourservice.heading}
      </h1>
      <p className="subtext mb-11">
        {t.ourservice.subtext}
      </p>
      <div className="card_container grid md:grid-cols-3 gap-5">
        {services.map((service, idx) => (
          <Maincard
            key={idx}
            {...service}
            onButtonClick={() => {
              if (service.opensModal) {
                setModalOpen(true);
              } else {
                window.location.href = service.buttonLink;
              }
            }}
            mainbuttonlink={service.mainbuttonlink}
          />
        ))}
      </div>
      <BusinessFormModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
