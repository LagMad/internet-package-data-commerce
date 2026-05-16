'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, AuthContextType } from '@/types';
import { userService } from '@/services/userService';

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_KEY = 'datapaket_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
      setIsLoading(true);
      try {
        const found = await userService.login(email, password);
        if (found) {
          setUser(found);
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(found));
          return { success: true, message: 'Login berhasil' };
        }
        return { success: false, message: 'Email atau password salah' };
      } catch {
        return { success: false, message: 'Terjadi kesalahan. Coba lagi.' };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
