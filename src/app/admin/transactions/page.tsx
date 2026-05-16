'use client';

import React, { useEffect, useState } from 'react';
import { SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTransactions } from '@/hooks/useTransactions';
import { formatCurrency, formatDate, statusLabel } from '@/utils/formatters';
import { Transaction, TransactionStatus } from '@/types';
import toast from 'react-hot-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

export default function AdminTransactionsPage() {
  const {
    transactions,
    loading,
    fetchAllTransactions,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();
  const [search, setSearch] = useState('');
  const [editTarget, setEditTarget] = useState<Transaction | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchAllTransactions();
  }, [fetchAllTransactions]);

  const filtered = transactions.filter(
    (t) =>
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.phoneNumber.includes(search) ||
      t.packageName.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateStatus = async (status: TransactionStatus) => {
    if (!editTarget) return;
    setUpdating(true);
    const ok = await updateTransaction(editTarget.id, { status });
    setUpdating(false);
    if (ok) {
      toast.success('Status transaksi berhasil diperbarui');
      setModalOpen(false);
    } else {
      toast.error('Gagal memperbarui status');
    }
  };

  const handleDelete = async (id: string) => {
    const ok = await deleteTransaction(id);
    if (ok) toast.success('Transaksi berhasil dihapus');
    else toast.error('Gagal menghapus transaksi');
  };

  const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    success: 'default',
    pending: 'secondary',
    failed: 'destructive',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Manajemen Transaksi</h2>
      </div>

      <Card>
        <CardContent className="">
          <div className="mb-4 relative max-w-sm">
            <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm" />
            <Input
              placeholder="Cari ID, No. HP, atau Paket..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Transaksi</TableHead>
                    <TableHead>No. HP</TableHead>
                    <TableHead>Paket</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Metode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground py-10">
                        Tidak ada data transaksi
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((trx) => (
                      <TableRow key={trx.id}>
                        <TableCell>
                          <code className="text-xs bg-muted px-1 py-0.5 rounded">{trx.id}</code>
                        </TableCell>
                        <TableCell>{trx.phoneNumber}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{trx.packageName}</p>
                            <p className="text-xs text-muted-foreground">{trx.packageQuota}</p>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(trx.packagePrice)}</TableCell>
                        <TableCell>{trx.paymentMethod}</TableCell>
                        <TableCell>
                          <Badge variant={statusVariant[trx.status] ?? 'outline'}>
                            {statusLabel[trx.status] ?? trx.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs whitespace-nowrap">
                          {formatDate(trx.createdAt)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditTarget(trx);
                                setModalOpen(true);
                              }}
                            >
                              <EditOutlined className="mr-1" /> Status
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <DeleteOutlined />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Hapus transaksi?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tindakan ini tidak bisa dibatalkan.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(trx.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Hapus
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status Transaksi</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>ID Transaksi</Label>
              <Input value={editTarget?.id} disabled />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={editTarget?.status}
                onValueChange={(val) => handleUpdateStatus(val as TransactionStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Menunggu (Pending)</SelectItem>
                  <SelectItem value="success">Berhasil (Success)</SelectItem>
                  <SelectItem value="failed">Gagal (Failed)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {updating && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
