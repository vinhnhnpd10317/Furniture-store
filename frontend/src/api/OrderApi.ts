// OrderApi.ts
export type OrderStatus =
  | "cho_xu_ly"
  | "dang_xu_ly"
  | "dang_van_chuyen" 
  | "da_giao"
  | "da_huy";

export interface OrderItem {
  id: number;
  nguoi_dung_id: number;
  ngay_dat: string;
  tong_tien: number;
  phuong_thuc_thanh_toan: "tien_mat" | "chuyen_khoan";
  trang_thai: OrderStatus;
  ho_ten?: string; // Thêm để hỗ trợ dữ liệu từ /orderdetails/:id
  so_dien_thoai?: string;
  dia_chi?: string;
  chi_tiet?: {
    san_pham_id: number;
    ten_san_pham: string;
    hinh_anh: string;
    so_luong: number;
    gia: number;
  }[];
}

export interface OrderDetailItem {
  id: number;
  san_pham_id: number;
  ten_san_pham: string;
  so_luong: number;
  don_gia: number;
}

// Định nghĩa cho thanh toán
export interface PaymentItem {
  id: number;
  don_hang_id: number;
  so_tien: number;
  phuong_thuc: "tien_mat" | "chuyen_khoan";
  ghi_chu?: string;
  ngay_thanh_toan: string;
}

export interface CheckoutPayload {
  nguoi_dung_id: number;
  ngay_dat: string;
  tong_tien: number;
  phuong_thuc_thanh_toan: "tien_mat" | "chuyen_khoan";
  trang_thai: OrderStatus;
  ghi_chu?: string;
  chi_tiet_don_hang: {
    san_pham_id: number;
    so_luong: number;
    don_gia: number;
  }[];
}

// ======================= UI SUPPORT ========================
export const OrderStatusMap: Record<string, { label: string; badgeClass: string }> = {
  cho_xu_ly: { label: "Chờ xử lý", badgeClass: "badge bg-warning" },
  dang_xu_ly: { label: "Đang xử lý", badgeClass: "badge bg-primary" },
  dang_van_chuyen: { label: "Đang vận chuyển", badgeClass: "badge bg-info" },
  da_giao: { label: "Đã giao", badgeClass: "badge bg-success" },
  da_huy: { label: "Đã huỷ", badgeClass: "badge bg-danger" },
};

// ======================= API ========================
const BASE_URL = "http://localhost:3001/orders";

export const getOrders = async (search?: string): Promise<OrderItem[]> => {
  try {
    const url = new URL(BASE_URL);
    if (search?.trim()) url.searchParams.set("search", search.trim());

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Lỗi khi tải danh sách đơn hàng");

    return await response.json();
  } catch (error) {
    console.error("getOrders error:", error);
    throw error;
  }
};

export const updateOrderStatus = async (
  id: number,
  trang_thai: OrderStatus
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trang_thai }),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || "Lỗi khi cập nhật trạng thái đơn hàng");
    }
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    throw error;
  }
};

export const getOrdersByUserId = async (userId: number): Promise<OrderItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/user/${userId}`);
    if (!response.ok) throw new Error("Lỗi khi lấy đơn hàng của người dùng");

    return await response.json();
  } catch (error) {
    console.error("getOrdersByUserId error:", error);
    throw error;
  }
};

export const getOrderById = async (id: number): Promise<OrderItem> => {
  try {
    const response = await fetch(`http://localhost:3001/orderdetails/${id}`);
    if (!response.ok) throw new Error("Không thể lấy chi tiết đơn hàng");

    return await response.json();
  } catch (err) {
    console.error("getOrderById error:", err);
    throw err;
  }
};

export const getPayments = async (search?: string): Promise<PaymentItem[]> => {
  const url = new URL("http://localhost:3001/api/thanh-toan");
  if (search?.trim()) url.searchParams.set("search", search.trim());

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Lỗi khi tải danh sách thanh toán");
  return res.json();
};

export const createOrderWithPayment = async (
  payload: CheckoutPayload
): Promise<{ don_hang_id: number }> => {
  const response = await fetch("http://localhost:3001/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error("Lỗi khi tạo đơn hàng: " + errText);
  }

  return response.json(); // { don_hang_id: 123 }
};

export const getOrdersByStatus = async (status: OrderStatus): Promise<OrderItem[]> => {
  try {
    const url = new URL(BASE_URL);
    url.searchParams.set("trang_thai", status);

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Lỗi khi lọc đơn hàng theo trạng thái");

    return await response.json();
  } catch (error) {
    console.error("getOrdersByStatus error:", error);
    throw error;
  }
};