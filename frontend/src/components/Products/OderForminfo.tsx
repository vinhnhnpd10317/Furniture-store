import { useEffect, useRef } from "react";
import { getCustomerById } from "../../api/Customer";
import { useAuth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";

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
  const { user } = useAuth();
  const navigate = useNavigate();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (user?.id && !hasChecked.current) {
      hasChecked.current = true; 
      getCustomerById(user.id)
        .then((data) => {
          setForm({
            name: data.ho_ten || "",
            email: data.email || "",
            phone: data.so_dien_thoai || "",
            address: data.dia_chi || "",
            note: ""
          });

          if (!data.ho_ten || !data.email || !data.so_dien_thoai || !data.dia_chi) {
            alert("Vui lòng cập nhật đầy đủ thông tin để đặt hàng");
            navigate("/account");
          }
        })
        .catch(err => {
          console.error("Không lấy được thông tin người dùng:", err);
        });
    }
  }, [user, setForm, navigate]);

  return (
    <form className="p-4 border rounded shadow-sm bg-light">
      <div className="mb-3">
        <label className="form-label">Họ tên</label>
        <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={form.name} readOnly disabled />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={form.email} readOnly disabled />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Số điện thoại</label>
        <input type="tel" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} value={form.phone} readOnly disabled />
        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Địa chỉ</label>
        <input type="text" className={`form-control ${errors.address ? 'is-invalid' : ''}`} value={form.address} readOnly disabled />
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
        <div className="text-end mt-2">
          <Link to="/account" className="small text-primary">
            <i className="bi bi-pencil-square me-1"></i>Thay đổi địa chỉ
          </Link>
        </div>
      </div>
    </form>
  );
}
