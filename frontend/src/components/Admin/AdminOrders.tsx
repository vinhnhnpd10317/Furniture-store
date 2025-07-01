// src/components/Admin/Order/AdminOrders.tsx

import React, { useEffect, useState } from "react";
import { OrderApi } from "../../api/OrderApi";

import { useNavigate } from "react-router-dom";

interface Order {
  id: number;
  nguoi_dung_id: number;
  ngay_dat: string;
  tong_tien: number;
  trang_thai: string;
  phuong_thuc_thanh_toan: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await OrderApi.getAll();
        setOrders(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách đơn hàng:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">Danh sách đơn hàng</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ngày Đặt</th>
            <th>Tổng tiền</th>
            <th>Phương Thức TT</th>
            <th>Trạng Thái</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.ngay_dat).toLocaleDateString()}</td>
              <td>{order.tong_tien.toLocaleString()} đ</td>
              <td>{order.phuong_thuc_thanh_toan}</td>
              <td>{order.trang_thai}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => navigate(`/admin/orders/${order.id}`)}
                >
                  Chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
