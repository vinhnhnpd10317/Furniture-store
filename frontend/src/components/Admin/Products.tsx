import ProductActions from "./Product/ProductActions";
import type { ProductItem } from "../../api/ProductApi";
import type { CategoryItem } from "../../api/CategoryApi";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./CSS/ProductAdmin.css";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function Products() {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    // const [searchParams] = useSearchParams();
    const pageSize = 10;

    const query = useQuery();
    const searchText = query.get("search")?.toLowerCase() || "";

    // Lấy dữ liệu ban đầu
    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then(res => res.json())
            .then(setProducts);

        fetch("http://localhost:3001/categorys")
            .then(res => res.json())
            .then(setCategories);
    }, []);

    const handleDeleted = (id: number) => {
        const newProducts = products.filter(p => p.id !== id);
        setProducts(newProducts);
        const lastPage = Math.max(1, Math.ceil(newProducts.length / pageSize));
        if (currentPage > lastPage) setCurrentPage(lastPage);
    };

    const handleTrangThaiKhoChange = async (id: number, newStatus: ProductItem["trang_thai_kho"]) => {
        try {
                const res = await fetch(`http://localhost:3001/products/${id}/trang-thai-kho`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ trang_thai_kho: newStatus }),
                });
                if (!res.ok) throw new Error("Cập nhật trạng thái kho thất bại");

                setProducts((prev) =>
                prev.map((p) =>
                    p.id === id ? { ...p, trang_thai_kho: newStatus } : p
                )
                );
        } catch (err) {
            alert("❌ Không thể cập nhật trạng thái kho.");
            console.error(err);
        }
    };

    const filteredProducts = useMemo(() => {
        if (!searchText) return products;
        return products.filter(p =>
            p.ten_san_pham.toLowerCase().includes(searchText) ||
            p.mo_ta?.toLowerCase().includes(searchText) ||
            p.vat_lieu?.toLowerCase().includes(searchText) ||
            p.chat_lieu?.toLowerCase().includes(searchText) 
        );
    }, [products, searchText]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));

    const currentProducts = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredProducts.slice(start, start + pageSize);
    }, [filteredProducts, currentPage]);

    const goToPage = (page: number) => setCurrentPage(page);

    const getTenDanhMuc = (id: number) =>
        categories.find(c => c.id === id)?.ten_danh_muc ?? "Không rõ";

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">📦 Quản lý sản phẩm</h2>
                <Link to="addproduct" className="btn btn-success">➕ Thêm sản phẩm</Link>
            </div>

            <div className="table-responsive shadow rounded bg-white">
                <table className="table table-bordered table-hover align-middle text-center mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Tên sản phẩm</th>
                            <th>Vật liệu</th>
                            <th>Chất liệu</th>
                            <th style={{ width: 180 }}>Mô tả</th>
                            <th>Giá</th>
                            <th>Danh mục</th>
                            <th>Ảnh đại diện</th>
                            <th>DS Hình ảnh</th>
                            <th>Kho</th>
                            <th>Ngày tạo</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td className="text-start">{p.ten_san_pham}</td>
                                <td>{p.vat_lieu}</td>
                                <td>{p.chat_lieu}</td>
                                <td className="text-start small" style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
                                    {p.mo_ta.length > 100 ? p.mo_ta.slice(0, 100) + "..." : p.mo_ta}
                                </td>

                                <td className="text-danger fw-bold">
                                    {p.gia.toLocaleString()} đ
                                </td>
                                <td>
                                    <span className="badge bg-primary">
                                        {getTenDanhMuc(Number(p.danh_muc_id))}
                                    </span>
                                </td>
                                <td>
                                    <img
                                        src={`/img/imgproduct/${p.hinh_anh_dai_dien}`}
                                        alt="ảnh đại diện"
                                        width={50}
                                        className="rounded border"
                                    />
                                </td>
                                <td>
                                    <div className="d-flex flex-wrap justify-content-center gap-1">
                                        {p.ds_hinh_anh?.split(";").map((img, i) => (
                                            <img
                                                key={i}
                                                src={`/img/imgproduct/${img}`}
                                                width={30}
                                                className="rounded border"
                                                alt={`img-${i}`}
                                            />
                                        ))}
                                    </div>
                                </td>

                                <td>
                                    <select
                                        value={p.trang_thai_kho}
                                        className={`form-select form-select-sm w-auto ${
                                        p.trang_thai_kho === "con_hang" ? "border-success" : "border-danger"
                                        }`}
                                        onChange={(e) =>
                                        handleTrangThaiKhoChange(p.id, e.target.value as ProductItem["trang_thai_kho"])
                                        }
                                    >
                                        <option value="con_hang">Còn hàng</option>
                                        <option value="het_hang">Hết hàng</option>
                                    </select>
                                </td>

                                <td>{new Date(p.ngay_tao).toLocaleString()}</td>
                                <td>
                                    <ProductActions
                                        product={p}
                                        onDeleteSuccess={() => handleDeleted(p.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                        {currentProducts.length === 0 && (
                            <tr>
                                <td colSpan={11} className="text-muted text-center py-4">
                                    Không tìm thấy sản phẩm nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <nav aria-label="pagination" className="mt-3">
                    <ul className="pagination justify-content-center mb-0">
                        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                            <button className="page-link" onClick={() => goToPage(currentPage - 1)}>&laquo;</button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                            <li key={n} className={`page-item ${currentPage === n && "active"}`}>
                                <button className="page-link" onClick={() => goToPage(n)}>{n}</button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                            <button className="page-link" onClick={() => goToPage(currentPage + 1)}>&raquo;</button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}