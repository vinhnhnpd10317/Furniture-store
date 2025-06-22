import { useEffect, useState } from 'react';
import {
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  type Customer,
  initialCustomerForm
} from '../../api/Customer';

export default function CustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState(initialCustomerForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    getCustomer().then(setCustomers);
  };

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
    setForm({ ...form, [e.target.name]: e.target.value });
    // Xoá lỗi khi người dùng sửa đúng
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }
    if (editingId) {
      updateCustomer(editingId, form).then(() => {
        fetchCustomers();
        resetForm();
      });
    } else {
      createCustomer(form).then(() => {
        fetchCustomers();
        resetForm();
      });
    }
  };

  const handleEdit = (c: Customer) => {
    setForm(c);
    setEditingId(c.id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc muốn xoá khách hàng này?')) {
      deleteCustomer(id).then(fetchCustomers);
    }
  };

  const resetForm = () => {
    setForm(initialCustomerForm);
    setEditingId(null);
    setErrors({});
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý khách hàng</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{editingId ? 'Cập nhật khách hàng' : 'Thêm khách hàng mới'}</h5>

          <div className="row g-3">
            <div className="col-md-6">
              <input
                className={`form-control ${errors.ho_ten ? 'is-invalid' : ''}`}
                name="ho_ten"
                value={form.ho_ten}
                onChange={handleChange}
                placeholder="Họ tên"
              />
              {errors.ho_ten && <div className="invalid-feedback">{errors.ho_ten}</div>}
            </div>
            <div className="col-md-6">
              <input
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="col-md-6">
              <input
                className={`form-control ${errors.mat_khau ? 'is-invalid' : ''}`}
                name="mat_khau"
                value={form.mat_khau}
                onChange={handleChange}
                placeholder="Mật khẩu"
              />
              {errors.mat_khau && <div className="invalid-feedback">{errors.mat_khau}</div>}
            </div>
            <div className="col-md-6">
              <input
                className={`form-control ${errors.so_dien_thoai ? 'is-invalid' : ''}`}
                name="so_dien_thoai"
                value={form.so_dien_thoai}
                onChange={handleChange}
                placeholder="Số điện thoại"
              />
              {errors.so_dien_thoai && <div className="invalid-feedback">{errors.so_dien_thoai}</div>}
            </div>
            <div className="col-md-6">
              <input
                className={`form-control ${errors.dia_chi ? 'is-invalid' : ''}`}
                name="dia_chi"
                value={form.dia_chi}
                onChange={handleChange}
                placeholder="Địa chỉ"
              />
              {errors.dia_chi && <div className="invalid-feedback">{errors.dia_chi}</div>}
            </div>
            <div className="col-md-6">
              <input
                className={`form-control ${errors.vai_tro ? 'is-invalid' : ''}`}
                name="vai_tro"
                value={form.vai_tro}
                onChange={handleChange}
                placeholder="Vai trò"
              />
              {errors.vai_tro && <div className="invalid-feedback">{errors.vai_tro}</div>}
            </div>
          </div>

          <div className="mt-3">
            <button className="btn btn-primary me-2" onClick={handleSubmit}>
              {editingId ? 'Cập nhật' : 'Thêm mới'}
            </button>
            <button className="btn btn-secondary" onClick={resetForm}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Họ tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Địa chỉ</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.ho_ten}</td>
              <td>{c.email}</td>
              <td>{c.so_dien_thoai}</td>
              <td>{c.dia_chi}</td>
              <td>{c.vai_tro}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(c)}>
                  Sửa
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c.id)}>
                  Xoá
                </button>
              </td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                Không có khách hàng nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
