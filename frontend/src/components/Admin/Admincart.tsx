import React, { useEffect, useState } from "react";
import axios from "axios";

interface CartItem {
  gio_hang_id: number;
  nguoi_dung_id: number;
  ho_ten: string;
  ten_san_pham: string;
  so_luong: number;
  gia: number;
  thanh_tien: number;
}

const AdminCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get("http://localhost:3001/cart/admin/all");
      setCartItems(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  const deleteCartItem = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa mục này?")) return;
    try {
      await axios.delete(`http://localhost:3001/cart/admin/${id}`);
      fetchCartItems();
    } catch (error) {
      console.error("Lỗi khi xóa mục:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý Giỏ hàng (Admin)</h2>
      <table className="table table-striped table-hover table-bordered align-middle text-center">
        <thead className="table-dark">
          <tr>
            <th>ID Người dùng</th>
            <th>Họ tên</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Thành tiền</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.gio_hang_id}>
              <td>{item.nguoi_dung_id}</td>
              <td className="text-start">{item.ho_ten}</td>
              <td className="text-start">{item.ten_san_pham}</td>
              <td>{item.so_luong}</td>
              <td>{item.gia.toLocaleString()}₫</td>
              <td>{item.thanh_tien.toLocaleString()}₫</td>
              <td>
                <button
                  onClick={() => deleteCartItem(item.gio_hang_id)}
                  className="btn btn-danger btn-sm"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCart;
