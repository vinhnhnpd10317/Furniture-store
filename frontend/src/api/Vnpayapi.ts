// src/api/vnpayapi.ts
import axios from "axios";

const API_URL = "http://localhost:3001/vnpay"; // Backend route prefix

// Tạo URL thanh toán VNPay
export const createVNPayPayment = async (orderId: string, amount: number, bankCode?: string) => {
  try {
    const res = await axios.post(`${API_URL}/create_payment`, {
      orderId,
      amount,
      bankCode,
    });
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi khi tạo thanh toán VNPay:", error);
    throw error;
  }
};

// Xử lý callback từ VNPay (trường hợp frontend muốn gọi xác thực thêm)
export const handleVNPayCallback = async (params: Record<string, any>) => {
  try {
    const res = await axios.get(`${API_URL}/api/payment/callback-vnpay`, {
      params,
    });
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi khi xử lý callback VNPay:", error);
    throw error;
  }
};
