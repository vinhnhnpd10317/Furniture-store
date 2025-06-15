import { Link } from "react-router-dom";

export default function HeaderAdmin() {
    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm">
            <div className="container">
                {/* Logo */}
                <Link className="navbar-brand" to="/">
                    <img src="../public/img/logog7.jpg" alt="Logo" style={{ height: "60px" }} />
                </Link>

                {/* Toggle menu cho mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                {/* Menu */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item me-5">
                            <Link className="nav-link fw-semibold active" to="/">
                                TRANG CHỦ
                            </Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link className="nav-link fw-semibold" to="/admin/dashboard">
                                DASHBOARD
                            </Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link className="nav-link fw-semibold" to="/">
                                USER
                            </Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link className="nav-link fw-semibold" to="/">
                                SETTING
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Form tìm kiếm */}
                <form action="" className="d-flex me-3">
                    <input
                        type="search"
                        className="form-control me-2"
                        placeholder="Tìm kiếm..."
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-primary" type="submit">
                        <i className="bi bi-search"></i>
                    </button>
                </form>

                {/* Avatar + dropdown */}
                <div className="dropdown">
                    <button
                        className="btn dropdown-toggle p-0 border-0 bg-transparent"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src="../public/img/admin.jpg"
                            alt="User Avatar"
                            className="rounded-circle"
                            style={{ height: "40px", width: "40px", objectFit: "cover" }}
                        />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                            <Link className="dropdown-item" to="/profile">
                                Trang cá nhân
                            </Link>
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
