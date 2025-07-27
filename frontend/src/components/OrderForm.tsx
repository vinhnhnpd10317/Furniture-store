import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrderWithPayment } from "../api/CheckOutApi";
import { useCart } from "../components/Products/CartContext";
import { useAuth } from "../components/AuthContext";
import OrderForminfo from "./Products/OderForminfo";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Hàm xử lý giờ Việt Nam
function getVietnamTimeString(): string {
    const now = new Date();
    const offset = 7 * 60 * 60 * 1000;
    const vietnamTime = new Date(now.getTime() + offset);
    return vietnamTime.toISOString().slice(0, 19).replace('T', ' ');
}

export default function OrderForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cartItems, clearCart } = useCart();

    // Nếu được gọi từ "MUA NGAY", state.buyNowItem sẽ có
    const buyNowItem = location.state?.buyNowItem || null;
    const itemsToOrder = buyNowItem ? [buyNowItem] : cartItems;
    const subtotal = itemsToOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        note: "",
    });
    const [paymentMethod, setPaymentMethod] = useState<"tien_mat" | "chuyen_khoan">("tien_mat");

    const handleSubmit = async () => {
        if (!user) {
            alert("Vui lòng đăng nhập để đặt hàng");
            return;
        }
        try {
            const payload = {
                nguoi_dung_id: user.id,
                ngay_dat: getVietnamTimeString(),
                tong_tien: subtotal,
                phuong_thuc_thanh_toan: paymentMethod,
                trang_thai: "cho_xu_ly" as const,
                ghi_chu: form.note,
                chi_tiet_don_hang: itemsToOrder.map(item => ({
                    san_pham_id: item.id,
                    so_luong: item.quantity,
                    don_gia: item.price,
                })),
            };
            const result = await createOrderWithPayment(payload);
            alert("✅ Đặt hàng thành công! Mã đơn: " + result.don_hang_id);
            if (!buyNowItem) clearCart();
            navigate("/userorder");
        } catch (err) {
            alert("❌ Lỗi khi đặt hàng.");
            console.error(err);
        }
    };

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-lg-8">
                    <div className="card-header fw-bold">THÔNG TIN ĐƠN HÀNG</div>
                    <div className="card-body">
                        <OrderForminfo form={form} setForm={setForm} />
                    </div>
                    <h6 className="fw-bold mt-4">PHƯƠNG THỨC THANH TOÁN</h6>
                    <div className="d-flex gap-3 mt-2">
                        <div
                            className={`p-3 rounded border ${paymentMethod === "tien_mat" ? "bg-dark text-white" : ""}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setPaymentMethod("tien_mat")}
                        >
                            <i className="bi bi-cash me-2" /> Tiền mặt
                        </div>
                        <div
                            className={`p-3 rounded border ${paymentMethod === "chuyen_khoan" ? "bg-dark text-white" : ""}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setPaymentMethod("chuyen_khoan")}
                        >
                            <i className="bi bi-bank2 me-2" /> Chuyển khoản
                        </div>
                    </div>
                    {paymentMethod === "chuyen_khoan" && (
                        <div className="mt-3">
                            <strong>Ngân hàng Vietcombank</strong><br />
                            STK: 10312172526328520<br />
                            CTY G7PRIME - CN ĐÀ NẴNG
                        </div>
                    )}
                </div>
                <div className="col-lg-4">
                    <div className="p-4 bg-light rounded shadow-sm">
                        <h6 className="fw-bold">Tóm tắt đơn hàng</h6>
                        <div className="d-flex justify-content-between">
                            <span>Tổng tiền:</span>
                            <strong>{subtotal.toLocaleString()}₫</strong>
                        </div>
                        <hr />
                        <strong>Sản phẩm ({itemsToOrder.length}):</strong>
                        {itemsToOrder.map(item => (
                            <div key={item.id} className="d-flex align-items-center mt-2">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{ width: 50, height: 50, objectFit: "cover" }}
                                    className="me-2"
                                />
                                <div>
                                    <p className="mb-0">{item.name} × {item.quantity}</p>
                                    <small>{(item.price * item.quantity).toLocaleString()}₫</small>
                                </div>
                            </div>
                        ))}
                        <button className="btn btn-dark w-100 mt-4" onClick={handleSubmit}>ĐẶT HÀNG</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
