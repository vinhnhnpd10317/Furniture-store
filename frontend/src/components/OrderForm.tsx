import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Css/OrderForm.css";

const Checkout = () => {
  return (
        <div className="checkout-page container py-5">
            <div className="row">
                {/* Left side: Form */}
                <div className="col-lg-8">
                    <h5 className="fw-bold mb-3">ĐỊA CHỈ GIAO HÀNG</h5>
                    <button className="btn btn-outline-secondary btn-sm rounded-circle mb-3">
                        <i className="bi bi-plus"></i>
                    </button>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Họ và tên*</label>
                            <input type="text" className="form-control" placeholder="Nhập họ và tên" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Địa chỉ email*</label>
                            <input type="email" className="form-control" placeholder="Nhập email" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Số điện thoại*</label>
                            <input type="text" className="form-control" placeholder="Nhập số điện thoại của bạn" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Tỉnh/thành phố*</label>
                            <select className="form-select">
                                <option>Chọn tỉnh/thành phố</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Quận/huyện*</label>
                            <select className="form-select">
                                <option>Chọn quận/huyện</option>
                            </select>
                        </div>
                        <div className="col-12 mb-3">
                            <label className="form-label">Địa chỉ</label>
                            <input type="text" className="form-control" placeholder="Nhập địa chỉ" />
                        </div>
                        <div className="col-12 mb-4">
                            <label className="form-label fw-bold">THÔNG TIN THÊM</label>
                            <small className="d-block text-muted mb-2">Lưu ý cho đơn hàng (tuỳ chọn)</small>
                            <textarea className="form-control" rows={3} placeholder="Viết các lưu ý cho đơn hàng..."></textarea>
                        </div>
                    </div>

                    <div className="payment-method mb-4">
                        <h6 className="fw-bold">PHƯƠNG THỨC THANH TOÁN</h6>
                        <div className="d-flex gap-3 mt-3 flex-wrap">
                            <div className="payment-box border p-3 rounded d-flex align-items-center justify-content-center">
                                <i className="bi bi-box-seam me-2"></i> Thanh toán khi nhận hàng
                            </div>
                            <div className="payment-box border p-3 rounded d-flex align-items-center justify-content-center">
                                <i className="bi bi-bank2 me-2"></i> Nạp qua app ngân hàng
                            </div>
                        </div>

                        <div className="mt-3">
                            <p className="mb-1"><strong>Ngân hàng Vietcombank</strong></p>
                            <p className="mb-1">Số tài khoản: 10312172526328520</p>
                            <p className="mb-1">Tên chủ tài khoản: CT CP NỘI THẤT G7PRIME VIETCOMBANK – CHI NHÁNH TP.ĐÀ NẴNG.</p>
                        </div>
                    </div>
                </div>

                {/* Right side: Order Summary */}
                <div className="col-lg-4">
                    <div className="summary-box p-4 bg-light rounded shadow-sm">
                        <h6 className="fw-bold mb-3">Tóm tắt đơn hàng</h6>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Thành tiền</span>
                            <strong>19,000,000đ</strong>
                        </div>
                        <div className="d-flex justify-content-between border-top pt-2 mb-3">
                            <span className="fw-bold">TỔNG CỘNG</span>
                            <strong>19,000,000đ</strong>
                        </div>
                        <div className="mb-3">
                            <strong>Sản phẩm</strong> <span className="badge bg-dark ms-2">1</span>
                            <div className="d-flex align-items-center mt-2">
                                <img
                                src="https://nhaxinh.com/wp-content/uploads/2023/11/armchair-curio-104-nau.jpg"
                                alt="Armchair Curio"
                                className="img-thumbnail me-2"
                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                />
                                <div>
                                <p className="mb-0">Armchair Curio 104 × 1</p>
                                <small>19,000,000đ</small>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-dark w-100 mt-3">ĐẶT MUA</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
