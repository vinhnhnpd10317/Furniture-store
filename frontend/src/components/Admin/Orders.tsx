import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { getOrders, updateOrderStatus } from "../../api/OrderApi";
import OrderStatusTabs, { type OrderStatus } from "./OrderStatusTabs";
import OrderTable, { type Order } from "./OrderTable";
import React from "react";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function Order() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("cho_xu_ly");
  const pageSize = 10;

  const query = useQuery();
  const searchText = query.get("search")?.toLowerCase() || "";

  useEffect(() => {
    getOrders(searchText)
      .then(setOrders)
      .catch((err) => console.error("Lỗi khi tải đơn hàng:", err));
  }, [searchText]);

  const filteredOrders = useMemo(
    () => orders.filter((order) => order.trang_thai === selectedStatus),
    [orders, selectedStatus]
  );

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));

  const currentOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, currentPage]);

  const goToPage = (n: number) => setCurrentPage(n);

  const handleStatusChange = (orderId: number, newStatus: OrderStatus) => {
    const confirm = window.confirm("Bạn có chắc muốn thay đổi trạng thái đơn hàng này?");
    if (!confirm) return;

    updateOrderStatus(orderId, newStatus)
      .then(() => {
        setOrders((prev) =>
          prev.map((order) =>
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
    <div className="container-fluid py-4">
      <h3 className="mb-3">Danh sách đơn hàng</h3>

      <OrderStatusTabs
        selectedStatus={selectedStatus}
        onChange={(status) => {
          setSelectedStatus(status);
          setCurrentPage(1);
        }}
      />

      {/* Desktop / Tablet - Table */}
      <div className="d-none d-sm-block table-responsive">
        <OrderTable orders={currentOrders} onStatusChange={handleStatusChange} />
      </div>

      {/* Mobile - Card layout */}
      {/* Mobile - Card layout */}
      <div className="d-block d-sm-none">
        {currentOrders.map((order) => (
          <div key={order.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Đơn #{order.id}</h5>
              <p className="card-text mb-1"><strong>Khách:</strong> {order.ten_khach_hang}</p>
              <p className="card-text mb-1"><strong>Ngày đặt:</strong> {order.ngay_dat}</p>
              <p className="card-text mb-1"><strong>Tổng tiền:</strong> {order.tong_tien.toLocaleString()}₫</p>

              <div className="mb-2">
                <label htmlFor={`status-${order.id}`} className="form-label fw-bold">Trạng thái:</label>
                <select
                  id={`status-${order.id}`}
                  className="form-select form-select-sm"
                  value={order.trang_thai}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value as OrderStatus)
                  }
                >
                  <option value="cho_xu_ly">Chờ xử lý</option>
                  <option value="dang_xu_ly">Đang xử lý</option>
                  <option value="dang_van_chuyen">Đang vận chuyển</option>
                  <option value="da_giao">Đã giao</option>
                  <option value="da_huy">Đã hủy</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="pagination" className="mt-4">
          <ul className="pagination justify-content-end mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link py-2 px-3" onClick={() => goToPage(1)}>
                &laquo;
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link py-2 px-3" onClick={() => goToPage(currentPage - 1)}>
                &lt;
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((n) =>
                totalPages <= 5 ||
                n === 1 ||
                n === totalPages ||
                Math.abs(currentPage - n) <= 1
              )
              .map((n, index, arr) => {
                const prev = arr[index - 1];
                const showDots = prev && n - prev > 1;

                return (
                  <React.Fragment key={n}>
                    {showDots && (
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    )}
                    <li className={`page-item ${currentPage === n ? "active" : ""}`}>
                      <button
                        className="page-link py-2 px-3"
                        onClick={() => goToPage(n)}
                        style={currentPage === n ? { backgroundColor: "#ffffffff", color: "#ea580c", borderColor: "#d8d8d8ff" } : {}}
                      >
                        {n}
                      </button>
                    </li>
                  </React.Fragment>
                );
              })}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link py-2 px-3" onClick={() => goToPage(currentPage + 1)}>
                &gt;
              </button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link py-2 px-388" onClick={() => goToPage(totalPages)}>
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
