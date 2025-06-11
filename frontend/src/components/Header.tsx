import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = () => {
  return (
    <>
        {/* TOP BAR */}
        <div className="bg-light border-bottom small px-4 py-2 d-flex justify-content-between align-items-center">
            {/* LEFT SIDE */}
            <div className="d-flex align-items-center gap-3">
            <span><i className="bi bi-globe2 me-1"></i> VN | EN</span>
            <span className="text-danger fw-semibold">
                <i className="bi bi-telephone-fill me-1"></i> 0763701215
            </span>
            <span className="text-muted">Giới thiệu</span>
            <span className="text-muted">Khuyến mãi</span>
            <span className="text-danger fw-bold">Giảm giá đặc biệt</span>
            </div>

            {/* RIGHT SIDE ICONS */}
            <div className="d-flex align-items-center gap-3 text-muted">
            <i className="bi bi-geo-alt"></i>
            <i className="bi bi-heart"></i>
            <Link to="/productcart">
                <i className="bi bi-bag"></i>
            </Link>

            <Link to="/login" className="d-flex align-items-center text-dark text-decoration-none">
                Đăng nhập <i className="bi bi-person ms-1"></i>
            </Link>
            </div>
        </div>

        {/* MAIN HEADER */}
        <header className="border-bottom py-4 px-4">
            <div className="container-fluid d-flex align-items-center">
                {/* LOGO */}
                <div className="d-flex align-items-center me-4">
                    <img
                    src="../public/img/logo.png"
                    alt="Logo"
                    width="100"
                    height="90"
                    className="me-2"
                    />
                    
                </div>

                {/* NAVIGATION - nằm sát bên LOGO */}
                <ul className="nav ms-4">
                    <li className="nav-item mx-3">
                        <Link className="nav-link text-dark fw-semibold" to="/">TRANG CHỦ</Link>
                    </li>
                    <li className="nav-item mx-3">
                        <Link className="nav-link text-dark fw-semibold" to="products">SẢN PHẨM</Link>
                    </li>
                    <li className="nav-item mx-3">
                        <Link className="nav-link text-dark fw-semibold" to="#">PHÒNG</Link>
                    </li>
                    <li className="nav-item mx-3">
                        <Link className="nav-link text-dark fw-semibold" to="aboutpage">BỘ SƯU TẬP</Link>
                    </li>
                    <li className="nav-item mx-3">
                        <Link className="nav-link text-dark fw-semibold" to="#">THIẾT KẾ NỘI THẤT</Link>
                    </li>
                    <li className="nav-item mx-3">
                        <Link className="nav-link text-dark fw-semibold" to="#">GÓC CẢM HỨNG</Link>
                    </li>
                    <li className="nav-item mx-3">
                        <Link className="nav-link text-dark fw-semibold" to="contact">LIÊN HỆ</Link>
                    </li>
                </ul>

                {/* SEARCH BAR - nằm ngoài cùng phải */}
                <div className="ms-auto" style={{ width: "200px" }}>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm sản phẩm"
                    />
                </div>
            </div>
        </header>
    </>
  );
};

export default Header;