import React, { useEffect, useState } from "react";
import { getCustomerById, updateCustomer, changeCustomerPassword  } from "../api/Customer";
import type { Customer } from "../api/Customer";
import { useAuth } from "./AuthContext";
import { Link, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Account = () => {
const { user: authUser } = useAuth();
const [user, setUser] = useState<Customer | null>(null);
const [editingField, setEditingField] = useState<string | null>(null);
const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
});

const location = useLocation();
const isActive = (path: string) => location.pathname === path;

useEffect(() => {
    const fetchUser = async () => {
        if (!authUser?.id) return;
        try {
            const data = await getCustomerById(authUser.id);
            setUser(data);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
        }
    };
    fetchUser();
}, [authUser]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
};

const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
};

const handleSave = async () => {
  if (!user || !authUser?.id) return;

  if (editingField === "mat_khau") {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ các trường mật khẩu.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận không khớp.");
      return;
    }

    try {
        // kiểm tra mật khẩu cũ
        await changeCustomerPassword(authUser.id, currentPassword, newPassword);
        alert("Cập nhật mật khẩu thành công!");
        setEditingField(null);
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            alert(error.message);
            console.error("Lỗi khi đổi mật khẩu:", error.message);
        } else {
            alert("Lỗi đổi mật khẩu");
            console.error("Lỗi không xác định:", error);
        }
    }
    } else {
        try {
            await updateCustomer(authUser.id, user);
            alert("Cập nhật thông tin thành công!");
            setEditingField(null);
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin:", error);
        }
    }
};


const renderField = (label: string, name: keyof Customer, type: string = "text") => (
<div className="mb-3 row">
    <label className="col-sm-2 col-form-label">{label}</label>
    <div className="col-sm-8">
        <input
            type={type}
            className="form-control"
            name={name}
            value={user?.[name] || ""}
            onChange={handleChange}
            disabled={editingField !== name}
        />
    </div>
    <div className="col-sm-2">
        {editingField === name ? (
            <button className="btn btn-success" onClick={handleSave}>
            Lưu
            </button>
        ) : (
            <button className="btn btn-outline-primary" onClick={() => setEditingField(name)}>
            Chỉnh sửa
            </button>
        )}
    </div>
</div>
);

const renderPasswordFields = () => (
<>
    <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Mật khẩu hiện tại</label>
        <div className="col-sm-10">
            <input
            type="password"
            className="form-control"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            />
        </div>
    </div>

    <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Mật khẩu mới</label>
        <div className="col-sm-10">
            <input
            type="password"
            className="form-control"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            />
        </div>
    </div>
    
    <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Xác nhận mật khẩu</label>
        <div className="col-sm-10">
            <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            />
        </div>
    </div>

    <div className="text-end">
        <button className="btn btn-success" onClick={handleSave}>
            Lưu mật khẩu
        </button>
    </div>
</>
);

return (
<div className="container mt-4">
    <div className="row">
        {/* Sidebar bên trái – gộp từ UserOrders */}
        <div className="col-lg-3 mb-4">
            <div className="bg-light p-4 rounded shadow-sm h-100">
                <h5 className="fw-bold mb-4">Tài khoản</h5>
                <ul className="list-unstyled mb-0">
                    <li className="mb-3">
                        <Link
                        to="/account"
                        className={`text-decoration-none d-block ${
                            isActive("/account") ? "fw-bold text-primary" : "text-dark"
                        }`}
                        >
                        <i className="bi bi-person-circle me-2"></i>
                        Thông tin của tôi
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link
                        to="/userorder"
                        className={`text-decoration-none d-block ${
                            isActive("/userorder") ? "fw-bold text-primary" : "text-dark"
                        }`}
                        >
                        <i className="bi bi-bag-check-fill me-2"></i>
                        Đơn hàng
                        </Link>
                    </li>
                    {user?.vai_tro === "quan_tri" && (
                        <li className="mb-3">
                        <Link
                            to="/admin/dashboard"
                            className="text-decoration-none d-block text-dark"
                        >
                            <i className="bi bi-speedometer2 me-2"></i>
                            Trang quản trị
                        </Link>
                        </li>
                    )}
                    <li>
                        <a href="#" className="text-decoration-none d-block text-dark">
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Đăng xuất
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        {/* Nội dung bên phải */}
        <div className="col-lg-9">
            <h3 className="mb-4">Thông tin tài khoản</h3>
            {user ? (
                <>
                {renderField("Họ tên", "ho_ten")}
                {renderField("Email", "email", "email")}
                {renderField("Số điện thoại", "so_dien_thoai")}
                {renderField("Địa chỉ", "dia_chi")}

                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Mật khẩu</label>
                    <div className="col-sm-8">
                        <input
                            type="password"
                            className="form-control"
                            value="********"
                            disabled
                        />
                    </div>
                    <div className="col-sm-2">
                    {editingField === "mat_khau" ? (
                        <button
                        className="btn btn-outline-secondary"
                        onClick={() => setEditingField(null)}
                        >
                        Huỷ
                        </button>
                    ) : (
                        <button
                        className="btn btn-outline-primary"
                        onClick={() => setEditingField("mat_khau")}
                        >
                        Đổi mật khẩu
                        </button>
                    )}
                    </div>
                </div>

                {editingField === "mat_khau" && renderPasswordFields()}
                </>
            ) : (
                <p>Đang tải dữ liệu người dùng...</p>
            )}
        </div>
    </div>
</div>
);
};

export default Account;
