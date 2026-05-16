"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MailOutlined, LockOutlined, WifiOutlined } from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const handleLogin = async (values: LoginFormValues) => {
    setError(null);
    const result = await login(values.email, values.password);
    if (result.success) {
      toast.success("Login berhasil! Selamat datang.");
      const stored = sessionStorage.getItem("datapaket_user");
      if (stored) {
        const u = JSON.parse(stored);
        router.push(u.role === "admin" ? "/admin/dashboard" : "/customer/packages");
      }
    } else {
      setError(result.message);
    }
  };

  const fillDemo = (role: "admin" | "customer") => {
    if (role === "admin") {
      setValue("email", "admin@datapaket.id");
      setValue("password", "admin123");
    } else {
      setValue("email", "budi@gmail.com");
      setValue("password", "budi123");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cust-dark-blue from-60% to-cust-red to-100% flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-3">
            <div className="absolute -inset-2 rounded-full bg-cust-yellow opacity-20 blur-md animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-cust-yellow opacity-30 animate-ping" />
            <div className="relative bg-cust-yellow inline-flex items-center justify-center w-14 h-14 rounded-full">
              <WifiOutlined className="text-2xl text-cust-red!" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-0">
            <span className="text-cust-red">DataPaket</span>.id
          </h2>
          <p className="text-white/80 font-semibold text-sm">Masuk ke akun Anda</p>
        </div>

        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-8">

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <MailOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    autoComplete="email"
                    className="pl-9"
                    {...register("email", {
                      required: "Email wajib diisi",
                      pattern: { value: /\S+@\S+\.\S+/, message: "Format email tidak valid" },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <LockOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    className="pl-9 pr-9"
                    {...register("password", { required: "Password wajib diisi" })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-all duration-300 ease-in-out"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-cust-red border-cust-red w-full py-5"
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
            </form>

            <div className="relative my-4">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-400">
                Demo Akun
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => fillDemo("admin")}
                className="text-xs text-blue-600! border-blue-300!"
              >
                👤 Isi sebagai Admin
              </Button>
              <Button
                variant="outline"
                onClick={() => fillDemo("customer")}
                className="text-xs text-green-600! border-green-300!"
              >
                🛒 Isi sebagai Customer
              </Button>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-500 space-y-1">
              <p className="font-medium text-gray-600">Demo Credentials:</p>
              <p>Admin: admin@datapaket.id / admin123</p>
              <p>Customer: budi@gmail.com / budi123</p>
            </div>

          </CardContent>
        </Card>

        <div className="text-center mt-4">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="hover:brightness-80!"
          >
            ← Kembali ke Beranda
          </Button>
        </div>
      </div>
    </div>
  );
}