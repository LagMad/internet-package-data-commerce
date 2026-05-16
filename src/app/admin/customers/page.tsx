'use client';

import React, { useEffect, useState } from 'react';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useUsers } from '@/hooks/useUsers';
import { formatDate } from '@/utils/formatters';
import { User, UserRole } from '@/types';
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
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface UserFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

export default function AdminCustomersPage() {
  const { users, loading, fetchUsers, createUser, updateUser, deleteUser } = useUsers();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<User | null>(null);
  const [search, setSearch] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } =
    useForm<UserFormValues>();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const customers = users.filter(
    (u) =>
      u.role === 'customer' &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const openCreate = () => {
    setEditTarget(null);
    reset();
    setModalOpen(true);
  };

  const openEdit = (user: User) => {
    setEditTarget(user);
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('phone', user.phone);
    setValue('password', user.password);
    setValue('role', user.role);
    setModalOpen(true);
  };

  const handleFormSubmit = async (values: UserFormValues) => {
    if (editTarget) {
      const ok = await updateUser(editTarget.id, values);
      if (ok) { toast.success('Pelanggan berhasil diperbarui'); setModalOpen(false); }
      else toast.error('Gagal memperbarui pelanggan');
    } else {
      const ok = await createUser({ ...values, role: 'customer', createdAt: new Date().toISOString() });
      if (ok) { toast.success('Pelanggan berhasil ditambahkan'); setModalOpen(false); }
      else toast.error('Gagal menambahkan pelanggan');
    }
  };

  const handleDelete = async (id: string) => {
    const ok = await deleteUser(id);
    if (ok) toast.success('Pelanggan berhasil dihapus');
    else toast.error('Gagal menghapus pelanggan');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Manajemen Pelanggan</h2>
        <Button onClick={openCreate} size="sm" className="py-5 px-10!">
          <PlusOutlined className="mr-1" /> Tambah Pelanggan
        </Button>
      </div>

      <Card>
        <CardContent className="">
          {/* Search */}
          <div className="mb-4 relative max-w-sm">
            <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm" />
            <Input
              placeholder="Cari nama atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>No. HP</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Bergabung</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                        Tidak ada data pelanggan
                      </TableCell>
                    </TableRow>
                  ) : (
                    customers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role === 'admin' ? 'Admin' : 'Customer'}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEdit(user)}
                            >
                              <EditOutlined className="mr-1" /> Edit
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <DeleteOutlined className="mr-1" /> Hapus
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Hapus pelanggan?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Data yang dihapus tidak bisa dikembalikan.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(user.id)}
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

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={(open) => { if (!open) setModalOpen(false); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editTarget ? 'Edit Pelanggan' : 'Tambah Pelanggan Baru'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mt-2">
            <div className="space-y-1">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                placeholder="Nama lengkap"
                {...register('name', { required: 'Nama wajib diisi' })}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                {...register('email', {
                  required: 'Email wajib diisi',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Format email tidak valid' },
                })}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone">No. HP</Label>
              <Input
                id="phone"
                placeholder="08xxxxxxxxxx"
                {...register('phone', { required: 'No. HP wajib diisi' })}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 6 karakter"
                  className="pr-16"
                  {...register('password', {
                    required: 'Password wajib diisi',
                    minLength: { value: 6, message: 'Minimal 6 karakter' },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? 'Sembunyikan' : 'Tampilkan'}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editTarget ? 'Simpan Perubahan' : 'Tambahkan'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}