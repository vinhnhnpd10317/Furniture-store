import { useState } from "react";

interface User {
  id: number;
  ho_ten: string;
  email: string;
  mat_khau: string;
  so_dien_thoai: string;
  dia_chi: string;
  vai_tro: "khach_hang" | "quan_tri";
  ngay_tao: string;
}

export default function Customer() {
  const [users, setUsers] = useState<User[]>([]);
  const [hoTen, setHoTen] = useState("");
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [vaiTro, setVaiTro] = useState<"khach_hang" | "quan_tri">("khach_hang");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId !== null) {
      setUsers(users.map((u) =>
        u.id === editingId
          ? { ...u, ho_ten: hoTen, email, mat_khau: matKhau, so_dien_thoai: soDienThoai, dia_chi: diaChi, vai_tro: vaiTro }
          : u
      ));
      setEditingId(null);
    } else {
      const newUser: User = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        ho_ten: hoTen,
        email,
        mat_khau: matKhau,
        so_dien_thoai: soDienThoai,
        dia_chi: diaChi,
        vai_tro: vaiTro,
        ngay_tao: new Date().toISOString()
      };
      setUsers([...users, newUser]);
    }

    // Reset form
    setHoTen("");
    setEmail("");
    setMatKhau("");
    setSoDienThoai("");
    setDiaChi("");
    setVaiTro("khach_hang");
  };

  const handleEdit = (u: User) => {
    setEditingId(u.id);
    setHoTen(u.ho_ten);
    setEmail(u.email);
    setMatKhau(u.mat_khau);
    setSoDienThoai(u.so_dien_thoai);
    setDiaChi(u.dia_chi);
    setVaiTro(u.vai_tro);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Bạn có chắc muốn xoá người dùng này?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="container mt-4">
      <h4>Quản lý người dùng</h4>
      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light mb-4">
        <h5>{editingId !== null ? "Cập nhật người dùng" : "Thêm người dùng"}</h5>
        <div className="mb-3">
          <label className="form-label">Họ tên</label>
          <input type="text" className="form-control" value={hoTen} onChange={(e) => setHoTen(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Mật khẩu</label>
          <input type="password" className="form-control" value={matKhau} onChange={(e) => setMatKhau(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Số điện thoại</label>
          <input type="text" className="form-control" value={soDienThoai} onChange={(e) => setSoDienThoai(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Địa chỉ</label>
          <textarea className="form-control" value={diaChi} onChange={(e) => setDiaChi(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Vai trò</label>
          <select className="form-select" value={vaiTro} onChange={(e) => setVaiTro(e.target.value as "khach_hang" | "quan_tri")}>
            <option value="khach_hang">Khách hàng</option>
            <option value="quan_tri">Quản trị</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {editingId !== null ? "Cập nhật" : "Thêm người dùng"}
        </button>
        {editingId !== null && (
          <button type="button" className="btn btn-secondary ms-2" onClick={() => {
            setEditingId(null);
            setHoTen("");
            setEmail("");
            setMatKhau("");
            setSoDienThoai("");
            setDiaChi("");
            setVaiTro("khach_hang");
          }}>
            Hủy
          </button>
        )}
      </form>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Vai trò</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.ho_ten}</td>
              <td>{u.email}</td>
              <td>{u.so_dien_thoai}</td>
              <td>{u.vai_tro === "khach_hang" ? "Khách hàng" : "Quản trị"}</td>
              <td>{new Date(u.ngay_tao).toLocaleString()}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(u)}>Sửa</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id)}>Xóa</button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center">Chưa có người dùng nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
