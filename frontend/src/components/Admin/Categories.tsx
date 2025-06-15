import { useState } from "react";

interface Category {
  id: number;
  ten_danh_muc: string;
  mo_ta: string;
  ngay_tao: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tenDanhMuc, setTenDanhMuc] = useState("");
  const [moTa, setMoTa] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      // Cập nhật danh mục
      setCategories(categories.map(cat =>
        cat.id === editingId ? { ...cat, ten_danh_muc: tenDanhMuc, mo_ta: moTa } : cat
      ));
      setEditingId(null);
    } else {
      // Thêm danh mục mới
      const newCategory: Category = {
        id: categories.length > 0 ? categories[categories.length - 1].id + 1 : 1,
        ten_danh_muc: tenDanhMuc,
        mo_ta: moTa,
        ngay_tao: new Date().toISOString()
      };
      setCategories([...categories, newCategory]);
    }
    setTenDanhMuc("");
    setMoTa("");
  };

  const handleEdit = (cat: Category) => {
    setTenDanhMuc(cat.ten_danh_muc);
    setMoTa(cat.mo_ta);
    setEditingId(cat.id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá danh mục này không?")) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="container mt-4">
      <h4>Quản lý danh mục</h4>
      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light mb-4">
        <h5>{editingId !== null ? "Cập nhật danh mục" : "Thêm Danh Mục"}</h5>
        <div className="mb-3">
          <label className="form-label">Tên danh mục</label>
          <input
            type="text"
            className="form-control"
            value={tenDanhMuc}
            onChange={(e) => setTenDanhMuc(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            value={moTa}
            onChange={(e) => setMoTa(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          {editingId !== null ? "Cập nhật" : "Thêm danh mục"}
        </button>
        {editingId !== null && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditingId(null);
              setTenDanhMuc("");
              setMoTa("");
            }}
          >
            Hủy
          </button>
        )}
      </form>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Mô tả</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.ten_danh_muc}</td>
              <td>{cat.mo_ta}</td>
              <td>{new Date(cat.ngay_tao).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(cat)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(cat.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                Chưa có danh mục nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
