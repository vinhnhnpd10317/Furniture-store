import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";  
import { fetchOrderById } from "../../api/OrderApi";

interface ProductItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderDetail {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  status: "Đang xử lý" | "Đã giao";
  paymentStatus: "Chưa thanh toán" | "Đã thanh toán";
  products: ProductItem[];
  total: number;
}

const AdminOrderDetail: React.FC = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);

  useEffect(() => {
    if (id) {
      fetchOrderById(id).then(setOrder).catch(() => {
        alert("Không tìm thấy đơn hàng");
      });
    }
  }, [id]);

  const handlePaymentUpdate = () => {
    if (order) setOrder({ ...order, paymentStatus: "Đã thanh toán" });
  };

  const handleOrderUpdate = () => {
    if (order) setOrder({ ...order, status: "Đã giao" });
  };

  if (!order) return <div className="container py-5">Đang tải đơn hàng...</div>;

  return (
    <div className="container py-5">
      <h4 className="fw-bold mb-4">🧾 Chi tiết đơn hàng #{order.id}</h4>

      {/* Thông tin khách hàng */}
      <div className="mb-4">
        <h6 className="fw-bold">Khách hàng</h6>
        <p className="mb-1">Họ tên: {order.customerName}</p>
        <p className="mb-1">Email: {order.email}</p>
        <p className="mb-1">SĐT: {order.phone}</p>
        <p className="mb-1">Địa chỉ: {order.address}</p>
      </div>

      {/* Trạng thái */}
      <div className="mb-4">
        <h6 className="fw-bold">Trạng thái đơn hàng</h6>
        <div className="d-flex align-items-center gap-3 mb-2">
          <span className={`badge bg-${order.status === "Đã giao" ? "success" : "warning"}`}>
            {order.status}
          </span>
          {order.status !== "Đã giao" && (
            <button onClick={handleOrderUpdate} className="btn btn-sm btn-outline-success">
              Đánh dấu đã giao
            </button>
          )}
        </div>

        <h6 className="fw-bold mt-3">Thanh toán</h6>
        <div className="d-flex align-items-center gap-3">
          <span className={`badge bg-${order.paymentStatus === "Đã thanh toán" ? "success" : "danger"}`}>
            {order.paymentStatus}
          </span>
          {order.paymentStatus !== "Đã thanh toán" && (
            <button onClick={handlePaymentUpdate} className="btn btn-sm btn-outline-primary">
              Đánh dấu đã thanh toán
            </button>
          )}
        </div>
      </div>

      {/* Chi tiết sản phẩm */}
      <div className="mb-4">
        <h6 className="fw-bold">Sản phẩm</h6>
        {order.products.map((product) => (
          <div key={product.id} className="d-flex align-items-center border p-3 rounded mb-2">
            <img
              src={product.image}
              alt={product.name}
              width="80"
              height="80"
              className="me-3 rounded"
              style={{ objectFit: "cover" }}
            />
            <div>
              <p className="mb-1">{product.name} × {product.quantity}</p>
              <strong>{(product.price).toLocaleString()}đ</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="text-end">
        <h5>Tổng cộng: <strong>{order.total.toLocaleString()}đ</strong></h5>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
