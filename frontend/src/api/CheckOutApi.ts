// Định nghĩa cho thanh toán
export interface PaymentItem {
  id: number;
  don_hang_id: number;
  so_tien: number;
  phuong_thuc: "tien_mat" | "chuyen_khoan";
  ghi_chu?: string;
  ngay_thanh_toan: string;
}

// API: Lấy danh sách thanh toán
export const getPayments = async (search?: string): Promise<PaymentItem[]> => {
    const url = new URL("http://localhost:3001/api/thanh-toan");
    if (search?.trim()) url.searchParams.set("search", search.trim());

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error("Lỗi khi tải danh sách thanh toán");
    return res.json();
};

// Định nghĩa cho đơn hàng
export interface CheckoutPayload {
    nguoi_dung_id: number;
    ngay_dat: string;
    tong_tien: number;
    phuong_thuc_thanh_toan: "tien_mat" | "chuyen_khoan";
    trang_thai: "cho_xu_ly" | "dang_xu_ly" | "da_giao" | "da_huy";
    ghi_chu?: string;
    chi_tiet_don_hang: {
        san_pham_id: number;
        so_luong: number;
        don_gia: number;
    }[];
}

// API: Tạo đơn hàng và thanh toán
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
