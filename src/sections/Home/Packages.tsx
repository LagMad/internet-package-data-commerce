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
          <Title level={2} className="text-white!">
            Paket Populer
          </Title>
          <Paragraph className="text-white!">
            Dipilih oleh ribuan pelanggan setiap harinya
          </Paragraph>
        </div>
        <Row gutter={[24, 24]} justify="center" align="stretch">
          {packages.map((pkg) => (
            <Col key={pkg.id} xs={24} sm={12} md={8} className="flex">
              <Card
                hoverable
                className="group flex flex-col w-full h-full bg-cust-dark-blue! border-2! border-white/50!"
                styles={{
                  body: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    padding: 24,
                  },
                }}
              >
                {/* Upper Section */}
                <div className="flex flex-col items-center justify-start text-center mb-6">
                  <div className="flex flex-col items-center gap-2 mb-3">
                    <WifiOutlined className="text-3xl text-cust-white!" />
                    {pkg.badge && (
                      <Tag
                        color={pkg.badge === "Terlaris" ? "blue" : "green"}
                        className="m-0"
                      >
                        {pkg.badge}
                      </Tag>
                    )}
                  </div>
                  <Title level={4} className="m-0! text-white!">
                    {pkg.name}
                  </Title>
                </div>

                {/* Middle Section */}
                <div className="flex-1 flex flex-col justify-center text-center mb-8">
                  <div className="text-4xl font-bold text-cust-orange mb-3">
                    {pkg.quota}
                  </div>
                  <Text className="text-white! block mb-2">
                    Berlaku {pkg.validityDays} Hari
                  </Text>
                  <div className="text-xl font-semibold text-white">
                    {formatCurrency(pkg.price)}
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-auto">
                  <Button
                    variant="default"
                    className="group w-full bg-cust-red border-cust-red hover:brightness-100"
                    onClick={onGetStarted}
                  >
                    Beli Sekarang{" "}
                    <ArrowRightOutlined className="group-hover:translate-x-2 transition-all duration-300 ease-in-out" />
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-8">
          <Button
            variant={"outline"}
            className="group py-5! px-10!"
            onClick={onGetStarted}
          >
            Lihat Semua Paket{" "}
            <ArrowRightOutlined className="group-hover:translate-x-2 transition-all duration-300 ease-in-out" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Packages;
