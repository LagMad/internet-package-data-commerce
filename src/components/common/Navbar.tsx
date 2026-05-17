"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { WifiOutlined } from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hiddenPaths = ["/login", "/register", "/not-found"];
  const hideNav =
    hiddenPaths.includes(pathname) ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/customer/");

  if (hideNav) return null;

  const isOnCustomer = pathname.startsWith("/customer/");
  const logoColored = isOnCustomer || isScrolled;

  return (
    <header className={`w-full top-0 z-50 fixed px-10 pt-3`}>
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between rounded-2xl transition-all duration-300 ease-in-out ${
          isScrolled ? "bg-cust-black shadow-xl shadow-white/10" : "w"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <WifiOutlined
            className={`text-2xl transition-colors duration-300 ${
              logoColored ? "text-cust-red!" : "text-white!"
            }`}
          />
          <h4
            className={`mb-0 font-semibold text-lg transition-colors duration-300 ${
              logoColored ? "text-cust-red!" : "text-white!"
            }`}
          >
            DataPaket
            <span
              className={`ml-0.5 transition-colors duration-300 ${
                isScrolled ? "text-cust-white" : "text-white"
              }`}
            >
              .id
            </span>
          </h4>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <p className="hidden sm:block text-white ">
                Halo, {user.name.split(" ")[0]}
              </p>
              <Button
                className="bg-cust-red border-cust-red"
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
              <Button
                className="bg-cust-red border-cust-red"
                onClick={() => router.push("/login")}
              >
                Masuk
              </Button>
              {/* <Button
                variant="outline"
                className={`hover:brightness-80 ${
                  isScrolled
                    ? "border-cust-white text-cust-white"
                    : "border-white! text-white!"
                }`}
                onClick={() => router.push("/register")}
              >
                Daftar
              </Button> */}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
