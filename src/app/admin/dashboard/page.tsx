'use client';

import React, { useEffect } from 'react';
import {
  TeamOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { useUsers } from '@/hooks/useUsers';
import { usePackages } from '@/hooks/usePackages';
import { useTransactions } from '@/hooks/useTransactions';
import { formatCurrency, formatDateShort, statusColor, statusLabel } from '@/utils/formatters';
import { Transaction } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2 } from 'lucide-react';

export default function AdminDashboardPage() {
  const { users, loading: usersLoading, fetchUsers } = useUsers();
  const { packages, loading: pkgLoading, fetchPackages } = usePackages();
  const { transactions, loading: trxLoading, fetchAllTransactions } = useTransactions();

  useEffect(() => {
    fetchUsers();
    fetchPackages();
    fetchAllTransactions();
  }, [fetchUsers, fetchPackages, fetchAllTransactions]);

  const isLoading = usersLoading || pkgLoading || trxLoading;

  const totalRevenue = transactions
    .filter((t) => t.status === 'success')
    .reduce((sum, t) => sum + t.packagePrice, 0);

  const recentTransactions = transactions.slice(0, 5);

  const stats = [
    {
      title: 'Total Pelanggan',
      value: users.filter((u) => u.role === 'customer').length,
      icon: <TeamOutlined className="text-blue-500 text-xl" />,
    },
    {
      title: 'Paket Tersedia',
      value: packages.filter((p) => p.isActive).length,
      icon: <AppstoreOutlined className="text-green-500 text-xl" />,
    },
    {
      title: 'Total Transaksi',
      value: transactions.length,
      icon: <FileTextOutlined className="text-orange-500 text-xl" />,
    },
    {
      title: 'Pendapatan (Sukses)',
      value: formatCurrency(totalRevenue),
      icon: <RiseOutlined className="text-purple-500 text-xl" />,
    },
  ];

  // Map statusColor (antd color strings) to shadcn Badge variants
  const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    success: 'default',
    pending: 'secondary',
    failed: 'destructive',
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-white">Dashboard Admin</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title} className='bg-cust-black'>
            <CardContent className="">
              <div className="flex items-center justify-between text-white">
                <div className=''>
                  <p className="text-sm text-cust-red">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card className='bg-cust-black text-white'>
        <CardHeader>
          <CardTitle className="text-base">Transaksi Terbaru</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader className='bg-cust-red text-white'>
              <TableRow>
                <TableHead className='text-white'>ID Transaksi</TableHead>
                <TableHead className='text-white'>Paket</TableHead>
                <TableHead className='text-white'>Harga</TableHead>
                <TableHead className='text-white'>Tanggal</TableHead>
                <TableHead className='text-white'>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    Belum ada transaksi
                  </TableCell>
                </TableRow>
              ) : (
                recentTransactions.map((trx: Transaction) => (
                  <TableRow key={trx.id}>
                    <TableCell>
                      <code className="text-xs px-1 py-0.5 rounded">{trx.id}</code>
                    </TableCell>
                    <TableCell>{trx.packageName}</TableCell>
                    <TableCell>{formatCurrency(trx.packagePrice)}</TableCell>
                    <TableCell>{formatDateShort(trx.createdAt)}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[trx.status] ?? 'outline'}>
                        {statusLabel[trx.status] ?? trx.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}