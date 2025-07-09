import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HeaderAdmin() {
    const navigate = useNavigate();
    // const location = useLocation();
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
        <nav className="navbar sticky-top navbar-expand-lg bg-white shadow-sm">
            <div className="container">
                <Link className="navbar-brand" to="/">
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

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item me-5">
                            <Link className="nav-link fw-semibold active" to="/">TRANG CHỦ</Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link className="nav-link fw-semibold" to="/admin/dashboard">DASHBOARD</Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link className="nav-link fw-semibold" to="/admin/customer">USER</Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link className="nav-link fw-semibold" to="/">SETTING</Link>
                        </li>
                    </ul>
                </div>

                {/* Form tìm kiếm nâng cao */}
                <form className="d-flex align-items-center me-3" onSubmit={handleSearch}>
                    <select
                        className="form-select me-2"
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
                            ? "dơn hàng"
                            : "bài viết"    
                        }...`}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button className="btn btn-outline-primary" type="submit">
                        <i className="bi bi-search"></i>
                    </button>
                </form>

                {/* Avatar */}
                <div className="dropdown">
                    <button
                        className="btn dropdown-toggle p-0 border-0 bg-transparent"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                        src="/img/admin.jpg"
                        alt="User Avatar"
                        className="rounded-circle"
                        style={{ height: "40px", width: "40px", objectFit: "cover" }}
                        />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                            <Link className="dropdown-item" to="/profile">Trang cá nhân</Link>
                        </li>

                        <li>
                            <button className="dropdown-item" onClick={() => alert("Đăng xuất thành công!")}>
                                Đăng xuất
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
  );
}
