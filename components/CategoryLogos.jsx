import Image from "next/image";

export default function CategoryLogos() {
  return (
    <section className="bg-white py-10 px-4 text-center">
      <p className="text-gray-500 text-lg mb-6">
        Join 2000+ companies and advisors using our platform.
      </p>
      <div className="flex flex-wrap justify-center gap-20 text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <Image src="/category1.png" alt="startup" width={150} height={40} />
        </div>
        <div className="flex items-center gap-2">
          <Image src="/category2.png" alt="company" width={150} height={40} />
        </div>
        <div className="flex items-center gap-2">
          <Image src="/category3.png" alt="venture" width={150} height={40} />
        </div>
        <div className="flex items-center gap-2">
          <Image src="/category4.png" alt="business" width={150} height={40} />
        </div>
        <div className="flex items-center gap-2">
          <Image src="/category5.png" alt="institute" width={150} height={40} />
        </div>
        <div className="flex items-center gap-2">
          <Image src="/category6.png" alt="agency" width={150} height={40} />
        </div>
      </div>
    </section>
  );
}
