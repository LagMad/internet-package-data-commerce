import apiClient from '@/lib/apiClient';
import { Transaction, CreateTransactionPayload } from '@/types';

export const transactionService = {
  getAll: async (): Promise<Transaction[]> => {
    const res = await apiClient.get<Transaction[]>('/transactions?_sort=createdAt&_order=desc');
    return res.data;
  },

  getById: async (id: string): Promise<Transaction> => {
    const res = await apiClient.get<Transaction>(`/transactions/${id}`);
    return res.data;
  },

  getByUserId: async (userId: string): Promise<Transaction[]> => {
    const res = await apiClient.get<Transaction[]>(
      `/transactions?userId=${userId}&_sort=createdAt&_order=desc`
    );
    return res.data;
  },

  create: async (payload: CreateTransactionPayload): Promise<Transaction> => {
    const id = `TRX${Date.now()}`;
    const res = await apiClient.post<Transaction>('/transactions', { id, ...payload });
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
