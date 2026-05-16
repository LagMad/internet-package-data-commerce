'use client';

import { useState, useCallback } from 'react';
import { transactionService } from '@/services/transactionService';
import { Transaction, CreateTransactionPayload } from '@/types';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (err) {
      setError('Gagal memuat data transaksi');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserTransactions = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionService.getByUserId(userId);
      
      // Sort by date descending (newest first) client-side
      const sortedData = [...data].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
        
      setTransactions(sortedData);
    } catch (err) {
      setError('Gagal memuat riwayat transaksi');
      console.error('Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTransaction = useCallback(
    async (payload: CreateTransactionPayload): Promise<Transaction | null> => {
      setLoading(true);
      setError(null);
      try {
        const newTrx = await transactionService.create(payload);
        setTransactions((prev) => [newTrx, ...prev]);
        return newTrx;
      } catch (err) {
        setError('Gagal membuat transaksi');
        console.error(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateTransaction = useCallback(
    async (id: string, payload: Partial<Transaction>): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const updated = await transactionService.update(id, payload);
        setTransactions((prev) => prev.map((t) => (t.id === id ? updated : t)));
        return true;
      } catch (err) {
        setError('Gagal memperbarui transaksi');
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteTransaction = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await transactionService.delete(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      return true;
    } catch (err) {
      setError('Gagal menghapus transaksi');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    transactions,
    loading,
    error,
    fetchAllTransactions,
    fetchUserTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
