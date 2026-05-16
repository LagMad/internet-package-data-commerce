"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  WifiOutlined,
  DashboardOutlined,
  TeamOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  if (!user) return null;

  const isAdmin = user.role === "admin";

  const adminMenuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    { key: "/admin/customers", icon: <TeamOutlined />, label: "Pelanggan" },
    { key: "/admin/packages", icon: <AppstoreOutlined />, label: "Paket Data" },
    {
      key: "/admin/transactions",
      icon: <FileTextOutlined />,
      label: "Transaksi",
    },
    
    { key: "/admin/profile", icon: <UserOutlined />, label: "Profil Saya" },
  ];

  const customerMenuItems = [
    {
      key: "/customer/packages",
      icon: <ShoppingCartOutlined />,
      label: "Beli Paket",
    },
    {
      key: "/customer/transactions",
      icon: <HistoryOutlined />,
      label: "Riwayat Transaksi",
    },
    { key: "/customer/profile", icon: <UserOutlined />, label: "Profil Saya" },
  ];

  const menuItems = isAdmin ? adminMenuItems : customerMenuItems;

  const handleLogout = () => {
    logout();
    toast.success("Berhasil keluar");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col bg-cust-black transition-all duration-300 z-50",
          collapsed ? "w-16" : "w-55",
        )}
      >
        <div className="sticky top-0">
          {/* Logo */}
          <div
            className="h-16 flex items-center justify-center px-4 gap-2 cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => router.push("/")}
          >
            <WifiOutlined className="text-xl text-cust-red! shrink-0" />
            {!collapsed && (
              <span className="font-bold text-white text-base truncate">
                <span className="text-cust-red">DataPaket</span>.id
              </span>
            )}
          </div>

          {/* Nav */}
          <nav className="flex-1 pt-2 px-2 space-y-1">
            {menuItems.map((item) => {
              const active = pathname === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => router.push(item.key)}
                  className={cn(
                    "cursor-pointer w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    active
                      ? "text-cust-red font-medium"
                      : "text-cust-white hover:bg-cust-red",
                  )}
                >
                  <span className="text-base shrink-0">{item.icon}</span>
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-cust-black h-16 flex flex-row items-center justify-between px-4 sticky top-0 z-10 shadow-xl shadow-white/20">
          <Button
            variant="ghost"
            className="text-cust-red! bg-transparent! border-0! hover:brightness-80"
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>

          <div className="flex items-center gap-3">
            <Badge variant={isAdmin ? "default" : "secondary"}>
              {isAdmin ? "Admin" : "Customer"}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-black/30! pl-1 pr-3 py-1 rounded-full transition-colors">
                  <Avatar className="w-7 h-7">
                    <AvatarFallback className="bg-cust-red text-white text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm hidden sm:block text-white">
                    {user.name.split(" ")[0]}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    router.push(
                      isAdmin ? "/admin/profile" : "/customer/profile",
                    )
                  }
                >
                  <UserOutlined className="mr-2" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="group text-cust-red!"
                >
                  <LogoutOutlined className="mr-2 text-cust-red!" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 bg-cust-dark-blue overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
