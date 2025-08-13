import React, { useState, type ReactNode } from "react";
import type { OrderStatus } from "./OrderStatusTabs";
import { getOrderById, OrderStatusMap } from "../../api/OrderApi";
import { Modal, Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";

export interface Order {
  ten_khach_hang: ReactNode;
  id: number;
  nguoi_dung_id: number;
  nguoi_dung?: {
    ho_ten: string;
    // các thông tin khác nếu cần
  };
  ngay_dat: string;
  tong_tien: number;
  phuong_thuc_thanh_toan: string;
  trang_thai: OrderStatus;
  trang_thai_thanh_toan: "chua_thanh_toan" | "da_thanh_toan";
}

interface ProductItem {
  hinh_anh: unknown;
  id: number;
  ten_san_pham: string;
  hinh_anh_dai_dien: string;
  so_luong: number;
  don_gia: number;
}

interface FullOrderDetail extends Order {
  ho_ten: string;
  email: string;
  so_dien_thoai: string;
  dia_chi: string;
  ghi_chu: string;
  chi_tiet: ProductItem[];
  trang_thai_thanh_toan: "chua_thanh_toan" | "da_thanh_toan";
}

interface Props {
  orders: Order[];
  onStatusChange: (orderId: number, newStatus: OrderStatus) => void;
}

const OrderTable: React.FC<Props> = ({ orders, onStatusChange }) => {
  const [selectedOrder, setSelectedOrder] = useState<FullOrderDetail | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetail = async (orderId: number) => {
    try {
      const data = await getOrderById(orderId);
      setSelectedOrder(data as unknown as FullOrderDetail);
      setShowModal(true);
    } catch (err) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
    }
  };

  const formatMoney = (amount: number) =>
    `${amount.toLocaleString("vi-VN")} ₫`;

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  
  const trangThaiThanhToan: Record<string, string> = {
    chua_thanh_toan: "Chưa thanh toán",
    da_thanh_toan: "Đã thanh toán",
  };

  return (
    <>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr className="text-center">
            <th className="py-3">ID</th>
            <th className="py-3">Người dùng ID</th>
            <th className="py-3">Ngày đặt</th>
            <th className="py-3">Tổng tiền</th>
            <th className="py-3">Phương thức</th>
            <th className="py-3">Trạng thái</th>
            <th className="py-3" style={{ width: 190 }}>Trạng thái thanh toán</th>
            <th className="py-3" style={{ width: 110 }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.nguoi_dung_id}</td>
              <td>{formatDate(order.ngay_dat)}</td>
              <td>{formatMoney(order.tong_tien)}</td>
              <td>
                {order.phuong_thuc_thanh_toan === "tien_mat"
                  ? "Tiền mặt"
                  : "Chuyển khoản"}
              </td>
              <td>
                <select
                  className="form-select form-select-sm"
                  value={order.trang_thai}
                  onChange={(e) => {
                    const newStatus = e.target.value as OrderStatus;

                    // Nếu là "đã giao" => set thanh toán thành "đã thanh toán"
                    // if (newStatus === "da_giao" && order.trang_thai_thanh_toan !== "da_thanh_toan") {
                    //   // Cập nhật UI ngay
                    //   order.trang_thai_thanh_toan = "da_thanh_toan";
                    // }

                    onStatusChange(order.id, newStatus);
                  }}
                >
                  <option value="cho_xu_ly">Chờ xử lý</option>
                  <option value="dang_xu_ly">Đang xử lý</option>
                  <option value="dang_van_chuyen">Đang vận chuyển</option>
                  <option value="da_giao">Đã giao</option>
                  <option value="da_huy">Đã hủy</option>
                </select>
              </td>
              <td className="text-center">
                <span
                  className={`badge px-3 py-2 fs-6 ${
                    order.trang_thai_thanh_toan === "chua_thanh_toan"
                      ? "bg-danger"
                      : "bg-success"
                  }`}
                >
                  {order.trang_thai_thanh_toan === "chua_thanh_toan"
                    ? "Chưa thanh toán"
                    : "Đã thanh toán"}
                </span>
              </td>   

              <td className="d-flex justify-content-center">
                <button
                  className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                  onClick={() => handleViewDetail(order.id)}
                >
                  <FaEye /> Xem
                </button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center">
                Không có đơn hàng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal xem chi tiết */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết đơn hàng #{selectedOrder?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder ? (
            <>
              {/* THÔNG TIN KHÁCH HÀNG */}
              <div className="mb-3">
                <p><strong>Khách hàng:</strong> {selectedOrder.ho_ten}</p>
                <p><strong>Email:</strong> {selectedOrder.email}</p>
                <p><strong>SĐT:</strong> {selectedOrder.so_dien_thoai}</p>
                <p><strong>Địa chỉ:</strong> {selectedOrder.dia_chi}</p>
                {selectedOrder.ghi_chu && (
                  <p><strong>Ghi chú:</strong> {selectedOrder.ghi_chu}</p>
                )}
                <p>
                  <strong>Phương thức thanh toán:</strong>{" "}
                  {selectedOrder.phuong_thuc_thanh_toan === "tien_mat"
                    ? "Tiền mặt"
                    : "Chuyển khoản"}
                </p>
                <p>
                  <strong>Trạng thái thanh toán:</strong>{" "}
                  {trangThaiThanhToan[selectedOrder.trang_thai_thanh_toan] || selectedOrder.trang_thai_thanh_toan}
                </p>
                <p>
                  <strong>Trạng thái:</strong>{" "}
                  <span className={OrderStatusMap[selectedOrder.trang_thai]?.badgeClass}>
                    {OrderStatusMap[selectedOrder.trang_thai]?.label}
                  </span>
                </p>
              </div>

              {/* DANH SÁCH SẢN PHẨM */}
              <h6>Danh sách sản phẩm:</h6>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Hình</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.chi_tiet && selectedOrder.chi_tiet.length > 0 ? (
                    selectedOrder.chi_tiet.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center">
                          <img
                            src={`/img/imgproduct/${item.hinh_anh}`}
                            alt={item.ten_san_pham}
                            width="100"
                          />
                        </td>
                        <td>{item.ten_san_pham}</td>
                        <td>{item.so_luong}</td>
                        <td>{item.don_gia.toLocaleString()} đ</td>
                        <td>{(item.so_luong * item.don_gia).toLocaleString()} đ</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        Không có sản phẩm nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* TỔNG TIỀN */}
              <div className="text-end">
                <strong>Tổng tiền:</strong> {formatMoney(selectedOrder.tong_tien)}
              </div>
            </>
          ) : (
            <p>Đang tải...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderTable;
