import apiClient from '@/lib/apiClient';
import { Package } from '@/types';

export const packageService = {
  getAll: async (): Promise<Package[]> => {
    const res = await apiClient.get<Package[]>('/packages');
    return res.data;
  },

  getById: async (id: string): Promise<Package> => {
    const res = await apiClient.get<Package>(`/packages/${id}`);
    return res.data;
  },

  getByCategory: async (category: string): Promise<Package[]> => {
    const res = await apiClient.get<Package[]>(`/packages?category=${category}`);
    return res.data;
  },

  create: async (payload: Omit<Package, 'id'>): Promise<Package> => {
    const res = await apiClient.post<Package>('/packages', payload);
    return res.data;
  },

  update: async (id: string, payload: Partial<Package>): Promise<Package> => {
    const res = await apiClient.patch<Package>(`/packages/${id}`, payload);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/packages/${id}`);
  },
};
