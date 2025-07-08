// api/Comment.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001/comments';

export interface BinhLuan {
  id: number;
  noi_dung: string;
  ngay_binh_luan: string;
  ten_nguoi_dung: string;  // ✅ Tên người dùng
  ten_san_pham: string;    // ✅ Tên sản phẩm
  san_pham_anh: string;    // ✅ Tên file ảnh
}

export const fetchComments = async (): Promise<BinhLuan[]> => {
  try {
    const response = await axios.get<BinhLuan[]>(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Lỗi khi tải bình luận");
  }
};

export const deleteComment = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error(`Lỗi khi xóa bình luận với ID ${id}`);
  }
};
