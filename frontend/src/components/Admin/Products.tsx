import ProductActions from "./Product/ProductActions";
import type { ProductItem } from "../../api/ProductApi";
import type { CategoryItem } from "../../api/CategoryApi";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/ProductAdmin.css"

export default function Products() {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;                    

    //Lấy dữ liệu
    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then(res => res.json())
            .then(setProducts);

        fetch("http://localhost:3001/categorys")
            .then(res => res.json())
            .then(setCategories);
    }, []);

    // Xử lý xóa sp 
    const handleDeleted = (id: number) => {
        const newProducts = products.filter(p => p.id !== id);
        setProducts(newProducts);

        // Nếu vừa xoá item cuối ở trang cuối thì lùi về trang trước
        const lastPage = Math.max(1, Math.ceil(newProducts.length / pageSize));
        if (currentPage > lastPage) setCurrentPage(lastPage);
    };

    // Phân trang
    const totalPages = Math.max(1, Math.ceil(products.length / pageSize));

    const currentProducts = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return products.slice(start, start + pageSize);
    }, [products, currentPage]);

    const goToPage = (page: number) => setCurrentPage(page);

    const getTenDanhMuc = (id: number) =>
        categories.find(c => c.id === id)?.ten_danh_muc ?? "Không rõ";

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">📦 Quản lý sản phẩm</h2>
                <Link to="addproduct" className="btn btn-success">
                    ➕ Thêm sản phẩm
                </Link>
            </div>

            <div className="table-responsive shadow rounded bg-white">
                <table className="table table-bordered table-hover align-middle text-center mb-0">
                    <thead className="table-dark">
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
                                    {p.mo_ta}
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
                                <td>{new Date(p.ngay_tao).toLocaleString()}</td>
                                <td>
                                    <ProductActions
                                        product={p}
                                        onDeleteSuccess={() => handleDeleted(p.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Thanh Pagination */}
            {totalPages > 1 && (
                <nav aria-label="pagination" className="mt-3">
                    <ul className="pagination justify-content-center mb-0">
                        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                            <button
                                className="page-link"
                                onClick={() => goToPage(currentPage - 1)}
                            >
                                &laquo;
                            </button>
                        </li>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                            <li
                                key={n}
                                className={`page-item ${currentPage === n && "active"}`}
                            >
                                <button className="page-link" onClick={() => goToPage(n)}>
                                    {n}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                            <button
                                className="page-link"
                                onClick={() => goToPage(currentPage + 1)}
                            >
                                &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}
