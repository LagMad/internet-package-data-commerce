import React from "react";
import { Card, Tag, Typography, Row, Col } from "antd";
import { WifiOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { formatCurrency } from "@/utils/formatters";
import { Button } from "@/components/ui/button";

const { Title, Paragraph, Text } = Typography;

interface PackagesProps {
  onGetStarted: () => void;
  packages: Array<{
    id: string;
    name: string;
    quota: string;
    validityDays: number;
    price: number;
    badge?: string | null;
  }>;
}

const Packages = ({ onGetStarted, packages }: PackagesProps) => {
  return (
    <section className="py-16 px-4 bg-cust-black from-60% to-cust-red to-100%">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <Title level={2} className="text-white!">Paket Populer</Title>
          <Paragraph className="text-white!">
            Dipilih oleh ribuan pelanggan setiap harinya
          </Paragraph>
        </div>
        <Row gutter={[24, 24]} justify="center">
          {packages.map((pkg) => (
            <Col key={pkg.id} xs={24} sm={8}>
              <Card
                hoverable
                className="flex flex-col items-stretch h-full text-center relative space-y-6 bg-cust-dark-blue! border-2! border-white/50!"
                styles={{ body: { padding: 24 } }}
              >
                <div className="flex w-full flex-col justify-center items-center gap-2">
                  <WifiOutlined className="text-3xl text-cust-white!" />
                  {pkg.badge && (
                    <Tag
                      color={pkg.badge === "Terlaris" ? "blue" : "green"}
                      className=""
                    >
                      {pkg.badge}
                    </Tag>
                  )}
                </div>
                <Title level={4} className="mb-1! text-white!">
                  {pkg.name}
                </Title>
                <div className="text-3xl font-bold text-cust-orange my-3">
                  {pkg.quota}
                </div>
                <Text className="text-white! block mb-2">
                  Berlaku {pkg.validityDays} Hari
                </Text>
                <div className="text-xl font-semibold text-white mb-4">
                  {formatCurrency(pkg.price)}
                </div>
                <Button
                  variant="default"
                  className="group w-full bg-cust-red border-cust-red hover:brightness-100"
                  onClick={onGetStarted}
                >
                  Beli Sekarang <ArrowRightOutlined className="group-hover:translate-x-2 transition-all duration-300 ease-in-out"/>
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-8">
          <Button
            variant={"default"}
            className="group py-5! px-10!"
            onClick={onGetStarted}
          >
            Lihat Semua Paket <ArrowRightOutlined className="group-hover:translate-x-2 transition-all duration-300 ease-in-out"/>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Packages;
