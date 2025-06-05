import { Link } from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm">
            <div className="container">
                {/* Logo */}
                <Link className="navbar-brand" to="/">
                    <img src="../public/img/logog7.jpg" alt="Logo" />
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
                        <li className="nav-item me-3">
                            <Link className="nav-link fw-semibold active" to="/">
                                TRANG CHỦ
                            </Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link className="nav-link fw-semibold" to="/companyinfo">
                                THÔNG TIN VỀ G7 PRIME
                            </Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link className="nav-link fw-semibold" to="/">
                                SẢN PHẨM
                            </Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link className="nav-link fw-semibold" to="/">
                                TIN TỨC
                            </Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link className="nav-link fw-semibold" to="/contact">
                                LIÊN HỆ
                            </Link>
                        </li>
                    </ul>
                </div>

            {/* Form tìm  kiếm */}
            <form action="" className="d-flex">
                <input type="search" className="form-control me-2" placeholder="Tìm kiếm..." aria-label="Search" />
                <button className="btn btn-outline-primary" type="submit" >
                    <i className="bi bi-search"></i>
                </button>
            </form>
            </div>
        </nav>
    )
}