import React from "react";
import { Row, Col, Statistic } from "antd";

const Stats = () => {
  const stast = [
    {
      title: "Pengguna Aktif",
      value: "50K+",
    },
    {
      title: "Paket Tersedia",
      value: "8+",
    },
    {
      title: "Transaksi/Hari",
      value: "5K+",
    },
    {
      title: "Kepuasan Pelanggan",
      value: "98%",
    },
  ];

  return (
    <section className="bg-cust-yellow py-10 drop-shadow-2xl">
      <div className="max-w-5xl mx-auto px-4">
        <Row gutter={[24, 24]} justify="center">
          {stast.map((item) => (
            <Col key={item.title} xs={12} sm={6}>
              <Statistic
                title={item.title}
                value={item.value}
                className="text-center font-black text-cust-red!"
              />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Stats;
