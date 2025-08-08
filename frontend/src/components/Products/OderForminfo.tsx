// import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getCustomerById } from "../../api/Customer";
import { useAuth } from "../AuthContext";


interface Props {
  form: {
    name: string;
    email: string;
    phone: string;
    address: string;
    note: string;
  };
  setForm: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    phone: string;
    address: string;
    note: string;
  }>>;
  errors?: Record<string, string>;
}

export default function OrderForminfo({ form, setForm, errors = {} }: Props) {
  // const location = useLocation();
  // const { userId } = location.state || {};

  const { user } = useAuth();
  console.log("User hiện tại:", user);
  useEffect(() => {
    if (user?.id) {
      getCustomerById(user.id)
        .then((data) => {
          setForm({
            name: data.ho_ten || "",
            email: data.email || "",
            phone: data.so_dien_thoai || "",
            address: data.dia_chi || "",
            note: ""
          });
        })
        .catch(err => {
          console.error("Không lấy được thông tin người dùng:", err);
        });
    }
  }, [user, setForm]);

  return (
    <form className="p-4 border rounded shadow-sm bg-light">
      <div className="mb-3">
        <label className="form-label">Họ tên</label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Nhập họ tên"
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Nhập email"
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Số điện thoại</label>
        <input
          type="tel"
          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Nhập số điện thoại"
        />
        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Địa chỉ</label>
        <input
          type="text"
          className={`form-control ${errors.address ? 'is-invalid' : ''}`}
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          placeholder="Nhập địa chỉ"
        />
        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Ghi chú</label>
        <textarea
          className="form-control"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          placeholder="Nhập ghi chú"
          rows={3}
        />
      </div>
    </form>
  );
}
