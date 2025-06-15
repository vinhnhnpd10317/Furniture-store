import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Css/UserOrders.css";

const UserOrders = () => {
  return (
    <div className="account-orders container py-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3 mb-4">
          <div className="bg-light p-4 rounded shadow-sm h-100">
            <h5 className="fw-bold mb-4 ">Tài khoản cá nhân</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-3 fw-bold ">Đơn hàng</li>
              <li className="mb-3"><a href="Account" className="text-dark text-decoration-none">Thông tin của tôi</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Đăng xuất</a></li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-6 mb-4">
          <div>
            <h4 className="fw-bold mb-3">Đơn hàng của tôi</h4>
            <ul className="nav nav-tabs border-0 mb-4">
              <li className="nav-item">
                <a className="nav-link active border-bottom border-warning text-dark fw-bold" href="#">Tất cả đơn hàng</a>
              </li>
              <li className="nav-item"><a className="nav-link text-muted" href="#">Đang xử lý</a></li>
              <li className="nav-item"><a className="nav-link text-muted" href="#">Đang giao</a></li>
              <li className="nav-item"><a className="nav-link text-muted" href="#">Đã hoàn thành</a></li>
              <li className="nav-item"><a className="nav-link text-muted" href="#">Trả lại</a></li>
            </ul>
            {/* Nội dung đơn hàng trống */}
            <div className="text-muted">Bạn chưa có đơn hàng nào.</div>
          </div>
        </div>

        {/* Sidebar Right */}
        <div className="col-lg-3">
          <div className="mb-4 p-3 border rounded">
            <h6 className="fw-bold">Danh sách yêu thích <span className="badge bg-danger">0</span></h6>
          </div>
          <div className="p-3 border rounded">
            <h6 className="fw-bold mb-3">Sản phẩm vừa xem <span className="badge bg-danger">27</span></h6>
            <div className="row row-cols-3 g-2">
              {Array.from({ length: 15 }).map((_, idx) => (
                <div key={idx} className="col">
                  <img src={`https://via.placeholder.com/60x60?text=${idx + 1}`} className="img-fluid" alt={`SP ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
