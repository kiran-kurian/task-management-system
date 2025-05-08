"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ENDPOINTS } from '@/config';

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    
    if (token && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const authResponse = await fetch(ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!authResponse.ok) {
        throw new Error("Authentication failed");
      }

      const authData = await authResponse.json();
      const token = authData.access_token;
      
      if (!token) {
        throw new Error("No token received");
      }

      localStorage.setItem("token", token);

      const roleResponse = await fetch(ENDPOINTS.AUTH.ROLE, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!roleResponse.ok) {
        throw new Error("Failed to get user role");
      }

      const roleData = await roleResponse.json();
      const userRole = roleData.role;

      localStorage.setItem("role", userRole);
      setIsAuthenticated(true);
      setRole(userRole);

      if (userRole === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (userRole === "MANAGER") {
        router.push("/manager/dashboard");
      } else if (userRole === "USER") {
        router.push("/user/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 