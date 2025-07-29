import Image from "next/image";
import Header from "@/components/Header";
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
import Footer from "@/components/Footer";

export default async function Home({ searchParams }) {
  const success = searchParams?.success;
  const error = searchParams?.error;
  return (
    <>
      <ToastComponent success={success} error={error} />  
      <Header />
      <Hero />
      <CategoryLogos />
      <HowItWorks />
      <CompanyListed />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Footer />
    </>
  );
}
