import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  getOrdersByUserId,
  type OrderItem,
  OrderStatusMap,
} from "../api/OrderApi";
import { useAuth } from "../components/AuthContext";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [activeStatus, setActiveStatus] = useState<string>("cho_xu_ly");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!user) return;
    getOrdersByUserId(user.id).then(setOrders).catch(console.error);
  }, [user]);

  const formatMoney = (amount: number) => `${amount.toLocaleString("vi-VN")} ₫`;
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("vi-VN");

  // Lọc đơn hàng theo trạng thái
  const filteredOrders = orders.filter(
    (order) => order.trang_thai === activeStatus
  );

  return (
    <div className="container py-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3 mb-4">
          <div className="bg-light p-4 rounded shadow-sm h-100">
            <h5 className="fw-bold mb-4">Tài khoản</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-3 fw-bold text-primary">
                <i className="bi bi-bag-check-fill me-2"></i>Đơn hàng
              </li>
              <li className="mb-3">
                <Link to="/account" className="text-decoration-none text-dark">
                  <i className="bi bi-person-circle me-2"></i>Thông tin của tôi
                </Link>
              </li>
              {user?.vai_tro === "quan_tri" && (
                <li className="mb-3">
                  <Link
                    to="/admin/dashboard"
                    className="text-decoration-none text-dark"
                  >
                    <i className="bi bi-speedometer2 me-2"></i>Trang quản trị
                  </Link>
                </li>
              )}
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  <i className="bi bi-box-arrow-right me-2"></i>Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white fw-bold">
              <i className="bi bi-receipt me-2"></i>Đơn hàng của tôi
            </div>
            <div className="card-body">
              {/* Tabs trạng thái */}
              <ul className="nav nav-tabs mb-4">
                {Object.entries(OrderStatusMap).map(([key, { label }]) => (
                  <li className="nav-item" key={key}>
                    <button
                      className={`nav-link ${
                        activeStatus === key ? "active" : ""
                      }`}
                      onClick={() => setActiveStatus(key)}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Bảng đơn hàng */}
              {filteredOrders.length === 0 ? (
                <div className="text-center text-muted py-4">
                  <i className="bi bi-emoji-frown fs-2 d-block mb-2"></i>
                  Không có đơn hàng nào ở trạng thái này.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Mã đơn</th>
                        <th>Ngày đặt</th>
                        <th>Tổng tiền</th>
                        <th className="text-center">Trạng thái</th>
                        <th>Chi tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{formatDate(order.ngay_dat)}</td>
                          <td>{formatMoney(order.tong_tien)}</td>
                          <td className="text-center">
                            <span
                              className={`badge px-3 py-2 fw-semibold ${
                                order.trang_thai === "cho_xu_ly"
                                  ? "bg-warning text-white"
                                  : order.trang_thai === "dang_xu_ly"
                                  ? "bg-primary text-white"
                                  : order.trang_thai === "dang_van_chuyen"
                                  ? "bg-info text-white"
                                  : order.trang_thai === "da_giao"
                                  ? "bg-success text-white"
                                  : order.trang_thai === "da_huy"
                                  ? "bg-danger text-white"
                                  : "bg-secondary text-white"
                              }`}
                            >
                              {OrderStatusMap[order.trang_thai]?.label || "Không xác định"}
                            </span>
                          </td>
                          <td>
                            <Link
                              to={`/orders/${order.id}`}
                              className="btn btn-sm btn-outline-dark"
                            >
                              <i className="bi bi-eye"></i> Xem
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
