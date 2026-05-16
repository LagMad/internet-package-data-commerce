"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ThunderboltOutlined,
  SafetyOutlined,
  CustomerServiceOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/sections/Home/Hero";
import Stats from "@/sections/Home/Stats";
import Packages from "@/sections/Home/Packages";
import Features from "@/sections/Home/Features";
import Ready from "@/sections/Home/Ready";
import { Skiper39 } from "@/components/ui/skiper-ui/skiper39";

const FEATURED_PACKAGES = [
  {
    id: "2",
    name: "Basic 5GB",
    quota: "5 GB",
    price: 50000,
    validityDays: 30,
    category: "monthly",
    badge: null,
  },
  {
    id: "3",
    name: "Standard 10GB",
    quota: "10 GB",
    price: 85000,
    validityDays: 30,
    category: "monthly",
    badge: "Terlaris",
  },
  {
    id: "5",
    name: "Unlimited Basic",
    quota: "Unlimited",
    price: 200000,
    validityDays: 30,
    category: "unlimited",
    badge: "Best Value",
  },
];

const features = [
  {
    icon: <ThunderboltOutlined className="text-3xl text-yellow-500" />,
    title: "Aktivasi Instan",
    desc: "Paket langsung aktif setelah pembayaran terkonfirmasi, tanpa perlu menunggu lama.",
  },
  {
    icon: <SafetyOutlined className="text-3xl text-green-500" />,
    title: "Transaksi Aman",
    desc: "Sistem keamanan berlapis memastikan setiap transaksi terlindungi sepenuhnya.",
  },
  {
    icon: <CustomerServiceOutlined className="text-3xl text-blue-500" />,
    title: "Support 24/7",
    desc: "Tim kami siap membantu Anda kapanpun dibutuhkan, setiap hari tanpa libur.",
  },
  {
    icon: <CheckCircleOutlined className="text-3xl text-purple-500" />,
    title: "Harga Terjangkau",
    desc: "Paket kompetitif dengan kualitas terbaik. Hemat lebih banyak setiap bulannya.",
  },
];

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/customer/packages");
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} />
      <Stats />
      <div className="relative">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Skiper39 />
        </div>
        <div className="relative z-10">
          <Packages
            onGetStarted={handleGetStarted}
            packages={FEATURED_PACKAGES}
          />
          <Features features={features} />
          <Ready onGetStarted={handleGetStarted} />
        </div>
      </div>
    </div>
  );
}
