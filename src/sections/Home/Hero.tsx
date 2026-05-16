import React from "react";
import { Tag, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";

const { Title, Paragraph } = Typography;

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="h-screen flex items-center justify-center bg-linear-to-br from-cust-dark-blue from-60% to-cust-red to-100% text-white py-20 px-4">
      <div className="flex flex-col max-w-4xl mx-auto text-center">
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
            Beli Paket Sekarang <ArrowRightOutlined className="group-hover:translate-x-2 transition-all duration-300 ease-in-out"/>
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
      </div>
    </section>
  );
};

export default Hero;
