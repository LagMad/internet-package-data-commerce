'use client';

import { useState, useCallback } from 'react';
import { userService } from '@/services/userService';
import { User } from '@/types';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError('Gagal memuat data pengguna');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (payload: Omit<User, 'id'>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await userService.create(payload);
      setUsers((prev) => [...prev, newUser]);
      return true;
    } catch (err) {
      setError('Gagal membuat pengguna baru');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (id: string, payload: Partial<User>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updated = await userService.update(id, payload);
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
      return true;
    } catch (err) {
      setError('Gagal memperbarui pengguna');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await userService.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      return true;
    } catch (err) {
      setError('Gagal menghapus pengguna');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { users, loading, error, fetchUsers, createUser, updateUser, deleteUser };
}
