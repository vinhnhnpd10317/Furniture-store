import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { getOrders, updateOrderStatus } from "../../api/OrderApi";
import OrderStatusTabs, { type OrderStatus } from "./OrderStatusTabs";
import OrderTable, { type Order } from "./OrderTable";

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
    <div className="container mt-4">
      <h4 className="mb-3">Danh sách đơn hàng</h4>

      <OrderStatusTabs
        selectedStatus={selectedStatus}
        onChange={(status) => {
          setSelectedStatus(status);
          setCurrentPage(1);
        }}
      />

      <OrderTable orders={currentOrders} onStatusChange={handleStatusChange} />

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
