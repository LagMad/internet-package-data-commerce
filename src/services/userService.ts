import apiClient from '@/lib/apiClient';
import { User } from '@/types';

export const userService = {
  getAll: async (): Promise<User[]> => {
    const res = await apiClient.get<User[]>('/users');
    return res.data;
  },

  getById: async (id: string): Promise<User> => {
    const res = await apiClient.get<User>(`/users/${id}`);
    return res.data;
  },

  create: async (payload: Omit<User, 'id'>): Promise<User> => {
    const res = await apiClient.post<User>('/users', payload);
    return res.data;
  },

  update: async (id: string, payload: Partial<User>): Promise<User> => {
    const res = await apiClient.patch<User>(`/users/${id}`, payload);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },

  login: async (email: string, password: string): Promise<User | null> => {
    const res = await apiClient.get<User[]>(`/users?email=${email}&password=${password}`);
    if (res.data.length > 0) {
      return res.data[0];
    }
    return null;
  },
};
