"use client";

import React, { useEffect, useState } from "react";
import {
  ShoppingCartOutlined,
  WifiOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { usePackages } from "@/hooks/usePackages";
import { useTransactions } from "@/hooks/useTransactions";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency, categoryLabel } from "@/utils/formatters";
import { Package, PackageCategory, PaymentMethod } from "@/types";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function CustomerPackagesPage() {
  const { user } = useAuth();
  const { packages, loading: pkgLoading, fetchPackages } = usePackages();
  const { createTransaction, loading: trxLoading } = useTransactions();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    PackageCategory | "all"
  >("all");
  const [checkoutTarget, setCheckoutTarget] = useState<Package | null>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("Transfer Bank");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || pkg.category === selectedCategory;
    return pkg.isActive && matchesSearch && matchesCategory;
  });

  const handleCheckout = async () => {
    if (!checkoutTarget || !user) return;

    if (!phoneNumber) {
      toast.error("Nomor HP wajib diisi");
      return;
    }

    const payload = {
      userId: user.id,
      packageId: checkoutTarget.id,
      packageName: checkoutTarget.name,
      packageQuota: checkoutTarget.quota,
      packagePrice: checkoutTarget.price,
      validityDays: checkoutTarget.validityDays,
      status: "pending" as const,
      paymentMethod,
      phoneNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await createTransaction(payload);
    if (result) {
      toast.success("Pesanan berhasil dibuat. Silakan selesaikan pembayaran.");
      setCheckoutTarget(null);
    } else {
      toast.error("Gagal membuat pesanan");
    }
  };

  const categoryOptions: { label: string; value: PackageCategory | "all" }[] = [
    { label: "Semua", value: "all" },
    { label: "Harian", value: "daily" },
    { label: "Bulanan", value: "monthly" },
    { label: "Unlimited", value: "unlimited" },
    { label: "Gaming", value: "gaming" },
  ];

  const CATEGORY_CLASSNAME: Record<string, string> = {
    daily: "border border-amber-400 text-amber-400 bg-transparent",
    monthly: "border border-blue-400 text-blue-400 bg-transparent",
    unlimited: "border border-purple-400 text-purple-400 bg-transparent",
    gaming: "border border-green-400 text-green-400 bg-transparent",
  };

  const CATEGORY_LABEL: Record<string, string> = {
    daily: "Harian",
    monthly: "Bulanan",
    unlimited: "Unlimited",
    gaming: "Gaming",
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left w-full">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingCartOutlined /> Beli Paket Data
          </h2>
          <p className="text-white mt-1">
            Pilih paket terbaik sesuai kebutuhanmu
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-64">
            <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm" />
            <Input
              placeholder="Cari paket..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select
            value={selectedCategory}
            onValueChange={(val) => setSelectedCategory(val as any)}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {pkgLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-cust-red" />
        </div>
      ) : filteredPackages.length === 0 ? (
        <div className="text-center py-20 bg-cust-black/20 rounded-xl border-2 border-dashed border-white/10">
          <p className="text-muted-foreground">
            Tidak ada paket yang ditemukan.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className="bg-cust-black border-cust-white/10 hover:border-cust-red/50 transition-all duration-300 group"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="relative">
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 size-8 bg-cust-red/50 rounded-full blur-sm animate-pulse" />
                    <WifiOutlined className="text-xl text-cust-red!" />
                  </div>
                  <Badge
                    className={
                      CATEGORY_CLASSNAME[pkg.category] ??
                      "border border-gray-400 text-gray-300 bg-transparent"
                    }
                  >
                    {CATEGORY_LABEL[pkg.category] ?? pkg.category}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {pkg.name}
                </h3>

                <div className="flex-1">
                  <div className="text-3xl font-bold text-cust-orange mb-1">
                    {pkg.quota}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Masa aktif {pkg.validityDays} hari
                  </p>

                  {pkg.features && pkg.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feat, i) => (
                        <li
                          key={i}
                          className="text-xs text-white/70 flex items-center gap-2"
                        >
                          <div className="w-1 h-1 rounded-full bg-cust-red" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Harga</span>
                    <span className="text-lg font-bold text-white">
                      {formatCurrency(pkg.price)}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-cust-red hover:bg-cust-red/90"
                    onClick={() => {
                      setCheckoutTarget(pkg);
                      setPhoneNumber(user?.phone || "");
                    }}
                  >
                    Beli Sekarang
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Checkout Dialog */}
      <Dialog
        open={!!checkoutTarget}
        onOpenChange={(open) => !open && setCheckoutTarget(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Konfirmasi Pembelian</DialogTitle>
            <DialogDescription>
              Anda akan membeli paket <strong>{checkoutTarget?.name}</strong>{" "}
              seharga{" "}
              <strong>{formatCurrency(checkoutTarget?.price || 0)}</strong>.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor HP Tujuan</Label>
              <Input
                id="phone"
                placeholder="08xxxxxxxxxx"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <p className="text-[10px] text-muted-foreground">
                Pastikan nomor HP yang Anda masukkan benar.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Metode Pembayaran</Label>
              <Select
                value={paymentMethod}
                onValueChange={(val) => setPaymentMethod(val as PaymentMethod)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih metode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Transfer Bank">Transfer Bank</SelectItem>
                  <SelectItem value="E-Wallet">E-Wallet</SelectItem>
                  <SelectItem value="QRIS">QRIS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-muted p-3 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paket</span>
                <span className="font-medium">{checkoutTarget?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Tagihan</span>
                <span className="font-bold text-cust-red">
                  {formatCurrency(checkoutTarget?.price || 0)}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="text-cust-black border-cust-black bg-white hover:brightness-80!"
              onClick={() => setCheckoutTarget(null)}
              disabled={trxLoading}
            >
              Batal
            </Button>
            <Button
              onClick={handleCheckout}
              disabled={trxLoading}
              className="bg-cust-red hover:bg-cust-red/90"
            >
              {trxLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Bayar Sekarang
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}