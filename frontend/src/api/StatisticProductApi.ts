import axios from "axios";

// Interface cho dữ liệu thống kê sản phẩm
export interface StatisticProduct {
  thoi_gian: string;
  tong_so_luong_ban: number;
}

// Base URL của API
const API = "http://localhost:3001/statisticproduct";

// Hàm thống kê theo loại thời gian: ngày, tuần, tháng, quý, năm
export const getStatisticByType = async (
  type: string
): Promise<StatisticProduct[]> => {
  const res = await axios.get(API, {
    params: { type }
  });
  return res.data;
};

// Hàm thống kê theo khoảng ngày cụ thể (lọc theo ngày từ - đến)
export const getStatisticByRange = async (
  from: string,
  to: string
): Promise<StatisticProduct[]> => {
  const res = await axios.get(`${API}/by-range`, {
    params: { from, to }
  });
  return res.data;
};

// Hàm thống kê sản phẩm bán chạy
export interface BestSellingProduct {
  san_pham_id: number;
  ten_san_pham: string;
  tong_ban: number;
}

export const getBestSellingProducts = async (
  type: string
): Promise<BestSellingProduct[]> => {
  const response = await axios.get(`${API}/best`, {
    params: { type }
  });
  return response.data;
};
