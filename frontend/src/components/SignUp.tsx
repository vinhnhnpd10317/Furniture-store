import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { createCustomer } from "../api/Customer";

const Signup = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    ho_ten: '',
    email: '',
    mat_khau: '',
    so_dien_thoai: '',
    dia_chi: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const dataToSend = {
      ...formData,
      vai_tro: 'khach_hang',
    };

    try {
      const res = await createCustomer(dataToSend);
      console.log("Đăng ký thành công:", res);

      alert('Đăng ký thành công!');
      navigate("/login"); // Điều hướng sang trang đăng nhập
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.message === "Email đã tồn tại") {
        alert("Email đã tồn tại, vui lòng dùng email khác!");
      } else {
        alert((error.response?.data?.message || "Vui lòng thử lại sau"));
      }
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.ho_ten.trim()) {
      newErrors.ho_ten = 'Họ tên không được để trống';
    } else if (formData.ho_ten.trim().length <= 5) {
      newErrors.ho_ten = 'Họ tên không hợp lệ';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.mat_khau.trim()) {
      newErrors.mat_khau = 'Mật khẩu không được để trống';
    } else if (formData.mat_khau.length < 6) {
      newErrors.mat_khau = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!formData.so_dien_thoai.trim()) {
      newErrors.so_dien_thoai = 'Số điện thoại không được để trống';
    } else if (!/^0[0-9]{9}$/.test(formData.so_dien_thoai)) {
      newErrors.so_dien_thoai = 'Số điện thoại không hợp lệ';
    }

    if (!formData.dia_chi.trim()) {
      newErrors.dia_chi = 'Địa chỉ không được để trống';
    } else if (formData.dia_chi.trim().length <= 10) {
      newErrors.dia_chi = 'Địa chỉ không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const backgroundStyle: React.CSSProperties = {
    backgroundImage: 'url(https://nhaxinh.com/wp-content/uploads/2025/04/Ban-Nuoc-Valencia-Mat-Da-04.jpg)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    position: 'relative',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  };

  const cardStyle = {
    zIndex: 2,
    backgroundColor: 'rgba(255 255 255 / 35%)',
    borderRadius: '15px',
    padding: '30px',
    width: '100%',
    maxWidth: '550px',
    WebkitBackdropFilter: 'blur(10px)',
    color: 'white',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  };

  const inputStyle = {
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 15px',
  };

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}></div>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div style={cardStyle}>
          <h4 className="text-center mb-4 text-white">Đăng Ký</h4>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <div className="mb-4">
              <label htmlFor="ho_ten" className="form-label text-white text-start d-block">Họ và Tên</label>
              <input type="text" autoComplete="off" id="ho_ten" value={formData.ho_ten} onChange={handleChange} className="form-control" placeholder="Nhập họ và tên" style={inputStyle} required />
              {errors.ho_ten && <small className="text-danger">{errors.ho_ten}</small>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="form-label text-white text-start d-block">Email</label>
              <input type="email" autoComplete="off" id="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Nhập email" style={inputStyle} required />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

            <div className="mb-4">
              <label htmlFor="mat_khau" className="form-label text-white text-start d-block">Mật khẩu</label>
              <input type="password" autoComplete="off" id="mat_khau" value={formData.mat_khau} onChange={handleChange} className="form-control" placeholder="Nhập mật khẩu" style={inputStyle} required />
              {errors.mat_khau && <small className="text-danger">{errors.mat_khau}</small>}
            </div>

            <div className="mb-4">
              <label htmlFor="so_dien_thoai" className="form-label text-white text-start d-block">Số điện thoại</label>
              <input type="tel" autoComplete="off" id="so_dien_thoai" value={formData.so_dien_thoai} onChange={handleChange} className="form-control" placeholder="Nhập số điện thoại" style={inputStyle} required />
              {errors.so_dien_thoai && <small className="text-danger">{errors.so_dien_thoai}</small>}
            </div>

            <div className="mb-4">
              <label htmlFor="dia_chi" className="form-label text-white text-start d-block">Địa chỉ</label>
              <input type="text" autoComplete="off" id="dia_chi" value={formData.dia_chi} onChange={handleChange} className="form-control" placeholder="Nhập địa chỉ" style={inputStyle} required />
              {errors.dia_chi && <small className="text-danger">{errors.dia_chi}</small>}
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-warning text-white">Đăng Ký</button>
            </div>

            <p className="text-center text-white mb-4">Hoặc</p>

            <div className="d-flex justify-content-between mb-3 gap-2">
              <button type="button" className="btn btn-danger w-100">Đăng ký bằng Google</button>
              <button type="button" className="btn btn-primary w-100">Đăng ký bằng Facebook</button>
            </div>

            <p className="text-center text-white">
              Đã có tài khoản? <a href="/login" className="fw-bold text-white text-decoration-underline">Đăng nhập tại đây!</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup