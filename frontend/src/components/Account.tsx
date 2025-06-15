import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Css/Account.css";
import { Link } from "react-router-dom";

const Account = () => {
    return (
        <div className="account-page container py-5">
            <div className="row">
                {/* Sidebar */}
                <div className="col-lg-3 col-md-4 mb-4">
                    <div className="sidebar p-3 rounded shadow-sm bg-light">
                        <h5 className="mb-4 fw-bold">Tài khoản cá nhân</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/account" className="text-dark text-decoration-none">Thông tin của tôi</Link>
                            </li>
                            
                            <li className="mb-2">
                                <Link to="/userorder" className="text-dark text-decoration-none">Đơn hàng</Link>
                            </li>
                            
                            <li><a href="#" className="text-dark text-decoration-none">Đăng xuất</a></li>
                        </ul>
                    </div>
                </div>

                {/* Form Content */}
                <div className="col-lg-9 col-md-8">
                    <div className="form-container p-4 rounded shadow-sm bg-white">
                        <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Tên*</label>
                            <input type="text" className="form-control" placeholder="Tên" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Họ*</label>
                            <input type="text" className="form-control" placeholder="Họ" />
                        </div>
                        <div className="col-12 mb-3">
                            <label className="form-label">Tên hiển thị</label>
                            <input type="text" className="form-control" placeholder="Tên hiển thị" />
                            <small className="text-muted">Tên này sẽ được hiển thị ở phần tài khoản và bình luận</small>
                        </div>
                        <div className="col-12 mb-4">
                            <label className="form-label">Địa chỉ email</label>
                            <input type="email" className="form-control" placeholder="Địa chỉ email" />
                        </div>

                        <div className="col-12">
                            <h6 className="fw-bold mb-3">THAY ĐỔI MẬT KHẨU</h6>
                        </div>
                        <div className="col-12 mb-3">
                            <input type="password" className="form-control" placeholder="Mật khẩu hiện tại (để trống nếu không có thay đổi)" />
                        </div>
                        <div className="col-12 mb-3">
                            <input type="password" className="form-control" placeholder="Mật khẩu mới" />
                        </div>
                        <div className="col-12 mb-3">
                            <input type="password" className="form-control" placeholder="Xác nhận mật khẩu mới" />
                        </div>
                        <div className="col-12 mb-4">
                            <button className="btn btn-dark w-100 w-md-auto px-4">Lưu thay đổi</button>
                        </div>

                        <div className="col-12">
                            <h6 className="fw-bold mb-3">Địa chỉ</h6>
                        </div>
                        <div className="col-12 mb-3">
                            <button className="btn btn-outline-secondary btn-sm rounded-circle"><i className="bi bi-plus"></i></button>
                        </div>
                        <div className="col-md-6 mb-3">
                            <input type="text" className="form-control" placeholder="Nhập họ và tên" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input type="text" className="form-control" placeholder="Nhập địa chỉ" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input type="text" className="form-control" placeholder="Chọn quận / huyện" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input type="text" className="form-control" placeholder="Tỉnh / Thành phố" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input type="text" className="form-control" placeholder="Số điện thoại" />
                        </div>
                        <div className="col-md-6 mb-4">
                            <input type="email" className="form-control" placeholder="Địa chỉ email" />
                        </div>
                        <div className="col-12">
                            <button className="btn btn-dark w-100 w-md-auto px-4">Cập nhật</button>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;