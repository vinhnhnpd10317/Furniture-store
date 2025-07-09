export interface OrderItem {
    id: number;
    nguoi_dung_id: number;
    ngay_dat: string;
    tong_tien: number;
    phuong_thuc_thanh_toan: 'tien_mat' | 'chuyen_khoan';
    trang_thai: 'cho_xu_ly' | 'dang_xu_ly' | 'da_giao' | 'da_huy';
}

// Lấy danh sách đơn hàng
export const getOrders = async (search?: string): Promise<OrderItem[]> => {
    const url  = new URL("http://localhost:3001/orders");

    if (search && search.trim()) {
        url.searchParams.set("search", search.trim());
    }
    
    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error("Lỗi khi tải danh sách đơn hàng");
    }
    return response.json();
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (id: number, trang_thai: OrderItem["trang_thai"]): Promise<void> => {
    const response = await fetch(`http://localhost:3001/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trang_thai }),
    });
    if (!response.ok) {
        throw new Error("Lỗi khi cập nhật trạng thái đơn hàng");
    }
};

