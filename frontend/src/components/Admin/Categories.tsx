import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

interface Category {
  id: number;
  ten_danh_muc: string;
  mo_ta: string;
  ngay_tao: string;
}

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tenDanhMuc, setTenDanhMuc] = useState("");
  const [moTa, setMoTa] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const query = useQuery();
  const searchText = query.get("search")?.toLowerCase() || "";

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Load danh mục
  useEffect(() => {
    fetch("http://localhost:3001/categorys")
      .then(res => res.json())
      .then(setCategories)
      .catch(err => console.error("Lỗi khi tải danh mục:", err));
  }, []);

  // Lọc theo search (nếu có)
  const filteredCategories = useMemo(() => {
    if (!searchText) return categories;
    return categories.filter(cat =>
      cat.ten_danh_muc.toLowerCase().includes(searchText) ||
      cat.mo_ta.toLowerCase().includes(searchText)
    );
  }, [categories, searchText]);

  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / pageSize));

  const currentCategories = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCategories.slice(start, start + pageSize);
  }, [filteredCategories, currentPage]);

  // Thêm/sửa danh mục
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = JSON.stringify({ ten_danh_muc: tenDanhMuc, mo_ta: moTa });
    const url = editingId
      ? `http://localhost:3001/categorys/${editingId}`
      : "http://localhost:3001/categorys";
    const method = editingId ? "PUT" : "POST";

    try {
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body });
      const list = await fetch("http://localhost:3001/categorys").then(r => r.json());
      setCategories(list);
      setTenDanhMuc("");
      setMoTa("");
      setEditingId(null);
      if (!editingId) {
        setCurrentPage(Math.ceil((list.length || 1) / pageSize));
      }
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
      const list = await fetch("http://localhost:3001/categorys").then(r => r.json());
      setCategories(list);
      const lastPage = Math.max(1, Math.ceil(list.length / pageSize));
      if (currentPage > lastPage) setCurrentPage(lastPage);
    } catch (err) {
      alert("❌ Lỗi khi xoá danh mục");
      console.error(err);
    }
  };

  const goToPage = (n: number) => setCurrentPage(n);

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light mb-4">
        <h5>{editingId ? "Cập nhật danh mục" : "Thêm Danh Mục"}</h5>
        <div className="mb-3">
          <label className="form-label">Tên danh mục</label>
          <input
            type="text"
            className="form-control"
            value={tenDanhMuc}
            onChange={e => setTenDanhMuc(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            value={moTa}
            onChange={e => setMoTa(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingId ? "Cập nhật" : "Thêm danh mục"}
        </button>
        {editingId && (
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
          {currentCategories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.ten_danh_muc}</td>
              <td>{cat.mo_ta}</td>
              <td>{new Date(cat.ngay_tao).toLocaleString()}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(cat)}>
                  Sửa
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {currentCategories.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">Không có danh mục nào.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      {totalPages > 1 && (
        <nav className="mt-3">
          <ul className="pagination justify-content-center mb-0">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                &laquo;
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <li key={n} className={`page-item ${currentPage === n && "active"}`}>
                <button className="page-link" onClick={() => goToPage(n)}>
                  {n}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
              <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
