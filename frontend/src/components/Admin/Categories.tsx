import { useState } from "react";

export default function Categories() {
  const [tenDanhMuc, setTenDanhMuc] = useState("");
  const [moTa, setMoTa] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory = {
      ten_danh_muc: tenDanhMuc,
      mo_ta: moTa,
      ngay_tao: new Date().toISOString()
    };
    console.log("Dữ liệu gửi lên:", newCategory);
    // Gửi request API POST tại đây
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <h5>Thêm Danh Mục</h5>
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
        Thêm danh mục
      </button>
    </form>
  );
}
