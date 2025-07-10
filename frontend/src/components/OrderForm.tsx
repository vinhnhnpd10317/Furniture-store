import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrderWithPayment } from "../api/CheckOutApi";
import { useCart } from "../components/Products/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Hàm xử lý giờ Việt Nam
function getVietnamTimeString(): string {
    const now = new Date();
    const offset = 7 * 60 * 60 * 1000; // +7 giờ
    const vietnamTime = new Date(now.getTime() + offset);
    return vietnamTime.toISOString().slice(0, 19).replace('T', ' ');
}

const Checkout = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"tien_mat" | "chuyen_khoan">("tien_mat");

    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = async () => {
        try {
        const payload = {
            nguoi_dung_id: 1, // Hardcoded user ID
            ngay_dat: getVietnamTimeString(), // ✅ Đã sửa giờ đúng
            tong_tien: subtotal,
            phuong_thuc_thanh_toan: paymentMethod,
            trang_thai: "cho_xu_ly" as const,
            ghi_chu: note,
            chi_tiet_don_hang: cartItems.map((item) => ({
            san_pham_id: item.id,
            so_luong: item.quantity,
            don_gia: item.price,
            })),
        };

        const result = await createOrderWithPayment(payload);
        alert("✅ Đặt hàng thành công! Mã đơn: " + result.don_hang_id);
        clearCart();
        navigate("/userorder");
        } catch (err) {
        alert("❌ Lỗi khi đặt hàng. Chi tiết console.");
        console.error(err);
        }
    };

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-lg-8">
                <h5 className="fw-bold mb-3">THÔNG TIN GIAO HÀNG</h5>
                <div className="mb-3">
                    <label>Họ và tên*</label>
                    <input className="form-control" value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Email*</label>
                    <input className="form-control" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Điện thoại*</label>
                    <input className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Địa chỉ*</label>
                    <input className="form-control" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Ghi chú</label>
                    <textarea className="form-control" value={note} onChange={e => setNote(e.target.value)} />
                </div>

                <h6 className="fw-bold">PHƯƠNG THỨC THANH TOÁN</h6>
                <div className="d-flex gap-3 mt-2">
                    <div className={`p-3 rounded border ${paymentMethod === "tien_mat" ? "bg-dark text-white" : ""}`} style={{ cursor: "pointer" }} onClick={() => setPaymentMethod("tien_mat")}>
                    <i className="bi bi-cash me-2"></i> Tiền mặt
                    </div>
                    <div className={`p-3 rounded border ${paymentMethod === "chuyen_khoan" ? "bg-dark text-white" : ""}`} style={{ cursor: "pointer" }} onClick={() => setPaymentMethod("chuyen_khoan")}>
                    <i className="bi bi-bank2 me-2"></i> Chuyển khoản
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
                        <strong>Sản phẩm ({cartItems.length}):</strong>
                        {cartItems.map(item => (
                        <div key={item.id} className="d-flex align-items-center mt-2">
                            <img src={item.image} alt={item.name} style={{ width: 50, height: 50, objectFit: "cover" }} className="me-2" />
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
};

export default Checkout;
