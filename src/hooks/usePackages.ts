'use client';

import { useState, useCallback } from 'react';
import { packageService } from '@/services/packageService';
import { Package } from '@/types';

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await packageService.getAll();
      setPackages(data);
    } catch (err) {
      setError('Gagal memuat paket data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPackage = useCallback(async (payload: Omit<Package, 'id'>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const newPkg = await packageService.create(payload);
      setPackages((prev) => [...prev, newPkg]);
      return true;
    } catch (err) {
      setError('Gagal membuat paket baru');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePackage = useCallback(
    async (id: string, payload: Partial<Package>): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const updated = await packageService.update(id, payload);
        setPackages((prev) => prev.map((p) => (p.id === id ? updated : p)));
        return true;
      } catch (err) {
        setError('Gagal memperbarui paket');
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deletePackage = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await packageService.delete(id);
      setPackages((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (err) {
      setError('Gagal menghapus paket');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { packages, loading, error, fetchPackages, createPackage, updatePackage, deletePackage };
}
