import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HeaderAdmin() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState("products");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = searchText.trim();
        if (!trimmed) return;

        let path = "";
        switch (searchType) {
            case "products":
                path = "/admin/products";
                break;
            case "categories":
                path = "/admin/categories";
                break;
            case "customer":
                path = "/admin/customer";
                break;
            case "article":
                path = "/admin/article";
                break;
            case "orders":
                path = "/admin/orders";
                break;
            default:
                path = "/admin/products";
        }

        navigate(`${path}?search=${encodeURIComponent(trimmed)}`);
    };

    return (
        <nav className="navbar sticky-top navbar-expand-lg bg-white shadow-sm z-3">
            <div className="container px-3">

                {/* HÀNG 1: Logo + Avatar */}
                <div className="d-flex justify-content-between align-items-center py-2 flex-wrap w-100">
                    <div className="d-flex align-items-center">
                        <Link className="navbar-brand me-2" to="/">
                            <img src="/img/logog7.jpg" alt="Logo" style={{ height: "60px" }} />
                        </Link>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                    </div>

                    <div className="dropdown avatar-dropdown position-absolute end-0 mt-2 mt-lg-0 me-3">

                        <button
                            className="btn dropdown-toggle p-0 border-0 bg-transparent"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src="/img/admin.jpg"
                                alt="User Avatar"
                                className="rounded-circle border border-2"
                                style={{ height: "40px", width: "40px", objectFit: "cover" }}
                            />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <Link className="dropdown-item" to="/profile">Trang cá nhân</Link>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={() => alert("Đăng xuất thành công!")}>Đăng xuất</button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* HÀNG 2: Menu */}
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item me-5">
                            <Link className="nav-link fw-semibold active text-nowrap" to="/">TRANG CHỦ</Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link className="nav-link fw-semibold" to="/admin/dashboard">DASHBOARD</Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link className="nav-link fw-semibold" to="/admin/customer">USER</Link>
                        </li>
                    </ul>
                </div>

                {/* HÀNG 3: Thanh tìm kiếm */}
                <form className="d-flex align-items-center w-100 mt-2 mb-2" onSubmit={handleSearch}>
                    <select
                        className="form-select me-2 w-auto"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <option value="products">Sản phẩm</option>
                        <option value="categories">Danh mục</option>
                        <option value="customer">Người dùng</option>
                        <option value="article">Bài viết</option>
                        <option value="orders">Đơn hàng</option>
                    </select>

                    <input
                        type="search"
                        className="form-control me-2"
                        placeholder={`Tìm ${
                            searchType === "products"
                                ? "sản phẩm"
                                : searchType === "categories"
                                    ? "danh mục"
                                    : searchType === "customer"
                                        ? "người dùng"
                                        : searchType === "orders"
                                            ? "đơn hàng"
                                            : "bài viết"
                        }...`}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button className="btn btn-outline-primary" type="submit">
                        <i className="bi bi-search"></i>
                    </button>
                </form>
            </div>
        </nav>
    );
}
