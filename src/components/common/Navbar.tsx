"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Typography } from "antd";
import { WifiOutlined } from "@ant-design/icons";
import { User } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";

const { Title, Text } = Typography;

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === "/login") return null;

  const { user } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollThreshold = 150;

      if (scrollTop > scrollThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <WifiOutlined
            className={`text-2xl transition-all duration-300 ease-in-out ${
              isScrolled ? "text-cust-red!" : "text-white!"
            }`}
          />
          <Title
            level={4}
            className={`mb-0! transition-all duration-300 ease-in-out ${
              isScrolled ? "text-cust-red!" : "text-white!"
            }`}
          >
            DataPaket
            <span
              className={`ml-0.5 transition-all duration-300 ease-in-out ${
                isScrolled ? "text-cust-black" : "text-white"
              }`}
            >
              .id
            </span>
          </Title>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Text className="hidden sm:block text-gray-600">
                Halo, {user.name.split(" ")[0]}
              </Text>
              <Button
                onClick={() =>
                  router.push(
                    user.role === "admin"
                      ? "/admin/dashboard"
                      : "/customer/packages",
                  )
                }
              >
                Dashboard
              </Button>
            </>
          ) : (
            <>
              <Button className="bg-cust-red border-cust-red" onClick={() => router.push("/login")}>Masuk</Button>
              <Button
                variant={"outline"}
                className={`hover:brightness-80 ${isScrolled ? "border-cust-black text-cust-black" : "border-white! text-white!"}`}
                onClick={() => router.push("/login")}
              >
                Daftar
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
