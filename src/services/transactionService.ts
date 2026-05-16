import apiClient from '@/lib/apiClient';
import { Transaction, CreateTransactionPayload } from '@/types';

export const transactionService = {
  getAll: async (): Promise<Transaction[]> => {
    const res = await apiClient.get<Transaction[]>('/transactions');
    return res.data;
  },

  getById: async (id: string): Promise<Transaction> => {
    const res = await apiClient.get<Transaction>(`/transactions/${id}`);
    return res.data;
  },

  getByUserId: async (userId: string): Promise<Transaction[]> => {
    // Fetch all and filter client-side for maximum reliability with json-server
    const res = await apiClient.get<Transaction[]>('/transactions');
    return res.data.filter(t => String(t.userId) === String(userId));
  },

  create: async (payload: CreateTransactionPayload): Promise<Transaction> => {
    // Generate a unique ID if not present
    const id = `TRX${Date.now()}`;
    const res = await apiClient.post<Transaction>('/transactions', { ...payload, id });
    return res.data;
  },

  update: async (id: string, payload: Partial<Transaction>): Promise<Transaction> => {
    const res = await apiClient.patch<Transaction>(`/transactions/${id}`, {
      ...payload,
      updatedAt: new Date().toISOString(),
    });
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/transactions/${id}`);
  },
};
