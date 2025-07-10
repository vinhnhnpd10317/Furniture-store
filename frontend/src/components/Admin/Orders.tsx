import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { getOrders, updateOrderStatus } from "../../api/OrderApi";

type OrderStatus = "cho_xu_ly" | "dang_xu_ly" | "da_giao" | "da_huy";

interface Order {
  id: number;
  nguoi_dung_id: number;
  ngay_dat: string;
  tong_tien: number;
  phuong_thuc_thanh_toan: string;
  trang_thai: OrderStatus;
}

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function Order() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const query = useQuery();
  const searchText = query.get("search")?.toLowerCase() || "";

  useEffect(() => {
    getOrders(searchText)
      .then(setOrders)
      .catch((err: unknown) => console.error("Lỗi khi tải đơn hàng:", err));
  }, [searchText]);

  const totalPages = Math.max(1, Math.ceil(orders.length / pageSize));

  const currentOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return orders.slice(start, start + pageSize);
  }, [orders, currentPage]);

  const goToPage = (n: number) => setCurrentPage(n);

  const handleStatusChange = (orderId: number, newStatus: OrderStatus) => {
    const confirm = window.confirm("Bạn có chắc muốn thay đổi trạng thái đơn hàng này?");
    if (!confirm) return;

    updateOrderStatus(orderId, newStatus)
      .then(() => {
        setOrders(prev =>
          prev.map(order =>
            order.id === orderId ? { ...order, trang_thai: newStatus } : order
          )
        );
      })
      .catch((err) => {
        alert("Cập nhật thất bại");
        console.error(err);
      });
  };

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
                <select
                  className="form-select form-select-sm"
                  value={order.trang_thai}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                >
                  <option value="cho_xu_ly">Chờ xử lý</option>
                  <option value="dang_xu_ly">Đang xử lý</option>
                  <option value="da_giao">Đã giao</option>
                  <option value="da_huy">Đã hủy</option>
                </select>
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

      {totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-3">
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
