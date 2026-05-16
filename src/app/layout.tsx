import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "DataPaket.id — Beli Paket Data Internet Mudah & Cepat",
  description:
    "Platform e-commerce terpercaya untuk membeli paket data internet terbaik dengan harga terjangkau. Tersedia paket harian, bulanan, unlimited, dan gaming.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={cn("h-full", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col bg-cust-dark-blue!">
        <AntdRegistry>
          <AuthProvider>
            <Navbar />
            <div className="bg-cust-dark-blue!">{children}</div>
            <Footer />
            <Toaster position="top-right" />
          </AuthProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
