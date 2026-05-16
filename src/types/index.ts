export type UserRole = "admin" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  createdAt: string;
}

export type PackageCategory = "daily" | "monthly" | "unlimited" | "gaming";

export interface Package {
  id: string;
  name: string;
  quota: string;
  validityDays: number;
  price: number;
  category: PackageCategory;
  description: string;
  features: string[];
  isActive: boolean;
  badge?: string | null;
  createdAt: string;
}

export type TransactionStatus = "pending" | "success" | "failed";
export type PaymentMethod = "Transfer Bank" | "E-Wallet" | "QRIS";

export interface Transaction {
  id: string;
  userId: string;
  packageId: string;
  packageName: string;
  packageQuota: string;
  packagePrice: number;
  validityDays: number;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionPayload {
  userId: string;
  packageId: string;
  packageName: string;
  packageQuota: string;
  packagePrice: number;
  validityDays: number;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
