export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

export function formatDateShort(dateString: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
}

export function generateTransactionId(): string {
  return `TRX${Date.now()}`;
}

export const categoryLabel: Record<string, string> = {
  daily: 'Harian',
  monthly: 'Bulanan',
  unlimited: 'Unlimited',
  gaming: 'Gaming',
};

export const statusColor: Record<string, string> = {
  success: 'success',
  pending: 'warning',
  failed: 'error',
};

export const statusLabel: Record<string, string> = {
  success: 'Berhasil',
  pending: 'Menunggu',
  failed: 'Gagal',
};
