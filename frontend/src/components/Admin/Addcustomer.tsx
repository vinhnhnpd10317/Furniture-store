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
      navigate('/admin/customer'); // quay lại danh sách sau khi thêm
    });
  };

  return (
    <div className="container mt-4">
      <h2>Thêm khách hàng</h2>
      <div className="row g-3">
        {['ho_ten', 'email', 'mat_khau', 'so_dien_thoai', 'dia_chi', 'vai_tro'].map(field => (
          <div key={field} className="col-md-6">
            <input
              className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
              name={field}
              value={(form as any)[field]}
              onChange={handleChange}
              placeholder={field.replace('_', ' ').toUpperCase()}
            />
            {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
          </div>
        ))}
      </div>

      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={handleSubmit}>Thêm</button>
        <button className="btn btn-secondary" onClick={() => navigate('/admin/customer')}>Quay lại</button>
      </div>
    </div>
  );
}
