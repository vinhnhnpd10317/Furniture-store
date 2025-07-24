import React from "react";
import type { OrderStatus } from "./OrderStatusTabs";

export interface Order {
  id: number;
  nguoi_dung_id: number;
  ngay_dat: string;
  tong_tien: number;
  phuong_thuc_thanh_toan: string;
  trang_thai: OrderStatus;
}

interface Props {
  orders: Order[];
  onStatusChange: (orderId: number, newStatus: OrderStatus) => void;
}

const OrderTable: React.FC<Props> = ({ orders, onStatusChange }) => {
  return (
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
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.nguoi_dung_id}</td>
            <td>{new Date(order.ngay_dat).toLocaleString()}</td>
            <td>{order.tong_tien.toLocaleString("vi-VN")} ₫</td>
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
          </tr>
        ))}
        {orders.length === 0 && (
          <tr>
            <td colSpan={6} className="text-center">
              Không có đơn hàng nào.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrderTable;
