import { Link } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header/Navbar (for mobile toggle) */}
      <nav className="navbar navbar-light bg-light d-md-none px-3 border-bottom">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Menu
        </button>
        <span className="navbar-brand mb-0 h1">Admin Panel</span>
      </nav>

      {/* Main Layout */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside
          className={`bg-light border-end d-none d-md-block`}
          style={{ width: 240 }}
        >
          <nav className="nav flex-column p-3">
            <Link className="nav-link text-dark" to="/admin/dashboard">🏠 Dashboard</Link>
            <Link className="nav-link text-dark" to="/admin/categories">📂 Danh mục</Link>
            <Link className="nav-link text-dark" to="/admin/products">📦 Sản phẩm</Link>
            <Link className="nav-link text-dark" to="/admin/customer">👤 Khách hàng</Link>
            <Link className="nav-link text-dark" to="/admin/article">📝 Bài viết</Link>
            <Link className="nav-link text-dark" to="/admin/orders">🛒 Đơn hàng</Link>
            <Link className="nav-link text-dark" to="/admin/comments">💬 Bình luận</Link>
            <Link className="nav-link text-dark" to="/admin/favorites">❤️ Yêu thích</Link>
          </nav>
        </aside>

        {/* Sidebar - Offcanvas on mobile */}
        <div
          className={`offcanvas offcanvas-start ${sidebarOpen ? "show" : ""}`}
          tabIndex={-1}
          style={{ visibility: sidebarOpen ? "visible" : "hidden", width: 240 }}
          onClick={() => setSidebarOpen(false)}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menu</h5>
            <button
              type="button"
              className="btn-close text-reset"
              onClick={() => setSidebarOpen(false)}
            ></button>
          </div>
          <div className="offcanvas-body">
            <nav className="nav flex-column">
              <Link className="nav-link text-dark" to="/admin/dashboard">🏠 Dashboard</Link>
              <Link className="nav-link text-dark" to="/admin/categories">📂 Danh mục</Link>
              <Link className="nav-link text-dark" to="/admin/products">📦 Sản phẩm</Link>
              <Link className="nav-link text-dark" to="/admin/customer">👤 Khách hàng</Link>
              <Link className="nav-link text-dark" to="/admin/article">📝 Bài viết</Link>
              <Link className="nav-link text-dark" to="/admin/orders">🛒 Đơn hàng</Link>
              <Link className="nav-link text-dark" to="/admin/comments">💬 Bình luận</Link>
              <Link className="nav-link text-dark" to="/admin/favorites">❤️ Yêu thích</Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-grow-1 p-3 bg-light">
          <div className="container-fluid">{children}</div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-light border-top text-dark text-center py-2">
        © 2025 Admin Panel - All rights reserved
      </footer>
    </div>
  );
}
