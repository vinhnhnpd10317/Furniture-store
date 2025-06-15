import { Link } from "react-router-dom";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex flex-column min-vh-100">

      {/* Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside className="bg-light border-end" style={{ width: 240 }}>
          <nav className="nav flex-column p-3">
            <Link className="nav-link text-dark" to="/admin/dashboard">🏠 Dashboard</Link>
            <Link className="nav-link text-dark" to="/admin/categories">📂 Danh mục</Link>
            <Link className="nav-link text-dark" to="/admin/products">📦 Sản phẩm</Link>
            <Link className="nav-link text-dark" to="/admin/customers">👤 Khách hàng</Link>
            <Link className="nav-link text-dark" to="/admin/orders">🛒 Đơn hàng</Link>
            <Link className="nav-link text-dark" to="/admin/comments">💬 Bình luận</Link>
            <Link className="nav-link text-dark" to="/admin/statistics">📊 Thống kê</Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-grow-1 p-4 bg-light">
          <div className="container-fluid">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-2">
        © 2025 Admin Panel - All rights reserved
      </footer>
    </div>
  );
}
