import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPayments } from "../../api/CheckOutApi";

interface Payment {
    id: number;
    don_hang_id: number;
    so_tien: number;
    phuong_thuc: "tien_mat" | "chuyen_khoan";
    ghi_chu?: string;
    ngay_thanh_toan: string;
}

function useQuery() {
    const { search } = useLocation();
    return new URLSearchParams(search);
}

export default function Checkout() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const query = useQuery();
    const searchText = query.get("search")?.toLowerCase() || "";

    useEffect(() => {
        getPayments(searchText)
        .then(setPayments)
        .catch((err: unknown) => console.error("Lỗi khi tải thanh toán:", err));
    }, [searchText]);

    const totalPages = Math.max(1, Math.ceil(payments.length / pageSize));

    const currentPayments = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return payments.slice(start, start + pageSize);
    }, [payments, currentPage]);

    const goToPage = (n: number) => setCurrentPage(n);

    return (
        <div className="container mt-4">
            <h4 className="mb-3">Danh sách thanh toán</h4>

            <table className="table table-bordered">
                <thead className="table-light">
                <tr>
                    <th>ID</th>
                    <th>Đơn hàng ID</th>
                    <th>Số tiền</th>
                    <th>Phương thức</th>
                    <th>Ghi chú</th>
                    <th>Ngày thanh toán</th>
                </tr>
                </thead>
                <tbody>
                {currentPayments.map((p) => (
                    <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.don_hang_id}</td>
                    <td>{p.so_tien.toLocaleString("vi-VN")} ₫</td>
                    <td>{p.phuong_thuc === "tien_mat" ? "Tiền mặt" : "Chuyển khoản"}</td>
                    <td>{p.ghi_chu || ""}</td>
                    <td>{new Date(p.ngay_thanh_toan).toLocaleString()}</td>
                    </tr>
                ))}
                {currentPayments.length === 0 && (
                    <tr>
                    <td colSpan={6} className="text-center">
                        Không có dữ liệu thanh toán.
                    </td>
                    </tr>
                )}
                </tbody>
            </table>

            {totalPages > 1 && (
                <nav className="mt-3" aria-label="Pagination">
                    <ul className="pagination justify-content-center mb-0">
                        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                        <button className="page-link" onClick={() => goToPage(currentPage - 1)}>&laquo;</button>
                        </li>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <li key={n} className={`page-item ${currentPage === n && "active"}`}>
                            <button className="page-link" onClick={() => goToPage(n)}>{n}</button>
                        </li>
                        ))}

                        <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                        <button className="page-link" onClick={() => goToPage(currentPage + 1)}>&raquo;</button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}
