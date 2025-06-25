import React from 'react';
import "../Css/Productcart.css";
import { useCart } from "../Products/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductCart() {
    const { cartItems, updateQuantity, removeFromCart  } = useCart();
    const navigate = useNavigate();

    const handleIncrease = (id: number) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
        updateQuantity(id, item.quantity + 1); // CartContext sẽ lo cập nhật DB
    }
    };

    const handleDecrease = (id: number) => {
    const item = cartItems.find(i => i.id === id);
    if (item && item.quantity > 1) {
        updateQuantity(id, item.quantity - 1); // CartContext sẽ lo cập nhật DB
    }
    };

    const handleRemove = (id: number) => {
    removeFromCart(id); // CartContext sẽ lo gọi API xóa DB
    alert("Sản phẩm đã được xoá khỏi giỏ hàng!");
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal;

    return (
        <div className="container my-5">
            <div className="row g-4">
                {/* LEFT - Cart Items */}
                <div className="col-12 col-md-6">
                    <h4 className="mb-4 d-flex align-items-center gap-3">
                        Giỏ hàng <span className="badge bg-danger">{cartItems.length}</span>
                    </h4>

                    {cartItems.map((item) => (
                        <div key={item.id} className="card mb-3 p-3 d-flex flex-column flex-md-row align-items-center shadow-sm">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="img-fluid"
                                style={{ width: '160px', height: '160px', objectFit: 'cover', borderRadius: '10px' }}
                            />
                            <div className="ms-md-3 mt-3 mt-md-0 flex-grow-1 text-center text-md-start">
                                <h5 className="mb-1">{item.name}</h5>
                                <p className="text-muted mb-1">Mã vật liệu: {item.material}</p>
                                <p className="text-muted mb-1">Chất liệu: {item.texture}</p>
                                <p className="text-danger fw-bold mb-2">
                                    {(item.price * item.quantity).toLocaleString()}₫
                                </p>
                            </div>
                            <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                                <button className="btn btn-outline-secondary" onClick={() => handleDecrease(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button className="btn btn-outline-secondary" onClick={() => handleIncrease(item.id)}>+</button>
                                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleRemove(item.id)}> Xoá </button>

                            </div>
                        </div>
                    ))}

                    <button className="btn btn-dark w-100 mt-3">CẬP NHẬT GIỎ HÀNG</button>
                </div>

                {/* RIGHT - Order Summary */}
                <div className="col-12 col-md-6 mt-desktop-77">
                    <div className="card p-4 shadow-sm">
                        <h5 className="mb-4">Tóm tắt đơn hàng</h5>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Thành tiền</span>
                            <span>{subtotal.toLocaleString()}₫</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold mb-3">
                            <span>Tổng cộng</span>
                            <span>{total.toLocaleString()}₫</span>
                        </div>
                        <div className="text-muted small mb-3">
                            <p>Đối với những sản phẩm có sẵn, giao hàng 2-7 ngày.</p>
                            <p>Không có sẵn: sẽ được nhân viên liên hệ.</p>
                            <p className="mt-2">T2–T6: 8:30 - 17:30 | T7,CN: 9:30 - 16:30</p>
                            <p className="text-warning mt-2">Cửa hàng gần bạn</p>
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                            <button className="btn btn-outline-dark">← TIẾP TỤC MUA HÀNG</button>
                            <button className="btn btn-dark"  onClick={() => navigate(`/orderform`)}>ĐẶT HÀNG</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
