import { useState, useEffect } from "react";

interface Category {
    id: number;
    ten_danh_muc: string;
}

interface Product {
    id: number;
    ten_san_pham: string;
    vat_lieu: string;
    chat_lieu: string;
    mo_ta: string;
    gia: number;
    danh_muc_id: number;
    hinh_anh_dai_dien: string;
    ngay_tao: string;
}

export default function Products() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const [tenSanPham, setTenSanPham] = useState("");
    const [vatLieu, setVatLieu] = useState("");
    const [chatLieu, setChatLieu] = useState("");
    const [moTa, setMoTa] = useState("");
    const [gia, setGia] = useState<number>(0);
    const [danhMucId, setDanhMucId] = useState<number | null>(null);
    const [hinhAnhDaiDien, setHinhAnhDaiDien] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        // Giả lập load danh mục
        setCategories([
            { id: 1, ten_danh_muc: "Túi xách" },
            { id: 2, ten_danh_muc: "Đồng hồ" }
        ]);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!danhMucId) {
            alert("Vui lòng chọn danh mục!");
            return;
        }

        if (editingId !== null) {
            // Update
            setProducts(products.map((p) =>
                p.id === editingId
                    ? {
                        ...p,
                        ten_san_pham: tenSanPham,
                        vat_lieu: vatLieu,
                        chat_lieu: chatLieu,
                        mo_ta: moTa,
                        gia,
                        danh_muc_id: danhMucId,
                        hinh_anh_dai_dien: hinhAnhDaiDien
                    }
                    : p
            ));
            setEditingId(null);
        } else {
            // Add
            const newProduct: Product = {
                id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
                ten_san_pham: tenSanPham,
                vat_lieu: vatLieu,
                chat_lieu: chatLieu,
                mo_ta: moTa,
                gia,
                danh_muc_id: danhMucId,
                hinh_anh_dai_dien: hinhAnhDaiDien,
                ngay_tao: new Date().toISOString()
            };
            setProducts([...products, newProduct]);
        }

        // Reset form
        setTenSanPham("");
        setVatLieu("");
        setChatLieu("");
        setMoTa("");
        setGia(0);
        setDanhMucId(null);
        setHinhAnhDaiDien("");
    };

    const handleEdit = (p: Product) => {
        setEditingId(p.id);
        setTenSanPham(p.ten_san_pham);
        setVatLieu(p.vat_lieu);
        setChatLieu(p.chat_lieu);
        setMoTa(p.mo_ta);
        setGia(p.gia);
        setDanhMucId(p.danh_muc_id);
        setHinhAnhDaiDien(p.hinh_anh_dai_dien);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) {
            setProducts(products.filter((p) => p.id !== id));
        }
    };

    return (
        <div className="container mt-4">
            <h4>Quản lý sản phẩm</h4>
            <form onSubmit={handleSubmit} className="p-3 border rounded bg-light mb-4">
                <h5>{editingId !== null ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</h5>
                <div className="mb-3">
                    <label className="form-label">Tên sản phẩm</label>
                    <input
                        type="text"
                        className="form-control"
                        value={tenSanPham}
                        onChange={(e) => setTenSanPham(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Vật liệu</label>
                    <input
                        type="text"
                        className="form-control"
                        value={vatLieu}
                        onChange={(e) => setVatLieu(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Chất liệu</label>
                    <input
                        type="text"
                        className="form-control"
                        value={chatLieu}
                        onChange={(e) => setChatLieu(e.target.value)}
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
                <div className="mb-3">
                    <label className="form-label">Giá</label>
                    <input
                        type="number"
                        className="form-control"
                        value={gia}
                        onChange={(e) => setGia(parseFloat(e.target.value))}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Danh mục</label>
                    <select
                        className="form-select"
                        value={danhMucId ?? ""}
                        onChange={(e) => setDanhMucId(Number(e.target.value))}
                        required
                    >
                        <option value="">-- Chọn danh mục --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.ten_danh_muc}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Hình ảnh đại diện</label>
                    <input
                        type="text"
                        className="form-control"
                        value={hinhAnhDaiDien}
                        onChange={(e) => setHinhAnhDaiDien(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-success">
                    {editingId !== null ? "Cập nhật" : "Thêm sản phẩm"}
                </button>
                {editingId !== null && (
                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => {
                            setEditingId(null);
                            setTenSanPham("");
                            setVatLieu("");
                            setChatLieu("");
                            setMoTa("");
                            setGia(0);
                            setDanhMucId(null);
                            setHinhAnhDaiDien("");
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
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Danh mục</th>
                        <th>Ngày tạo</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.ten_san_pham}</td>
                            <td>{p.gia.toLocaleString()}</td>
                            <td>
                                {categories.find((cat) => cat.id === p.danh_muc_id)?.ten_danh_muc ||
                                    "Không xác định"}
                            </td>
                            <td>{new Date(p.ngay_tao).toLocaleString()}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => handleEdit(p)}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(p.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                    {products.length === 0 && (
                        <tr>
                            <td colSpan={6} className="text-center">
                                Chưa có sản phẩm nào.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
