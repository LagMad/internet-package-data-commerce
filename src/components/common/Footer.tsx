"use client";

import React from "react";
import { Typography } from "antd";
import { WifiOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center bg-cust-black text-gray-400 py-8 px-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <WifiOutlined className="text-white!" />
        <Text className="text-white! font-semibold">DataPaket.id</Text>
      </div>
      <div className="group relative w-fit flex justify-center items-center text-gray-400! text-sm mb-0!">
        © {new Date().getFullYear()} DataPaket.id — Platform Paket Data Internet
        Terpercaya
        <div className="absolute top-full opacity-0 group-hover:opacity-100 w-full transition-all duration-500 ease-in-out">
          Made with ❤️ by Hizkia Jeremmy
        </div>
      </div>
    </footer>
  );
};

export default Footer;
