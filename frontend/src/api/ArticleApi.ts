// src/api/articleApi.ts
import axios from 'axios';

// ✅ Interface Article (dùng cho toàn bộ frontend)
export interface Article {
  id: number;
  tieu_de: string;
  noi_dung: string;
  hinh_anh: string;
  ngay_dang: string;
}

// ✅ Form mẫu để tạo mới
export const initialArticleForm: Omit<Article, 'id'> = {
  tieu_de: '',
  noi_dung: '',
  hinh_anh: '',
  ngay_dang: '',
};

const API_URL = 'http://localhost:3001/articles';

// API
export const getArticles = async (): Promise<Article[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createArticle = async (
  data: Omit<Article, 'id'> // giữ lại ngay_dang
): Promise<{ message: string; id: number }> => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateArticle = async (
  id: number,
  data: Omit<Article, 'id'>
): Promise<{ message: string }> => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteArticle = async (
  id: number
): Promise<{ message: string }> => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
