  import React, { useState, useEffect } from "react";
  import { Link, useNavigate, useLocation } from "react-router-dom";
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap-icons/font/bootstrap-icons.css";
  import "bootstrap/dist/js/bootstrap.bundle.min.js";
  import "./Css/Header.css";
  import { useAuth } from "../components/AuthContext";
  import { getFavoritesByUser } from "../api/FavoriteApi";
  import { useCart } from "../components/Products/CartContext";

  const Header = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [favoriteCount, setFavoriteCount] = useState(0);

    useEffect(() => {
      const loadFavorites = async () => {
        if (user?.id) {
          try {
            const favorites = await getFavoritesByUser(user.id);
            setFavoriteCount(favorites.length);
          } catch (err) {
            console.error("Lỗi khi lấy danh sách yêu thích:", err);
          }
        } else {
          setFavoriteCount(0);
        }
      };
      loadFavorites();
    }, [user]);

    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const search = params.get("search") || "";
      setKeyword(search);
    }, [location]);

    const handleSearch = () => {
      const trimmed = keyword.trim();
      if (!trimmed) return;
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
      setKeyword("");
    };

    return (
      <>
        <style>{`
          .nav-item.dropdown:hover .dropdown-menu {
            display: block;
            margin-top: 0.3rem;
          }
          .navbar .dropdown-menu {
            top: 100%;
            margin-top: 0;
            transition: all 0.2s ease-in-out;
            z-index: 9999;
          }
          .dropdown-menu {
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease-in-out;
          }
          .nav-item.dropdown:hover .dropdown-menu {
            opacity: 1;
            visibility: visible;
          }
        `}</style>

        <header className="sticky-top shadow-sm">
          {/* TOP BAR */}
          <div className="bg-light border-bottom small px-3 py-2 d-none d-md-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <span><i className="bi bi-globe2 me-1"></i> VN | EN</span>
              <span className="text-danger fw-semibold">
                <i className="bi bi-telephone-fill me-1"></i> 0352 885 026
              </span>
            <Link to="/aboutpage" className="text-decoration-none">
              <span className="text-muted">Giới thiệu</span>
            </Link>

            </div>

            {/* Desktop Icons */}
            <div className="d-none d-md-flex align-items-center gap-3 text-muted">
              <Link to="/store-map" className="text-muted">
                <i className="bi bi-geo-alt" style={{ cursor: "pointer" }}></i>
              </Link>

              <Link to="/favorites" className="text-muted position-relative">
                <i className="bi bi-heart fs-6"></i>
                {favoriteCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {favoriteCount}
                  </span>
                )}
              </Link>

              <Link to="/productcart" className="text-muted position-relative">
                <i className="bi bi-bag fs-6"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="d-flex align-items-center gap-2">
                  <Link to="/userorder" className="fw-semibold text-dark text-decoration-none">
                    Xin chào, {user.name}
                  </Link>
                  <button className="btn btn-sm btn-outline-dark" onClick={logout}>Đăng xuất</button>
                </div>
              ) : (
                <Link to="/login" className="d-flex align-items-center text-dark text-decoration-none">
                  Đăng nhập <i className="bi bi-person ms-1"></i>
                </Link>
              )}
            </div>
          </div>

          {/* NAVBAR */}
          <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom px-3 py-3">
            <div className="container-fluid">
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

              {/* Logo */}
              <Link to="/" className="navbar-brand d-flex align-items-center">
                <img src="/img/logo.png" alt="Logo" width="40" className="me-2 d-block d-md-none" />
                <img src="/img/logo.png" alt="Logo" width="70" className="me-2 d-none d-md-block" />
                <span className="fw-bold fs-6 fs-md-4">PRIME SEVEN</span>
              </Link>

              {/* Mobile Search + Icons */}
              <div className="d-md-none w-100 mt-3 px-2">
                <div className="input-group mb-2">
                  <input
                    type="text"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") handleSearch(); }}
                    className="form-control"
                    placeholder="Tìm kiếm sản phẩm"
                  />
                  <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                    <i className="bi bi-search"></i>
                  </button>
                </div>

                <div className="d-flex justify-content-around align-items-center mb-2">
                  <Link to="/store-map" className="text-muted">
                    <i className="bi bi-geo-alt fs-5"></i>
                  </Link>

                  <Link to="/favorites" className="text-muted position-relative">
                    <i className="bi bi-heart fs-5"></i>
                    {favoriteCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {favoriteCount}
                      </span>
                    )}
                  </Link>

                  <Link to="/productcart" className="text-muted position-relative">
                    <i className="bi bi-bag fs-5"></i>
                    {cartCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  {user ? (
                    <>
                      <Link to="/userorder" className="text-dark text-decoration-none">
                        {user.name}
                      </Link>
                      <button className="btn btn-sm btn-outline-dark ms-1" onClick={logout}>Đăng xuất</button>
                    </>
                  ) : (
                    <Link to="/login" className="text-dark text-decoration-none">
                      <i className="bi bi-person fs-5"></i>
                    </Link>
                  )}
                </div>
              {/* NAV CONTENT */}
              <div className="collapse navbar-collapse mt-3 mt-md-0" id="mainNavbar">
                <ul className="navbar-nav mx-auto mb-2 mb-md-0">
                  <li className="nav-item px-2"><Link className="nav-link text-dark fw-semibold" to="/">TRANG CHỦ</Link></li>
                  <li className="nav-item px-2"><Link className="nav-link text-dark fw-semibold" to="/products">SẢN PHẨM</Link></li>
                  <li className="nav-item dropdown px-2">
                    <a href="#" className="nav-link text-dark fw-semibold" role="button" data-bs-toggle="dropdown">PHÒNG</a>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item fw-light" to="/rooms/living-room">PHÒNG KHÁCH</Link></li>
                      <li><Link className="dropdown-item fw-light" to="/rooms/kitchen">PHÒNG BẾP</Link></li>
                      <li><Link className="dropdown-item fw-light" to="/rooms/bedroom">PHÒNG NGỦ</Link></li>
                      <li><Link className="dropdown-item fw-light" to="/rooms/bathroom">PHÒNG TẮM</Link></li>
                      <li><Link className="dropdown-item fw-light" to="/rooms/workspace">PHÒNG LÀM VIỆC</Link></li>
                      <li><Link className="dropdown-item fw-light" to="/rooms/kids-room">PHÒNG TRẺ EM</Link></li>
                    </ul>
                  </li>
                  <li className="nav-item px-2"><Link className="nav-link text-dark fw-semibold" to="/aboutpage">GIỚI THIỆU</Link></li>
                  <li className="nav-item px-2"><Link className="nav-link text-dark fw-semibold" to="/interior-design">THIẾT KẾ NỘI THẤT</Link></li>
                  <li className="nav-item px-2"><Link className="nav-link text-dark fw-semibold" to="/inspiration">GÓC CẢM HỨNG</Link></li>
                  <li className="nav-item px-2"><Link className="nav-link text-dark fw-semibold" to="/contact">LIÊN HỆ</Link></li>
                </ul>

                {/* Search (desktop only) */}
                <div className="d-none d-md-block" style={{ width: "200px" }}>
                  <input
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") handleSearch(); }}
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm sản phẩm"
                  />
                </div>

                {/* Mobile Search + Icons */}
  <div className="d-md-none w-100 mt-3 px-2">
    <div className="input-group mb-2">
      <input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") handleSearch(); }}
        className="form-control"
        placeholder="Tìm kiếm sản phẩm"
      />
      <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
        <i className="bi bi-search"></i>
      </button>
    </div>

    <div className="d-flex justify-content-around align-items-center mb-2">
      <Link to="/store-map" className="text-muted">
        <i className="bi bi-geo-alt fs-5"></i>
      </Link>

      <Link to="/favorites" className="text-muted position-relative">
        <i className="bi bi-heart fs-5"></i>
        {favoriteCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {favoriteCount}
          </span>
        )}
      </Link>

      <Link to="/productcart" className="text-muted position-relative">
        <i className="bi bi-bag fs-5"></i>
        {cartCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cartCount}
          </span>
        )}
      </Link>

      {user ? (
        <>
          <Link to="/userorder" className="text-dark text-decoration-none">
            {user.name}
          </Link>
          <button className="btn btn-sm btn-outline-dark ms-1" onClick={logout}>Đăng xuất</button>
        </>
      ) : (
        <Link to="/login" className="text-dark text-decoration-none">
          <i className="bi bi-person fs-5"></i>
        </Link>
      )}
    </div>
  </div>
              </div>
            </div>
          </nav>
        </header>
      </>
    );
  };

  export default Header;
