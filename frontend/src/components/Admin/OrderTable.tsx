import React, { useState } from "react";
import type { OrderStatus } from "./OrderStatusTabs";
import { getOrderById, OrderStatusMap } from "../../api/OrderApi";
import { Modal, Button } from "react-bootstrap";

export interface Order {
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
  so_dien_thoai: string;
  dia_chi: string;
  chi_tiet: ProductItem[];
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

  return (
    <>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Người dùng ID</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Phương thức</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
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
                  onChange={(e) =>
                    onStatusChange(order.id, e.target.value as OrderStatus)
                  }
                >
                  <option value="cho_xu_ly">Chờ xử lý</option>
                  <option value="dang_xu_ly">Đang xử lý</option>
                  <option value="dang_van_chuyen">Đang vận chuyển</option>
                  <option value="da_giao">Đã giao</option>
                  <option value="da_huy">Đã hủy</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleViewDetail(order.id)}
                >
                  <i className="bi bi-eye"></i> Xem
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
                <p><strong>SĐT:</strong> {selectedOrder.so_dien_thoai}</p>
                <p><strong>Địa chỉ:</strong> {selectedOrder.dia_chi}</p>
                <p>
                  <strong>Phương thức thanh toán:</strong>{" "}
                  {selectedOrder.phuong_thuc_thanh_toan === "tien_mat"
                    ? "Tiền mặt"
                    : "Chuyển khoản"}
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
