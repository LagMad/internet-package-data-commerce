"use client";

import React, { useState } from "react";
import { UserOutlined, SaveOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import { useUsers } from "@/hooks/useUsers";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
}

interface PasswordFormValues {
  currentPassword?: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const { updateUser, loading } = useUsers();
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const {
    register: regProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const {
    register: regPass,
    handleSubmit: handlePassSubmit,
    reset: resetPass,
    watch: watchPass,
    formState: { errors: passErrors },
  } = useForm<PasswordFormValues>();

  const onUpdateProfile = async (values: ProfileFormValues) => {
    if (!user) return;
    const ok = await updateUser(user.id, values);
    if (ok) {
      toast.success("Profil berhasil diperbarui");
    } else {
      toast.error("Gagal memperbarui profil");
    }
  };

  const onUpdatePassword = async (values: PasswordFormValues) => {
    if (!user) return;
    const ok = await updateUser(user.id, { password: values.newPassword });
    if (ok) {
      toast.success("Password berhasil diperbarui");
      resetPass();
      setIsChangingPassword(false);
    } else {
      toast.error("Gagal memperbarui password");
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col h-full w-full">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
        <UserOutlined /> Profil Saya
      </h2>

      <div className="flex flex-row gap-10 w-full">
        {/* Basic Info */}
        <Card className="bg-cust-black w-1/2">
          <CardHeader>
            <CardTitle className="text-lg text-white font-bold">
              Informasi Dasar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleProfileSubmit(onUpdateProfile)}
              className="space-y-4"
            >
              <div className="space-y-1">
                <Label htmlFor="email" className="text-white">
                  Email (Tidak dapat diubah)
                </Label>
                <Input
                  id="email"
                  {...regProfile("email")}
                  disabled
                  className="bg-white/5 border-white/5"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="name" className="text-white">
                  Nama Lengkap
                </Label>
                <Input
                  id="name"
                  {...regProfile("name", { required: "Nama wajib diisi" })}
                  placeholder="Nama Anda"
                />
                {profileErrors.name && (
                  <p className="text-xs text-destructive">
                    {profileErrors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone" className="text-white">
                  No. HP
                </Label>
                <Input
                  id="phone"
                  {...regProfile("phone", { required: "No. HP wajib diisi" })}
                  placeholder="08xxxxxxxxxx"
                />
                {profileErrors.phone && (
                  <p className="text-xs text-destructive">
                    {profileErrors.phone.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-cust-red hover:bg-cust-red/90"
                >
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  <SaveOutlined className="mr-2" /> Simpan Perubahan
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Password */}
        <Card className="bg-cust-black w-1/2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg text-white font-bold">
              Keamanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isChangingPassword ? (
              <form
                onSubmit={handlePassSubmit(onUpdatePassword)}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <Label htmlFor="newPassword" className="text-white">
                    Password Baru
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    {...regPass("newPassword", {
                      required: "Password baru wajib diisi",
                      minLength: { value: 6, message: "Minimal 6 karakter" },
                    })}
                    placeholder="Minimal 6 karakter"
                  />
                  {passErrors.newPassword && (
                    <p className="text-xs text-destructive">
                      {passErrors.newPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="confirmPassword" className="text-white">
                    Konfirmasi Password Baru
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...regPass("confirmPassword", {
                      required: "Konfirmasi password wajib diisi",
                      validate: (val) =>
                        val === watchPass("newPassword") ||
                        "Password tidak cocok",
                    })}
                    placeholder="Ulangi password baru"
                  />
                  {passErrors.confirmPassword && (
                    <p className="text-xs text-destructive">
                      {passErrors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-cust-red hover:bg-cust-red/90"
                  >
                    {loading && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    Update Password
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="text-white border-white"
                    onClick={() => setIsChangingPassword(false)}
                    disabled={loading}
                  >
                    Batal
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-white">
                  Disarankan untuk memperbarui password secara berkala untuk
                  menjaga keamanan akun Anda.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsChangingPassword(true)}
                  className="text-cust-red hover:text-white  bg-cust-red/10 hover:bg-cust-red"
                >
                  <LockOutlined className="mr-1" /> Ubah Password
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
