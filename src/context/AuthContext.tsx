/**
 * src/context/AuthContext.tsx
 * Simple AuthContext with persistence to localStorage (safe demo).
 */
import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';

export type User = { id: string; name?: string } | null;

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  login: (user?: { id: string; name?: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('influencoree_auth');
      if (raw) {
        setUser(JSON.parse(raw));
        setIsAuthenticated(true);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const login = (u?: { id: string; name?: string }) => {
    const next = u ?? { id: 'demo', name: 'Demo User' };
    setUser(next);
    setIsAuthenticated(true);
    try { localStorage.setItem('influencoree_auth', JSON.stringify(next)); } catch {}
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    try { localStorage.removeItem('influencoree_auth'); } catch {}
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider');
  return ctx;
};
