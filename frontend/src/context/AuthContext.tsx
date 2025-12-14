import React, { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/authApi";
import { setAuthToken } from "../api/axiosClient";

// Types
export interface AuthUser {
  id?: string;
  username?: string;
  email: string;
  role: "admin" | "customer";
}

interface AuthContextType {
  user?: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "sweetshop_token";
const USER_KEY = "sweetshop_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize from localStorage if available
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userJson = localStorage.getItem(USER_KEY);
    if (token) {
      setAuthToken(token);
      if (userJson) {
        try {
          const parsed = JSON.parse(userJson) as AuthUser;
          setUser(parsed);
        } catch (err) {
          // If parsing fails, clear stored values
          localStorage.removeItem(USER_KEY);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await authApi.login(email, password);
      if (res.token && res.user) {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        setAuthToken(res.token);
        setUser(res.user);
      } else {
        // Login succeeded but missing token or user which is unexpected
        throw new Error(res.message || "Login failed");
      }
    } catch (err) {
      // Re-throw to allow UI to read error message
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await authApi.register(username, email, password);
      if (res.token && res.user) {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        setAuthToken(res.token);
        setUser(res.user);
      } else {
        throw new Error(res.message || "Registration failed");
      }
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setAuthToken(undefined);
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user: user ?? null,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};

export default AuthContext;
