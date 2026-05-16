import React from "react";
import { Card, Typography, Row, Col } from "antd";
import {
  ThunderboltOutlined,
  SafetyOutlined,
  CustomerServiceOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { PackageCategory } from "@/types";

const { Title, Paragraph } = Typography;

interface FeaturesProps {
  features: {
    icon: React.ReactNode;
    title: string;
    desc: string;
  }[];
}

const Features = ({ features }: FeaturesProps) => {
  return (
    <section className="bg-cust-dark-blue py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <Title level={2} className="text-cust-yellow!">Kenapa Pilih DataPaket.id?</Title>
        </div>
        <Row gutter={[24, 24]}>
          {features.map((f, i) => (
            <Col key={i} xs={24} sm={12} md={6}>
              <Card
                className="text-center h-full bg-cust-red! border-white/10!"
                styles={{ body: { padding: 24 } }}
              >
                <div className="mb-3 text-white">{f.icon}</div>
                <Title level={5} className="text-white!">{f.title}</Title>
                <Paragraph className="text-white! text-sm">
                  {f.desc}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Features;
