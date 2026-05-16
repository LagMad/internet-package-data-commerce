import React from "react";
import { Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";

const { Title, Paragraph } = Typography;

const Ready = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <section className="py-24 px-4 text-center bg-cust-red">
      <Title level={2} className="text-white!">
        Siap untuk Mulai?
      </Title>
      <Paragraph className="text-white! text-lg mb-8 max-w-lg mx-auto">
        Daftar sekarang dan dapatkan paket data terbaik untuk kebutuhanmu.
      </Paragraph>
      <Button
        onClick={onGetStarted}
        className="group h-12 px-8 text-base font-semibold text-white"
      >
        Mulai Sekarang <ArrowRightOutlined className="group-hover:translate-x-2 transition-all duration-300 ease-in-out"/>
      </Button>
    </section>
  );
};

export default Ready;
