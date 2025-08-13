import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrderWithPayment } from "../api/CheckOutApi";
import { createVNPayPayment } from "../api/Vnpayapi"; 
import { useCart } from "../components/Products/CartContext";
import { useAuth } from "../components/AuthContext";
import OrderForminfo from "./Products/OderForminfo";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function getVietnamTimeString(): string {
  const now = new Date();
  const offset = 7 * 60 * 60 * 1000;
  const vietnamTime = new Date(now.getTime() + offset);
  return vietnamTime.toISOString().slice(0, 19).replace("T", " ");
}

export default function OrderForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();

  const buyNowItem = location.state?.buyNowItem || null;
  const itemsToOrder = buyNowItem ? [buyNowItem] : cartItems;
  const subtotal = itemsToOrder.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<
    "tien_mat" | "chuyen_khoan"
  >("tien_mat");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để đặt hàng");
      return;
    }

    const newErrors: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 4) {
      newErrors.name = "Họ tên phải có ít nhất 4 ký tự";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^0[0-9]{9}$/.test(form.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!form.address.trim()) {
      newErrors.address = "Địa chỉ không được để trống";
    } else if (form.address.trim().length <= 10) {
      newErrors.address = "Địa chỉ phải dài hơn 10 ký tự";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      // 1️⃣ Tạo đơn hàng trước
      const payload = {
        nguoi_dung_id: user.id,
        ngay_dat: getVietnamTimeString(),
        tong_tien: subtotal,
        phuong_thuc_thanh_toan: paymentMethod,
        trang_thai: "cho_xu_ly" as const,
        ghi_chu: form.note,
        chi_tiet_don_hang: itemsToOrder.map((item) => ({
          san_pham_id: item.id,
          so_luong: item.quantity,
          don_gia: item.price,
        })),
      };

      const result = await createOrderWithPayment(payload);

      // 2️⃣ Nếu chọn VNPay thì tạo link và redirect
      if (paymentMethod === "chuyen_khoan") {
        const vnpayRes = await createVNPayPayment(
          result.don_hang_id,
          subtotal,
          `Thanh toan don hang #${result.don_hang_id}`
        );
        if (vnpayRes?.paymentUrl) {
          if (!buyNowItem) clearCart();
          window.location.href = vnpayRes.paymentUrl; // Chuyển sang VNPay
          return;
        } else {
          alert("❌ Không tạo được link VNPay");
          return;
        }
      }

      // 3️⃣ Nếu thanh toán tiền mặt
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
      <div className="row g-4">
        {/* Cột trái - Thông tin */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header fw-bold bg-dark text-white">
              THÔNG TIN ĐƠN HÀNG
            </div>
            <div className="card-body">
              <OrderForminfo form={form} setForm={setForm} errors={errors} />

              <h6 className="fw-bold mt-4">PHƯƠNG THỨC THANH TOÁN</h6>
              <div className="d-flex gap-3 mt-2">
                <div
                  className={`p-3 rounded border ${
                    paymentMethod === "tien_mat" ? "bg-dark text-white" : ""
                  }`}
                  style={{ cursor: "pointer", flex: 1 }}
                  onClick={() => setPaymentMethod("tien_mat")}
                >
                  <i className="bi bi-cash me-2" /> Tiền mặt
                </div>
                <div
                  className={`p-3 rounded border ${
                    paymentMethod === "chuyen_khoan" ? "bg-dark text-white" : ""
                  }`}
                  style={{ cursor: "pointer", flex: 1 }}
                  onClick={() => setPaymentMethod("chuyen_khoan")}
                >
                  <i className="bi bi-bank2 me-2" /> Chuyển khoản / VNPay
                </div>
              </div>

              {paymentMethod === "chuyen_khoan" && (
                <div className="mt-3 p-3 border rounded bg-light">
                  <strong>Ngân hàng Vietcombank</strong> <br />
                  STK: 10312172526328520 <br />
                  CTY G7PRIME - CN ĐÀ NẴNG
                  <div className="mt-2">
                    <img
                      src="/vnpay-logo.png"
                      alt="VNPay"
                      style={{ height: 40 }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cột phải - Tóm tắt */}
        <div className="col-lg-4">
          <div className="p-4 bg-light rounded shadow-sm sticky-top">
            <h6 className="fw-bold">Tóm tắt đơn hàng</h6>
            <div className="d-flex justify-content-between">
              <span>Tổng tiền:</span>
              <strong>{subtotal.toLocaleString()}₫</strong>
            </div>
            <hr />
            <strong>Sản phẩm ({itemsToOrder.length}):</strong>
            {itemsToOrder.map((item) => (
              <div key={item.id} className="d-flex align-items-center mt-2">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                  className="me-2"
                />
                <div>
                  <p className="mb-0">
                    {item.name} × {item.quantity}
                  </p>
                  <small>
                    {(item.price * item.quantity).toLocaleString()}₫
                  </small>
                </div>
              </div>
            ))}
            <button
              className="btn btn-dark w-100 mt-4 py-2 fw-bold"
              onClick={handleSubmit}
            >
              {paymentMethod === "chuyen_khoan"
                ? "THANH TOÁN VNPay"
                : "ĐẶT HÀNG"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
