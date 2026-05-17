"use client";

import React, { useEffect, useState } from "react";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { usePackages } from "@/hooks/usePackages";
import { formatCurrency } from "@/utils/formatters";
import { Package, PackageCategory } from "@/types";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

const CATEGORY_OPTIONS: { label: string; value: PackageCategory }[] = [
  { label: "Harian", value: "daily" },
  { label: "Bulanan", value: "monthly" },
  { label: "Unlimited", value: "unlimited" },
  { label: "Gaming", value: "gaming" },
];

const CATEGORY_VARIANT: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  daily: "outline",
  monthly: "default",
  unlimited: "secondary",
  gaming: "destructive",
};

type PackageFormValues = {
  name: string;
  quota: string;
  validityDays: number;
  price: number;
  category: PackageCategory;
  description: string;
  isActive: boolean;
};

export default function AdminPackagesPage() {
  const {
    packages,
    loading,
    fetchPackages,
    createPackage,
    updatePackage,
    deletePackage,
  } = usePackages();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Package | null>(null);
  const [search, setSearch] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<PackageFormValues>({
    defaultValues: { isActive: true, category: "monthly" },
  });

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const filtered = packages.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const openCreate = () => {
    setEditTarget(null);
    reset({
      isActive: true,
      category: "monthly",
      name: "",
      quota: "",
      validityDays: 30,
      price: 0,
      description: "",
    });
    setModalOpen(true);
  };

  const openEdit = (pkg: Package) => {
    setEditTarget(pkg);
    reset({
      name: pkg.name,
      quota: pkg.quota,
      validityDays: pkg.validityDays,
      price: pkg.price,
      category: pkg.category,
      description: pkg.description,
      isActive: pkg.isActive,
    });
    setModalOpen(true);
  };

  const handleFormSubmit = async (values: PackageFormValues) => {
    const payload = {
      ...values,
      validityDays: Number(values.validityDays),
      price: Number(values.price),
      features: editTarget?.features || [],
      createdAt: editTarget?.createdAt || new Date().toISOString(),
    };

    if (editTarget) {
      const ok = await updatePackage(editTarget.id, payload);
      if (ok) {
        toast.success("Paket berhasil diperbarui");
        setModalOpen(false);
      } else toast.error("Gagal memperbarui paket");
    } else {
      const ok = await createPackage(payload);
      if (ok) {
        toast.success("Paket berhasil ditambahkan");
        setModalOpen(false);
      } else toast.error("Gagal menambahkan paket");
    }
  };

  const handleDelete = async (id: string) => {
    const ok = await deletePackage(id);
    if (ok) toast.success("Paket berhasil dihapus");
    else toast.error("Gagal menghapus paket");
  };

  const handleToggleActive = async (pkg: Package) => {
    const ok = await updatePackage(pkg.id, { isActive: !pkg.isActive });
    if (ok)
      toast.success(`Paket ${!pkg.isActive ? "diaktifkan" : "dinonaktifkan"}`);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row gap-5 items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white text-center lg:text-left">
          Manajemen Paket Data
        </h2>
        <Button onClick={openCreate} size="sm" className="py-5 px-10!">
          <PlusOutlined className="mr-1" /> Tambah Paket
        </Button>
      </div>

      <Card className="bg-cust-black text-white">
        <CardContent className="">
          {/* Search */}
          <div className="mb-4 relative max-w-sm">
            <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-black! text-sm" />
            <Input
              placeholder="Cari nama paket..."
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
                <TableHeader className="bg-cust-red!">
                  <TableRow>
                    <TableHead className="text-white!">Nama Paket</TableHead>
                    <TableHead className="text-white!">Kuota</TableHead>
                    <TableHead className="text-white!">Masa Aktif</TableHead>
                    <TableHead className="text-white!">Harga</TableHead>
                    <TableHead className="text-white!">Kategori</TableHead>
                    <TableHead className="text-white!">Aktif</TableHead>
                    <TableHead className="text-white!">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center text-muted-foreground py-10"
                      >
                        Tidak ada data paket
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell className="font-medium">
                          {pkg.name}
                        </TableCell>
                        <TableCell>{pkg.quota}</TableCell>
                        <TableCell>{pkg.validityDays} hari</TableCell>
                        <TableCell>{formatCurrency(pkg.price)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              CATEGORY_VARIANT[pkg.category] ?? "outline"
                            }
                          >
                            {CATEGORY_OPTIONS.find(
                              (c) => c.value === pkg.category,
                            )?.label ?? pkg.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={pkg.isActive}
                            onCheckedChange={() => handleToggleActive(pkg)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              className="border-white text-white"
                              size="sm"
                              onClick={() => openEdit(pkg)}
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
                                  <AlertDialogTitle>
                                    Hapus paket ini?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Data yang dihapus tidak bisa dikembalikan.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(pkg.id)}
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
      <Dialog
        open={modalOpen}
        onOpenChange={(open) => {
          if (!open) setModalOpen(false);
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editTarget ? "Edit Paket Data" : "Tambah Paket Data Baru"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-4 mt-2"
          >
            {/* Nama */}
            <div className="space-y-1">
              <Label htmlFor="name">Nama Paket</Label>
              <Input
                id="name"
                placeholder="cth: Standard 10GB"
                {...register("name", { required: "Nama wajib diisi" })}
              />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Kuota + Masa Aktif */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="quota">Kuota</Label>
                <Input
                  id="quota"
                  placeholder="cth: 10 GB"
                  {...register("quota", { required: "Kuota wajib diisi" })}
                />
                {errors.quota && (
                  <p className="text-xs text-destructive">
                    {errors.quota.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="validityDays">Masa Aktif (hari)</Label>
                <Input
                  id="validityDays"
                  type="number"
                  min={1}
                  placeholder="30"
                  {...register("validityDays", {
                    required: "Wajib diisi",
                    min: { value: 1, message: "Min 1 hari" },
                  })}
                />
                {errors.validityDays && (
                  <p className="text-xs text-destructive">
                    {errors.validityDays.message}
                  </p>
                )}
              </div>
            </div>

            {/* Harga + Kategori */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="price">Harga (Rp)</Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  placeholder="85000"
                  {...register("price", {
                    required: "Harga wajib diisi",
                    min: { value: 0, message: "Min 0" },
                  })}
                />
                {errors.price && (
                  <p className="text-xs text-destructive">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label>Kategori</Label>
                <Controller
                  control={control}
                  name="category"
                  rules={{ required: "Kategori wajib dipilih" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORY_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-xs text-destructive">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            {/* Deskripsi */}
            <div className="space-y-1">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                rows={3}
                placeholder="Deskripsi singkat paket..."
                {...register("description")}
              />
            </div>

            {/* Status Aktif */}
            <div className="flex items-center gap-3">
              <Controller
                control={control}
                name="isActive"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label>Status Aktif</Label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="text-black! border-black!"
                onClick={() => setModalOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editTarget ? "Simpan Perubahan" : "Tambahkan"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}