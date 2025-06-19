import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Css/Header.css";

const Header = () => {
  return (
    <>
      {/* TOP BAR */}
      <div className="bg-light border-bottom small px-3 py-2 d-none d-md-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <span><i className="bi bi-globe2 me-1"></i> VN | EN</span>
          <span className="text-danger fw-semibold">
            <i className="bi bi-telephone-fill me-1"></i> 0763701215
          </span>
          <span className="text-muted">Giới thiệu</span>
          <span className="text-muted">Khuyến mãi</span>
          <span className="text-danger fw-bold">Giảm giá đặc biệt ưu đãi</span>
        </div>

        {/* Desktop Icons */}
        <div className="d-none d-md-flex align-items-center gap-3 text-muted">
          <i className="bi bi-geo-alt"></i>
          <i className="bi bi-heart"></i>
          <Link to="/productcart" className="text-muted"><i className="bi bi-bag"></i></Link>
          <Link to="/login" className="d-flex align-items-center text-dark text-decoration-none">
            Đăng nhập <i className="bi bi-person ms-1"></i>
          </Link>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom px-3 py-3">
        <div className="container-fluid">

          {/* Toggle Button - nằm TRƯỚC logo */}
            <button
                className="navbar-toggler me-2 p-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mainNavbar"
                aria-controls="mainNavbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* Logo + Text */}
            <Link to="/" className="navbar-brand d-flex align-items-center">
            {/* Logo nhỏ cho mobile */}
            <img src="/img/logo.png" alt="Logo" width="40" className="me-2 d-block d-md-none" />
            
            {/* Logo lớn cho desktop */}
            <img src="/img/logo.png" alt="Logo" width="70" className="me-2 d-none d-md-block" />

            {/* Text: co lại font-size trên mobile */}
            <span className="fw-bold fs-6 fs-md-4">PRIME SEVEN</span>
            </Link>


          {/* NAV CONTENT */}
          <div className="collapse navbar-collapse mt-3 mt-md-0" id="mainNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-md-0">
              <li className="nav-item px-2">
                <Link className="nav-link text-dark fw-semibold" to="/">TRANG CHỦ</Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link text-dark fw-semibold" to="/products">SẢN PHẨM</Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link text-dark fw-semibold" to="#">PHÒNG</Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link text-dark fw-semibold" to="/aboutpage">GIỚI THIỆU</Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link text-dark fw-semibold" to="#">THIẾT KẾ NỘI THẤT</Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link text-dark fw-semibold" to="/inspiration">GÓC CẢM HỨNG</Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link text-dark fw-semibold" to="/contact">LIÊN HỆ</Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link text-dark fw-semibold" to="/article">BÀI VIẾT</Link>
              </li>
            </ul>

            {/* Search (desktop only) */}
            <div className="d-none d-md-block" style={{ width: "200px" }}>
              <input type="text" className="form-control" placeholder="Tìm kiếm sản phẩm" />
            </div>

            {/* Mobile: Search + Đăng nhập */}
            <div className="d-md-none w-100 mt-3 px-2">
              <input type="text" className="form-control mb-2" placeholder="Tìm kiếm sản phẩm" />
              <Link to="/login" className="btn btn-outline-dark w-100 d-flex justify-content-center align-items-center">
                Đăng nhập <i className="bi bi-person ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
