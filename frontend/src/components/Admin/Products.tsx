import { useState, useEffect } from "react";

interface Category {
    id: number;
    ten_danh_muc: string;
}

export default function Products() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [tenSanPham, setTenSanPham] = useState("");
    const [vatLieu, setVatLieu] = useState("");
    const [chatLieu, setChatLieu] = useState("");
    const [moTa, setMoTa] = useState("");
    const [gia, setGia] = useState<number>(0);
    const [danhMucId, setDanhMucId] = useState<number | null>(null);
    const [hinhAnhDaiDien, setHinhAnhDaiDien] = useState("");

    useEffect(() => {
        // Giả lập API lấy danh mục (thay bằng fetch/axios)
        setCategories([
            { id: 1, ten_danh_muc: "Túi xách" },
            { id: 2, ten_danh_muc: "Đồng hồ" }
        ]);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct = {
            ten_san_pham: tenSanPham,
            vat_lieu: vatLieu,
            chat_lieu: chatLieu,
            mo_ta: moTa,
            gia,
            danh_muc_id: danhMucId,
            hinh_anh_dai_dien: hinhAnhDaiDien,
            ngay_tao: new Date().toISOString()
        };
        console.log("Dữ liệu sản phẩm gửi lên:", newProduct);
        // Gửi request API POST tại đây
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 border rounded bg-light mt-4">
            <h5>Thêm Sản Phẩm</h5>
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
                Thêm sản phẩm
            </button>
        </form>
    );
}
