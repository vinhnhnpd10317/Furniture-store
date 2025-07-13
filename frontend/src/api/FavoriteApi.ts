import axios from "axios";
import type { ReactNode } from "react";

export interface FavoriteItem {
  mo_ta: ReactNode;
  gia: ReactNode;
  ten_san_pham: ReactNode;
  hinh_anh_dai_dien: any;
  id: number;
  nguoi_dung_id: number;
  san_pham_id: number;
}

export const getFavorites = async (): Promise<FavoriteItem[]> => {
  const res = await axios.get("http://localhost:3001/favorites");
  return res.data;
};

export const addFavorite = async (userId: number, productId: number) => {
  const res = await axios.post('http://localhost:3001/favorites', {
    nguoi_dung_id: userId,
    san_pham_id: productId,
  });
  return res.data;
};

// ✅ GIỮ DUY NHẤT phiên bản delete chính xác
export const deleteFavorite = async (nguoi_dung_id: number, san_pham_id: number) => {
  return await axios.delete("http://localhost:3001/favorites", {
    data: { nguoi_dung_id, san_pham_id },
  });
};

export const getFavoritesByUser = async (userId: number) => {
  const res = await axios.get(`http://localhost:3001/favorites/${userId}`);
  return res.data;
};

export const getFavoritesLatest = async() =>{
  const res = await axios.get("http://localhost:3001/favorites/fvrlatest");
  return res.data;
} 
