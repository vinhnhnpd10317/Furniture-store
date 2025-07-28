import axios from "axios";

const API_URL = "http://localhost:3001";

export const getOrderDetailById = async (id: number) => {
  try {
    const res = await axios.get(`${API_URL}/orderdetails/detail/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi khi gọi API chi tiết đơn hàng:", err);
    throw err;
  }
};
