import { useRef, useState, useEffect } from "react";
import { fetchProducts, type ProductItem } from "../../api/ProductApi";
import { fetchCategories, type CategoryItem } from "../../api/CategoryApi";

export default function Products() {
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [products, setProducts] = useState<ProductItem[]>([]);

    const [tenSanPham, setTenSanPham] = useState("");
    const [vatLieu, setVatLieu] = useState("");
    const [chatLieu, setChatLieu] = useState("");
    const [moTa, setMoTa] = useState("");
    const [gia, setGia] = useState<number>(0);
    const [danhMucId, setDanhMucId] = useState<string | null>(null);
    const [hinhAnhDaiDienFile, setHinhAnhDaiDienFile] = useState<File | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const hinhAnhRef = useRef<HTMLInputElement | null>(null);
    const dsHinhAnhRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        fetchCategories()
            .then((data) => setCategories(data))
            .catch((err) => console.error("Lỗi khi tải danh mục:", err));

        fetchProducts()
            .then((data) => setProducts(data))
            .catch((err) => console.error("Lỗi khi tải sản phẩm:", err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!danhMucId) {
            alert("Vui lòng chọn danh mục!");
            return;
        }

        const formData = new FormData();
        formData.append("ten_san_pham", tenSanPham);
        formData.append("vat_lieu", vatLieu);
        formData.append("chat_lieu", chatLieu);
        formData.append("mo_ta", moTa);
        formData.append("gia", gia.toString());
        formData.append("danh_muc_id", danhMucId);

        if (hinhAnhDaiDienFile) {
            formData.append("hinh_anh_dai_dien", hinhAnhDaiDienFile);
        }

        // Thêm danh sách hình ảnh
        dsHinhAnhFiles.forEach((file) => {
            formData.append("ds_hinh_anh", file);
        });

        try {
            if (editingId !== null) {
                console.log("Cập nhật sản phẩm:", formData);
            } else {
                const response = await fetch("http://localhost:3001/products", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) throw new Error("Lỗi khi thêm sản phẩm");

                const newProduct = await response.json();
                setProducts([...products, newProduct]);
            }

            // Reset form
            setTenSanPham("");
            setVatLieu("");
            setChatLieu("");
            setMoTa("");
            setGia(0);
            setDanhMucId(null);
            setHinhAnhDaiDienFile(null);
            setDsHinhAnhFiles([]);
            setEditingId(null);

            // Reset ô input file bằng ref
            if (hinhAnhRef.current) hinhAnhRef.current.value = "";
            if (dsHinhAnhRef.current) dsHinhAnhRef.current.value = "";

            alert("Thêm sản phẩm thành công!");
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Đã có lỗi xảy ra khi thêm sản phẩm");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setHinhAnhDaiDienFile(e.target.files[0]);
        }
    };

    const [dsHinhAnhFiles, setDsHinhAnhFiles] = useState<File[]>([]);

    const handleMultiFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setDsHinhAnhFiles(Array.from(e.target.files));
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
                        onChange={(e) => setDanhMucId(e.target.value)}
                        required
                        >
                        <option value="">-- Chọn danh mục --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id.toString()}>
                            {cat.ten_danh_muc}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Hình ảnh đại diện</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        onChange={handleFileChange} 
                        ref={hinhAnhRef}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Danh sách hình ảnh (chọn nhiều)</label>
                    <input
                        type="file"
                        className="form-control"
                        multiple
                        onChange={handleMultiFileChange}
                        ref={dsHinhAnhRef}
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
                            setHinhAnhDaiDienFile(null);
                        }}
                    >
                        Hủy
                    </button>
                )}
            </form>
        </div>
    );
}
