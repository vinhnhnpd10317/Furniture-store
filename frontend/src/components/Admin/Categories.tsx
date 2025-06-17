import { useEffect, useState } from "react";

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

  // Load danh mục từ MySQL khi mở trang
  useEffect(() => {
    fetch("http://localhost:3001/categorys")
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("Lỗi khi tải danh mục:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const categoryData = { ten_danh_muc: tenDanhMuc, mo_ta: moTa };

    try {
      if (editingId !== null) {
        // Cập nhật danh mục
        await fetch(`http://localhost:3001/categorys/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryData),
        });
      } else {
        // Thêm danh mục mới
        await fetch("http://localhost:3001/categorys", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryData),
        });
      }

      // Sau khi thêm hoặc cập nhật → load lại từ MySQL
      const res = await fetch("http://localhost:3001/categorys");
      const data = await res.json();
      setCategories(data);

      // Reset form
      setTenDanhMuc("");
      setMoTa("");
      setEditingId(null);
    } catch (err) {
      alert("❌ Lỗi khi thêm/cập nhật danh mục");
      console.error(err);
    }
  };

  const handleEdit = (cat: Category) => {
    setTenDanhMuc(cat.ten_danh_muc);
    setMoTa(cat.mo_ta);
    setEditingId(cat.id);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá danh mục này không?")) return;

    try {
      await fetch(`http://localhost:3001/categorys/${id}`, { method: "DELETE" });

      // Cập nhật lại danh sách
      const res = await fetch("http://localhost:3001/categorys");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      alert("❌ Lỗi khi xoá danh mục");
      console.error(err);
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
