import { useEffect, useMemo, useState } from "react";

interface Order {
    id: number;
    nguoi_dung_id: number;
    ngay_dat: string;
    tong_tien: number;
    phuong_thuc_thanh_toan: string;
    trang_thai: string;
}

export default function Order() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const totalPages = Math.max(1, Math.ceil(orders.length / pageSize));

    const currentOrders = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return orders.slice(start, start + pageSize);
    }, [orders, currentPage]);

    useEffect(() => {
        fetch("http://localhost:3001/orders")
        .then((res) => res.json())
        .then(setOrders)
        .catch((err) => console.error("Lỗi khi tải đơn hàng:", err));
    }, []);

    const goToPage = (n: number) => setCurrentPage(n);

    return (
        <div className="container mt-4">
        <h4 className="mb-3">Danh sách đơn hàng</h4>

        <table className="table table-bordered">
            <thead className="table-light">
                <tr>
                    <th>ID</th>
                    <th>Người dùng ID</th>
                    <th>Ngày đặt</th>
                    <th>Tổng tiền</th>
                    <th>Phương thức</th>
                    <th>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
            {currentOrders.map((order) => (
                <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.nguoi_dung_id}</td>
                    <td>{new Date(order.ngay_dat).toLocaleString()}</td>
                    <td>{order.tong_tien.toLocaleString("vi-VN")} ₫</td>
                    <td>{order.phuong_thuc_thanh_toan === "tien_mat" ? "Tiền mặt" : "Chuyển khoản"}</td>
                    <td>
                        {(() => {
                        switch (order.trang_thai) {
                            case "cho_xu_ly":
                            return "Chờ xử lý";
                            case "dang_xu_ly":
                            return "Đang xử lý";
                            case "da_giao":
                            return "Đã giao";
                            case "da_huy":
                            return "Đã hủy";
                            default:
                            return order.trang_thai;
                        }
                        })()}
                    </td>
                </tr>
            ))}
            {currentOrders.length === 0 && (
                <tr>
                    <td colSpan={6} className="text-center">
                        Không có đơn hàng nào.
                    </td>
                </tr>
            )}
            </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-3">
                <ul className="pagination justify-content-center mb-0">
                    <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                    <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                        &laquo;
                    </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <li key={n} className={`page-item ${currentPage === n && "active"}`}>
                        <button className="page-link" onClick={() => goToPage(n)}>
                        {n}
                        </button>
                    </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                    <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                        &raquo;
                    </button>
                    </li>
                </ul>
            </nav>
        )}
        </div>
    );
}
