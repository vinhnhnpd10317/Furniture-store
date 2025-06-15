import React, { useState } from 'react';
import "../Css/Productcart.css";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    material: string;
    texture: string;
    image: string;
}

const initialCartItems: CartItem[] = [
    {
        id: 1,
        name: 'Armchair Mimi',
        price: 3490000,
        quantity: 1,
        material: '4246',
        texture: '4247',
        image: 'https://nhaxinh.com/wp-content/uploads/2024/08/ban-nuoc-orientale-walnut-600x400.jpg',
    },
    {
        id: 2,
        name: 'Armchair Mimi',
        price: 3490000,
        quantity: 1,
        material: '4246',
        texture: '4247',
        image: 'https://nhaxinh.com/wp-content/uploads/2024/08/ban-nuoc-orientale-walnut-600x400.jpg',
    },
    {
        id: 3,
        name: 'Armchair Mimi',
        price: 3490000,
        quantity: 1,
        material: '4246',
        texture: '4247',
        image: 'https://nhaxinh.com/wp-content/uploads/2024/08/ban-nuoc-orientale-walnut-600x400.jpg',
    },
];

export default function ProductCart() {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    const handleIncrease = (id: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrease = (id: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
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
                                <p className="text-muted mb-1">pa_vat-lieu: {item.material}</p>
                                <p className="text-muted mb-1">pa_chat-lieu: {item.texture}</p>
                                <p className="text-danger fw-bold mb-2">
                                    {(item.price * item.quantity).toLocaleString()}₫
                                </p>
                            </div>
                            <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                                <button className="btn btn-outline-secondary" onClick={() => handleDecrease(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button className="btn btn-outline-secondary" onClick={() => handleIncrease(item.id)}>+</button>
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
                            <button className="btn btn-dark">ĐẶT HÀNG</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
