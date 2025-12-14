import axiosClient, { setAuthToken } from "./axiosClient";

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: { id?: string; username?: string; email: string; role: "admin" | "customer" };
}

export const register = async (username: string, email: string, password: string) => {
  const res = await axiosClient.post<AuthResponse>("/api/auth/register", {
    username,
    email,
    password,
  });
  if (res.data.token) setAuthToken(res.data.token);
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await axiosClient.post<AuthResponse>("/api/auth/login", {
    email,
    password,
  });
  if (res.data.token) setAuthToken(res.data.token);
  return res.data;
};

export const logout = () => {
  setAuthToken(undefined);
};

export default { register, login, logout };
