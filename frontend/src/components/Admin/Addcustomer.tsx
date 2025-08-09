// src/pages/CustomerAdd.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCustomer, initialCustomerForm, type Customer } from '../../api/Customer';

export default function CustomerAdd() {
  const [form, setForm] = useState<Customer>(initialCustomerForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.ho_ten.trim()) newErrors.ho_ten = 'Họ tên không được để trống';
    if (!form.email.trim()) newErrors.email = 'Email không được để trống';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email không hợp lệ';
    if (!form.mat_khau.trim()) newErrors.mat_khau = 'Mật khẩu không được để trống';
    if (!form.so_dien_thoai.trim()) newErrors.so_dien_thoai = 'SĐT không được để trống';
    if (!form.dia_chi.trim()) newErrors.dia_chi = 'Địa chỉ không được để trống';
    if (!form.vai_tro.trim()) newErrors.vai_tro = 'Vai trò không được để trống';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = () => {
    if (!validate()) return;
    createCustomer(form).then(() => {
      navigate('/admin/customer');
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Thêm khách hàng</h2>
      <div className="card p-4 shadow-sm">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="ho_ten" className="form-label">Họ tên</label>
            <input
              type="text"
              className={`form-control ${errors.ho_ten ? 'is-invalid' : ''}`}
              name="ho_ten"
              value={form.ho_ten}
              onChange={handleChange}
            />
            {errors.ho_ten && <div className="invalid-feedback">{errors.ho_ten}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="mat_khau" className="form-label">Mật khẩu</label>
            <input
              type="password"
              className={`form-control ${errors.mat_khau ? 'is-invalid' : ''}`}
              name="mat_khau"
              value={form.mat_khau}
              onChange={handleChange}
            />
            {errors.mat_khau && <div className="invalid-feedback">{errors.mat_khau}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="so_dien_thoai" className="form-label">Số điện thoại</label>
            <input
              type="text"
              className={`form-control ${errors.so_dien_thoai ? 'is-invalid' : ''}`}
              name="so_dien_thoai"
              value={form.so_dien_thoai}
              onChange={handleChange}
            />
            {errors.so_dien_thoai && <div className="invalid-feedback">{errors.so_dien_thoai}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="dia_chi" className="form-label">Địa chỉ</label>
            <input
              type="text"
              className={`form-control ${errors.dia_chi ? 'is-invalid' : ''}`}
              name="dia_chi"
              value={form.dia_chi}
              onChange={handleChange}
            />
            {errors.dia_chi && <div className="invalid-feedback">{errors.dia_chi}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="vai_tro" className="form-label">Vai trò</label>
            <input
              type="text"
              className={`form-control ${errors.vai_tro ? 'is-invalid' : ''}`}
              name="vai_tro"
              value={form.vai_tro}
              onChange={handleChange}
            />
            {errors.vai_tro && <div className="invalid-feedback">{errors.vai_tro}</div>}
          </div>
        </div>

        <div className="mt-3">
          <button className="btn btn-primary me-2" onClick={handleSubmit}>Thêm</button>
          <button className="btn btn-secondary" onClick={() => navigate('/admin/customer')}>Quay lại</button>
        </div>
      </div>
    </div>
  );
}
