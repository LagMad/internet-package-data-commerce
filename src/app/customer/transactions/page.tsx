"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  HistoryOutlined,
  SearchOutlined,
  FileTextOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useTransactions } from "@/hooks/useTransactions";
import { useAuth } from "@/contexts/AuthContext";
import {
  formatCurrency,
  formatDateShort,
  statusLabel,
} from "@/utils/formatters";
import { Transaction, TransactionStatus } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function CustomerTransactionsPage() {
  const { user } = useAuth();
  const { transactions, loading, fetchUserTransactions } = useTransactions();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "all">(
    "all",
  );

  const handleRefresh = useCallback(() => {
    if (user) {
      fetchUserTransactions(user.id);
    }
  }, [user, fetchUserTransactions]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.packageName.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusVariant: Record<
    string,
    "default" | "secondary" | "destructive" | "outline"
  > = {
    success: "default",
    pending: "secondary",
    failed: "destructive",
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <HistoryOutlined /> Riwayat Transaksi
          </h2>
          <p className="text-white mt-1">
            Daftar semua transaksi paket data Anda
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
            className="bg-white text-cust-black hover:bg-gray-100"
          >
            <ReloadOutlined className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
          <div className="relative w-full sm:w-64">
            <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm" />
            <Input
              placeholder="Cari paket atau ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(val) => setStatusFilter(val as any)}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="pending">Menunggu</SelectItem>
              <SelectItem value="success">Berhasil</SelectItem>
              <SelectItem value="failed">Gagal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="bg-cust-black text-white">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-cust-red" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <FileTextOutlined className="text-5xl text-white/10 mb-4" />
              <p className="text-muted-foreground">
                Tidak ada riwayat transaksi yang ditemukan.
              </p>
              {(search || statusFilter !== "all") && (
                <Button
                  variant="link"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("all");
                  }}
                  className="text-cust-red mt-2"
                >
                  Reset Filter
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto px-4">
              <Table>
                <TableHeader className="bg-cust-red">
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white">ID Transaksi</TableHead>
                    <TableHead className="text-white">Paket Data</TableHead>
                    <TableHead className="text-white">No. HP</TableHead>
                    <TableHead className="text-white">Total Bayar</TableHead>
                    <TableHead className="text-white">Tanggal</TableHead>
                    <TableHead className="text-white text-center">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((trx) => (
                    <TableRow
                      key={trx.id}
                      className="border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <TableCell>
                        <code className="text-xs px-1 py-0.5 rounded">
                          {trx.id}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-white">
                          {trx.packageName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {trx.packageQuota}
                        </div>
                      </TableCell>
                      <TableCell className="/80 text-white">
                        {trx.phoneNumber}
                      </TableCell>
                      <TableCell className="font-semibold text-white">
                        {formatCurrency(trx.packagePrice)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDateShort(trx.createdAt)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className="min-w-32"
                          variant={statusVariant[trx.status] ?? "outline"}
                        >
                          {statusLabel[trx.status] ?? trx.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
