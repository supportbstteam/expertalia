import Image from "next/image";
import Hero from "@/components/Hero";
import CategoryLogos from "@/components/CategoryLogos";
import HowItWorks from "@/components/HowItWorks";
import CompanyListed from "@/components/CompanyListed";
import ToastComponent from "@/components/ToastComponent";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";
import Section5 from "@/components/Section5";
import Section6 from "@/components/Section6";
import Ourservice from "@/components/Ourservice";
import Runningbrand from "@/components/Runningbrand";
import Opportunities from "@/components/Opportunities";
import BuySellSection from "@/components/BuySellSection";
import Consulting from "@/components/Consulting";
import Outsource from "@/components/Outsource";

export default async function Home({ searchParams }) {
  const success = searchParams?.success;
  const error = searchParams?.error;
  return (
    <>
      <ToastComponent success={success} error={error} />  
      <Ourservice />
      <Runningbrand />
      <Opportunities />
      <BuySellSection />
      <Consulting />
      <Outsource />
      {/* <Hero /> */}
      {/* <CategoryLogos /> */}
      {/* <HowItWorks /> */}
      {/* <CompanyListed /> */}
      {/* <Section1 /> */}
      {/* <Section2 /> */}
      {/* <Section3 /> */}
      {/* <Section4 /> */}
      <Section5 />
      <Section6 />
     
    </>
  );
}
