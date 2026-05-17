"use client";

import React, { useEffect } from "react";
import { Wifi, ArrowRight } from "lucide-react";

import { formatCurrency } from "@/utils/formatters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel_003 } from "@/components/ui/skiper-ui/skiper49";
import { usePackages } from "@/hooks/usePackages";

interface Package {
  id: string;
  name: string;
  quota: string;
  validityDays: number;
  price: number;
  badge?: string | null;
}

interface PackagesProps {
  onGetStarted: () => void;
}

const PackageCard = ({ pkg, onGetStarted }: { pkg: Package; onGetStarted: () => void }) => (
  <div className="flex h-full flex-col rounded-2xl border-2 border-white/20 bg-cust-dark-blue p-6 text-white">
    <div className="mb-6 flex flex-col items-center gap-2 text-center">
      <Wifi className="h-8 w-8 text-white" />
      {pkg.badge && (
        <Badge
          variant="secondary"
          className={
            pkg.badge === "Terlaris"
              ? "border-blue-400/30 bg-blue-500/20 text-blue-300"
              : "border-green-400/30 bg-green-500/20 text-green-300"
          }
        >
          {pkg.badge}
        </Badge>
      )}
      <h3 className="text-lg font-bold">{pkg.name}</h3>
    </div>
    <div className="mb-8 flex flex-1 flex-col items-center justify-center gap-1 text-center">
      <p className="text-4xl font-bold text-cust-orange">{pkg.quota}</p>
      <p className="text-sm text-white/70">Berlaku {pkg.validityDays} Hari</p>
      <p className="text-xl font-semibold">{formatCurrency(pkg.price)}</p>
    </div>
    <Button variant="default" className="group w-full bg-cust-red border-cust-red" onClick={onGetStarted}>
      Beli Sekarang
      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Button>
  </div>
);

const Packages = ({ onGetStarted }: PackagesProps) => {
  const { packages, loading, fetchPackages } = usePackages();

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const slides = packages
    .slice(0, 5)
    .map((pkg) => <PackageCard key={pkg.id} pkg={pkg} onGetStarted={onGetStarted} />);

  return (
    <section className="bg-cust-black px-4 py-16">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white">Paket Populer</h2>
          <p className="mt-2 text-white/60">Dipilih oleh ribuan pelanggan setiap harinya</p>
        </div>

        {!loading && slides.length > 0 ? (
          <>
            <Carousel_003
              slides={slides}
              loop={slides.length > 2}
              autoplay
              showPagination
              slideHeight={380}
              className="max-w-none!"
            />
            <div className="mt-4 text-center">
              <Button variant="outline" className="group px-10 py-5" onClick={onGetStarted}>
                Lihat Semua Paket
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </>
        ) : (
          <p className="text-center text-white">Tidak ada paket ditemukan.</p>
        )}

      </div>
    </section>
  );
};

export default Packages;