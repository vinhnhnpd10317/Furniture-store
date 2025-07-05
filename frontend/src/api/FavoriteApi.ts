import axios from "axios";

export interface FavoriteItem {
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

export const deleteFavorite = async (id: number) => {
  const res = await axios.delete(`http://localhost:3001/favorites/${id}`);
  return res.data;
};

export const getFavoritesByUser = async (userId: number) => {
  const res = await axios.get(`http://localhost:3001/favorites/${userId}`);
  return res.data;
};
