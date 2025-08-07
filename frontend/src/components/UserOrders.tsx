import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  getOrdersByUserId,
  getOrderById,
  type OrderItem,
  OrderStatusMap,
} from "../api/OrderApi";
import { useAuth } from "../components/AuthContext";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const UserOrders = () => {

  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!user) return;
    getOrdersByUserId(user.id).then(setOrders).catch(console.error);
  }, [user]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openModal = async (orderId: number) => {
    try {
      const order = await getOrderById(orderId);
      setSelectedOrder(order as unknown as OrderItem);
      setShowModal(true);
    } catch (err) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
    }
  };

  const formatMoney = (amount: number) => `${amount.toLocaleString("vi-VN")} ₫`;
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("vi-VN");

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
                  <Link to="/admin/dashboard" className="text-decoration-none text-dark">
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
              {orders.length === 0 ? (
                <div className="text-center text-muted py-4">
                  <i className="bi bi-emoji-frown fs-2 d-block mb-2"></i>
                  Bạn chưa có đơn hàng nào.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Mã đơn</th>
                        <th>Ngày đặt</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Chi tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => {
                        const status = OrderStatusMap[order.trang_thai];
                        return (
                          <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{formatDate(order.ngay_dat)}</td>
                            <td>{formatMoney(order.tong_tien)}</td>
                            <td>
                              <span
                                className={
                                  status?.badgeClass || "badge bg-secondary"
                                }
                              >
                                {status?.label || "Không xác định"}
                              </span>
                            </td>
                            <td>
                              <Link to={`/orders/${order.id}`} className="btn btn-sm btn-outline-dark">
                                <i className="bi bi-eye"></i> Xem
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal chi tiết đơn hàng */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết đơn hàng #{selectedOrder?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder ? (
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Ngày đặt</th>
                  <td>{formatDate(selectedOrder.ngay_dat)}</td>
                </tr>
                <tr>
                  <th>Tổng tiền</th>
                  <td>{formatMoney(selectedOrder.tong_tien)}</td>
                </tr>
                <tr>
                  <th>Phương thức</th>
                  <td>
                    {selectedOrder.phuong_thuc_thanh_toan === "tien_mat"
                      ? "Tiền mặt"
                      : "Chuyển khoản"}
                  </td>
                </tr>
                <tr>
                  <th>Trạng thái</th>
                  <td>
                    {(() => {
                      const status =
                        OrderStatusMap[selectedOrder.trang_thai];
                      return (
                        <span
                          className={
                            status?.badgeClass || "badge bg-secondary"
                          }
                        >
                          {status?.label || "Không xác định"}
                        </span>
                      );
                    })()}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p className="text-muted">Đang tải...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserOrders;
