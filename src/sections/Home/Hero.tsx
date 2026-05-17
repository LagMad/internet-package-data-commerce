import React from "react";
import { Tag, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { Carousel_005 } from "@/components/ui/skiper-ui/skiper51";
import { CrowdCanvas } from "@/components/ui/skiper-ui/skiper39";

const { Title, Paragraph } = Typography;

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  const images=[
    {
      src: "/images/internet/1.jpeg",
      alt: "placeholder image",
    },
    {
      src: "/images/internet/2.jpeg",
      alt: "placeholder image",
    },
    {
      src: "/images/internet/3.jpeg",
      alt: "placeholder image",
    },
    {
      src: "/images/internet/4.jpeg",
      alt: "placeholder image",
    },
    {
      src: "/images/internet/5.jpeg",
      alt: "placeholder image",
    },
  ]

  return (
    <section className="h-screen flex items-center justify-center bg-[linear-gradient(to_top,#2D4059_25%,#EA5455_50%,#F07B3F_75%,#FFD460_100%)] text-white py-20 px-4">
      <div className="absolute inset-x-0 bottom-0 h-full w-full">
        <CrowdCanvas src="/images/all-peeps.png" rows={15} cols={7} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-cust-black/40" />
      <Carousel_005
        images={images}
        showPagination={true}
        loop={true}
        autoplay={true}
        spaceBetween={0}
        className="max-w-none!"
      />
      {/* <div className="flex flex-col max-w-4xl mx-auto text-center">
        <div className="bg-cust-yellow/50 w-fit self-center mb-4 text-sm px-3 py-1 rounded-2xl animate-bounce">
          🎉 Promo Spesial — Hemat hingga 40%
        </div>
        <Title level={1} className="text-white! text-4xl! sm:text-5xl! mb-4!">
          Paket Data Internet
          <br />
          <span className="text-cust-yellow">Terbaik & Terjangkau</span>
        </Title>
        <Paragraph className="text-blue-100! text-lg mb-8 max-w-2xl mx-auto">
          Pilih paket data sesuai kebutuhanmu. Dari paket harian hemat hingga
          unlimited pro untuk profesional. Aktivasi instan, langsung terhubung!
        </Paragraph>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            className="group px-10! py-5"
            variant={"default"}
            onClick={onGetStarted}
          >
            Beli Paket Sekarang{" "}
            <ArrowRightOutlined className="group-hover:translate-x-2 transition-all duration-300 ease-in-out" />
          </Button>
          <Button
            className="px-10! py-5"
            variant={"secondary"}
            onClick={() => {
              document
                .getElementById("packages-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Lihat Semua Paket
          </Button>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
