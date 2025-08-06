// src/api/StatisticSum.ts
import axios from "axios";

// Interface dữ liệu trả về từ backend
export interface StatisticSummary {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
}

// Hàm gọi API lấy tổng số liệu
export async function getStatisticSummary(): Promise<StatisticSummary> {
  const response = await axios.get("http://localhost:3001/statisticsum");
  return response.data;
}
