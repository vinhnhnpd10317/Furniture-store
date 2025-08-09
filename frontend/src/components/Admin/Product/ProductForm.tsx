import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { ProductItem } from "../../../api/ProductApi";
import { fetchCategories, type CategoryItem } from "../../../api/CategoryApi";
import { fetchProductById } from "../../../api/ProductApi";

type Props = {
    editingProduct?: ProductItem | null;
    onDone: () => void;
};

export default function ProductForm({ editingProduct = null, onDone }: Props) {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate(); // ✅ Dùng để chuyển trang

    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [form, setForm] = useState({
        ten_san_pham: "",
        vat_lieu: "",
        chat_lieu: "",
        mo_ta: "",
        gia: 0,
        danh_muc_id: "",
        trang_thai_kho: "con_hang",
    });
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    const [hinhAnhDaiDien, setHinhAnhDaiDien] = useState<File | null>(null);
    const [dsHinhAnh, setDsHinhAnh] = useState<File[]>([]);

    const hinhAnhRef = useRef<HTMLInputElement | null>(null);
    const dsHinhAnhRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        fetchCategories().then(setCategories).catch(err => {
            setError("Lỗi khi tải danh mục: " + err.message);
        });

        if (id) {
            fetchProductById(id)
                .then((data: ProductItem) => {
                    setForm({
                        ten_san_pham: data.ten_san_pham,
                        vat_lieu: data.vat_lieu,
                        chat_lieu: data.chat_lieu,
                        mo_ta: data.mo_ta,
                        gia: data.gia,
                        danh_muc_id: data.danh_muc_id,
                        trang_thai_kho: data.trang_thai_kho || "con_hang",
                    });
                    setError(null);
                })
                .catch(err => {
                    setError("Lỗi khi tải sản phẩm: " + err.message);
                });
        } else if (editingProduct) {
            setForm({
                ten_san_pham: editingProduct.ten_san_pham,
                vat_lieu: editingProduct.vat_lieu,
                chat_lieu: editingProduct.chat_lieu,
                mo_ta: editingProduct.mo_ta,
                gia: editingProduct.gia,
                danh_muc_id: editingProduct.danh_muc_id,
                trang_thai_kho: editingProduct.trang_thai_kho || "con_hang",
            });
            setError(null);
        } else {
            resetForm();
        }
    }, [id, editingProduct]);

    const resetForm = () => {
        setForm({
            ten_san_pham: "",
            vat_lieu: "",
            chat_lieu: "",
            mo_ta: "",
            gia: 0,
            danh_muc_id: "",
            trang_thai_kho: "con_hang",
        });
        setHinhAnhDaiDien(null);
        setDsHinhAnh([]);
        if (hinhAnhRef.current) hinhAnhRef.current.value = "";
        if (dsHinhAnhRef.current) dsHinhAnhRef.current.value = "";
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { [key: string]: string } = {};

        if (!form.ten_san_pham.trim() || form.ten_san_pham.length < 10) {
            newErrors.ten_san_pham = "Tên sản phẩm phải có ít nhất 10 ký tự";
        }

        if (!form.vat_lieu.trim() || form.vat_lieu.length < 10) {
            newErrors.vat_lieu = "Vật liệu phải có ít nhất 10 ký tự";
        }

        if (!form.chat_lieu.trim() || form.chat_lieu.length < 10) {
            newErrors.chat_lieu = "Chất liệu phải có ít nhất 10 ký tự";
        }

        if (!form.mo_ta.trim() || form.mo_ta.length < 20) {
            newErrors.mo_ta = "Mô tả phải có ít nhất 20 ký tự";
        }

        if (!form.gia || form.gia <= 0) {
            newErrors.gia = "Giá phải lớn hơn 0";
        }

        if (!form.danh_muc_id) {
            newErrors.danh_muc_id = "Vui lòng chọn danh mục";
        }

        if (!hinhAnhDaiDien && !id) {
            newErrors.hinh_anh_dai_dien = "Vui lòng chọn hình ảnh đại diện";
        }
        if (!id && dsHinhAnh.length < 3) {
            newErrors.dsHinhAnh = "Vui lòng chọn ít nhất 3 hình ảnh";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        // ✅ Nếu qua validate thì tạo formData
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value.toString());
        });

        if (hinhAnhDaiDien) {
            formData.append("hinh_anh_dai_dien", hinhAnhDaiDien);
        }

        if (dsHinhAnh.length > 0) {
            dsHinhAnh.forEach(file => formData.append("ds_hinh_anh", file));
        }

        try {
            const isEditing = Boolean(id);
            const url = isEditing
                ? `http://localhost:3001/products/${id}`
                : `http://localhost:3001/products`;
            const method = isEditing ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                body: formData,
            });

            if (!response.ok) throw new Error("Lỗi khi lưu sản phẩm");

            alert(isEditing ? "Cập nhật thành công" : "Thêm sản phẩm thành công");

            resetForm();
            onDone();

            navigate("/admin/products");

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Chi tiết lỗi:", err);
                setError("Lỗi khi lưu sản phẩm: " + err.message);
            } else {
                console.error("Lỗi không xác định:", err);
                setError("Lỗi không xác định");
            }
        }
    };


    return (
        <form onSubmit={handleSubmit} className="p-3 border bg-light rounded mb-4">
            <h5>{id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</h5>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
                <label className="form-label">Tên sản phẩm</label>
                <input
                    className={`form-control ${errors.ten_san_pham ? "is-invalid" : ""}`}
                    value={form.ten_san_pham}
                    onChange={(e) => setForm({ ...form, ten_san_pham: e.target.value })}
                />
                {errors.ten_san_pham && <div className="invalid-feedback">{errors.ten_san_pham}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Vật liệu</label>
                <input
                    className={`form-control ${errors.vat_lieu ? "is-invalid" : ""}`}
                    value={form.vat_lieu}
                    onChange={(e) => setForm({ ...form, vat_lieu: e.target.value })}
                />
                {errors.vat_lieu && <div className="invalid-feedback">{errors.vat_lieu}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Chất liệu</label>
                <input
                    className={`form-control ${errors.chat_lieu ? "is-invalid" : ""}`}
                    value={form.chat_lieu}
                    onChange={(e) => setForm({ ...form, chat_lieu: e.target.value })}
                />
                {errors.chat_lieu && <div className="invalid-feedback">{errors.chat_lieu}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Mô tả</label>
                <textarea
                    className={`form-control ${errors.mo_ta ? "is-invalid" : ""}`}
                    value={form.mo_ta}
                    onChange={(e) => {
                        setForm({ ...form, mo_ta: e.target.value });

                        const el = e.target;
                        el.style.height = "auto"; 
                        el.style.height = el.scrollHeight + "px"; 
                    }}
                    style={{ overflow: "hidden", resize: "none" }} 
                ></textarea>
                {errors.mo_ta && <div className="invalid-feedback">{errors.mo_ta}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Giá</label>
                <input
                    className={`form-control ${errors.gia ? "is-invalid" : ""}`}
                    type="number"
                    min={0}
                    value={form.gia}
                    onChange={(e) =>
                        setForm({ ...form, gia: parseFloat(e.target.value) || 0 })
                    }
                />
                {errors.gia && <div className="invalid-feedback">{errors.gia}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Danh mục</label>
                <select
                    className={`form-select ${errors.danh_muc_id ? "is-invalid" : ""}`}
                    value={form.danh_muc_id}
                    onChange={(e) => setForm({ ...form, danh_muc_id: e.target.value })}
                >
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.ten_danh_muc}
                        </option>
                    ))}
                </select>
                {errors.danh_muc_id && <div className="invalid-feedback">{errors.danh_muc_id}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Hình ảnh đại diện</label>
                <input
                    type="file"
                    className={`form-control ${errors.hinh_anh_dai_dien ? "is-invalid" : ""}`}
                    ref={hinhAnhRef}
                    onChange={(e) =>
                    e.target.files && setHinhAnhDaiDien(e.target.files[0])
                    }
                />
                {errors.hinh_anh_dai_dien && (
                    <div className="invalid-feedback">{errors.hinh_anh_dai_dien}</div>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">Danh sách hình ảnh</label>
                <input
                    type="file"
                    multiple
                    className={`form-control ${errors.dsHinhAnh ? "is-invalid" : ""}`}
                    ref={dsHinhAnhRef}
                    onChange={(e) =>
                    e.target.files && setDsHinhAnh(Array.from(e.target.files))
                    }
                />
                {errors.dsHinhAnh && (
                    <div className="invalid-feedback">{errors.dsHinhAnh}</div>
                )}
            </div>

            <div className="d-flex gap-2">
                <button className="btn btn-success" type="submit">
                    {id ? "Cập nhật" : "Thêm"}
                </button>

                {id && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                            resetForm();
                            navigate("/admin/products"); // Hoặc gọi onDone()
                        }}
                    >
                        Hủy
                    </button>
                )}
            </div>
        </form>
    );
}
