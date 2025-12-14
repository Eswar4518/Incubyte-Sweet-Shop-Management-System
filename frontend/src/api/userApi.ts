import { apiClient } from "./apiClient";

export interface User {
  _id?: string;
  id?: string;
  username: string;
  email: string;
  role: "admin" | "customer";
}

export const getAllUsers = async (): Promise<User[]> => {
  const res = await apiClient.get("/api/users");
  return res.data.users || [];
};

export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
  role: "admin" | "customer";
}) => {
  const res = await apiClient.post("/api/users", userData);
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await apiClient.delete(`/api/users/${id}`);
  return res.data;
};

export const updateUserRole = async (id: string, role: "admin" | "customer") => {
  const res = await apiClient.put(`/api/users/${id}/role`, { role });
  return res.data;
};