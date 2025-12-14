import { apiClient } from "./apiClient";

export interface Sweet {
  _id?: string;
  id?: string;
  name: string;
  category?: string;
  price: number;
  quantity: number;
  description?: string;
  image?: string;
}

export const getAllSweets = async (): Promise<Sweet[]> => {
  const res = await apiClient.get("/api/sweets");
  return res.data.sweets || [];
};

export const searchSweets = async (
  name?: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number
): Promise<Sweet[]> => {
  const params: any = {};
  if (name) params.name = name;
  if (category) params.category = category;
  if (minPrice !== undefined) params.minPrice = minPrice;
  if (maxPrice !== undefined) params.maxPrice = maxPrice;

  const res = await apiClient.get("/api/sweets/search", { params });
  return res.data.sweets || [];
};

export const purchaseSweet = async (id: string) => {
  const res = await apiClient.post(`/api/sweets/${id}/purchase`);
  return res.data;
};

export const createSweet = async (payload: Partial<Sweet>) => {
  const res = await apiClient.post("/api/sweets", payload);
  return res.data;
};

export const updateSweet = async (id: string, payload: Partial<Sweet>) => {
  const res = await apiClient.put(`/api/sweets/${id}`, payload);
  return res.data;
};

export const restockSweet = async (id: string, quantity: number) => {
  const res = await apiClient.post(`/api/sweets/${id}/restock`, { quantity });
  return res.data;
};

export const deleteSweet = async (id: string) => {
  const res = await apiClient.delete(`/api/sweets/${id}`);
  return res.data;
};

export default {
  getAllSweets,
  searchSweets,
  purchaseSweet,
  createSweet,
  updateSweet,
  restockSweet,
  deleteSweet,
};
