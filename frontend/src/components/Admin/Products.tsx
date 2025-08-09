// Products.tsx
import ProductActions from "./Product/ProductActions";
import type { ProductItem } from "../../api/ProductApi";
import type { CategoryItem } from "../../api/CategoryApi";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./CSS/ProductAdmin.css";
import React from "react";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function Products() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const query = useQuery();
  const searchText = query.get("search")?.toLowerCase() || "";

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then(setProducts);

    fetch("http://localhost:3001/categorys")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const handleDeleted = (id: number) => {
    const newProducts = products.filter((p) => p.id !== id);
    setProducts(newProducts);
    const lastPage = Math.max(1, Math.ceil(newProducts.length / pageSize));
    if (currentPage > lastPage) setCurrentPage(lastPage);
  };

  const handleTrangThaiKhoChange = async (
    id: number,
    newStatus: ProductItem["trang_thai_kho"]
  ) => {
    try {
      const res = await fetch(`http://localhost:3001/products/${id}/trang-thai-kho`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trang_thai_kho: newStatus }),
      });
      if (!res.ok) throw new Error("Cập nhật trạng thái kho thất bại");

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, trang_thai_kho: newStatus } : p))
      );
    } catch (err) {
      alert("❌ Không thể cập nhật trạng thái kho.");
      console.error(err);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!searchText) return products;
    return products.filter(
      (p) =>
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
    categories.find((c) => c.id === id)?.ten_danh_muc ?? "Không rõ";

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Quản lý sản phẩm</h3>
        <Link to="addproduct" className="btn btn-success">
          ➕ Thêm sản phẩm
        </Link>
      </div>

      {/* Bảng ở màn hình lớn */}
      <div className="table-responsive shadow rounded bg-white d-none d-md-block">
        <table className="table table-bordered table-hover align-middle text-center mb-0">
          <thead className="table-light">
            <tr>
              <th className="py-3">#</th>
              <th className="py-3">Tên sản phẩm</th>
              {/* <th>Vật liệu</th> */}
              {/* <th>Chất liệu</th> */}
              <th className="py-3" style={{ width: 180 }}>Mô tả</th>
              <th className="py-3">Giá (VNĐ)</th>
              <th className="py-3">Danh mục</th>
              <th className="py-3" style={{ width: 120 }}>Ảnh đại diện</th>
              {/* <th>DS Hình ảnh</th> */}
              <th className="py-3" style={{ width: 100 }}>Kho</th>
              {/* <th>Ngày tạo</th> */}
              <th className="py-3" style={{ width: 180 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td className="text-start">{p.ten_san_pham}</td>
                {/* <td>{p.vat_lieu}</td> */}
                {/* <td>{p.chat_lieu}</td> */}
                <td
                  className="text-start small"
                  style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
                >
                  {p.mo_ta.length > 100 ? p.mo_ta.slice(0, 45) + "..." : p.mo_ta}
                </td>
                <td className="text-danger">
                  {p.gia.toLocaleString()} 
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
                    width={90}
                    className="rounded border"
                  />
                </td>
                {/* <td>
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
                </td> */}
                <td>
                  <select
                    value={p.trang_thai_kho}
                    className={`form-select form-select-sm w-auto ${
                      p.trang_thai_kho === "con_hang"
                        ? "border-success"
                        : "border-danger"
                    }`}
                    onChange={(e) =>
                      handleTrangThaiKhoChange( 
                        p.id,
                        e.target.value as ProductItem["trang_thai_kho"]
                      )
                    }
                  >
                    <option value="con_hang">Còn hàng</option>
                    <option value="het_hang">Hết hàng</option>
                  </select>
                </td>
                {/* <td>{new Date(p.ngay_tao).toLocaleString()}</td> */}
                <td>
                  <ProductActions
                    product={p}
                    onDeleteSuccess={() => handleDeleted(p.id)}
                    onView={(p) => setSelectedProduct(p)}
                  />
                </td>
              </tr>
            ))}
            {currentProducts.length === 0 && (
              <tr>
                <td colSpan={12} className="text-muted text-center py-4">
                  Không tìm thấy sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Dạng card cho mobile */}
      <div className="d-md-none d-block">
        {currentProducts.map((p) => (
          <div className="card mb-3 shadow-sm" key={p.id}>
            <div className="card-body">
              <h5 className="fw-bold">{p.ten_san_pham}</h5>
              <p className="mb-1"><strong>Giá:</strong> <span className="text-danger fw-bold">{p.gia.toLocaleString()} đ</span></p>
              <p className="mb-1"><strong>Vật liệu:</strong> {p.vat_lieu}</p>
              <p className="mb-1"><strong>Chất liệu:</strong> {p.chat_lieu}</p>
              <p className="mb-1"><strong>Mô tả:</strong> {p.mo_ta?.slice(0, 100)}...</p>
              <p className="mb-1"><strong>Danh mục:</strong> {getTenDanhMuc(Number(p.danh_muc_id))}</p>
              <p className="mb-2"><strong>Ngày tạo:</strong> {new Date(p.ngay_tao).toLocaleString()}</p>
              <div className="d-flex gap-2 align-items-center mb-2">
                <img src={`/img/imgproduct/${p.hinh_anh_dai_dien}`} width={50} alt="ảnh đại diện" className="rounded border" />
                <div className="d-flex flex-wrap gap-1">
                  {p.ds_hinh_anh?.split(";").map((img, i) => (
                    <img key={i} src={`/img/imgproduct/${img}`} width={30} className="rounded border" alt={`img-${i}`} />
                  ))}
                </div>
              </div>
              <div className="mb-2">
                <select
                  value={p.trang_thai_kho}
                  className={`form-select form-select-sm w-auto d-inline-block ${
                    p.trang_thai_kho === "con_hang" ? "border-success" : "border-danger"
                  }`}
                  onChange={(e) =>
                    handleTrangThaiKhoChange(
                      p.id,
                      e.target.value as ProductItem["trang_thai_kho"]
                    )
                  }
                >
                  <option value="con_hang">Còn hàng</option>
                  <option value="het_hang">Hết hàng</option>
                </select>
              </div>
              <ProductActions
                product={p}
                onDeleteSuccess={() => handleDeleted(p.id)}
                onView={(p) => setSelectedProduct(p)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal hiển thị chi tiết sản phẩm */}
      {selectedProduct && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết sản phẩm</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedProduct(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {selectedProduct.id}</p>
                <p><strong>Tên sản phẩm:</strong> {selectedProduct.ten_san_pham}</p>
                <p><strong>Vật liệu:</strong> {selectedProduct.vat_lieu}</p>
                <p><strong>Chất liệu:</strong> {selectedProduct.chat_lieu}</p>
                <p style={{ whiteSpace: 'pre-line' }}><strong>Mô tả:</strong> {selectedProduct.mo_ta}</p>
                <p><strong>Giá:</strong> {selectedProduct.gia.toLocaleString()} đ</p>
                <p><strong>Danh mục:</strong> {getTenDanhMuc(Number(selectedProduct.danh_muc_id))}</p>
                <p><strong>Trạng thái kho:</strong> {selectedProduct.trang_thai_kho === "con_hang" ? "Còn hàng" : "Hết hàng"}</p>
                <p><strong>Ngày tạo:</strong> {new Date(selectedProduct.ngay_tao).toLocaleString()}</p>
                <p><strong>Ảnh đại diện:</strong></p>
                <img src={`/img/imgproduct/${selectedProduct.hinh_anh_dai_dien}`} alt="Ảnh đại diện" className="img-fluid rounded border" />
                <p className="mt-2"><strong>Danh sách hình ảnh:</strong></p>
                <div className="d-flex flex-wrap gap-2">
                  {selectedProduct.ds_hinh_anh?.split(";").map((img, i) => (
                    <img key={i} src={`/img/imgproduct/${img}`} width={80} className="rounded border" alt={`img-${i}`} />
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedProduct(null)}>Đóng</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <nav aria-label="pagination" className="mt-4">
          <ul className="pagination justify-content-end mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link py-2 px-3" onClick={() => goToPage(1)}>
                &laquo;
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link py-2 px-3" onClick={() => goToPage(currentPage - 1)}>
                &lt;
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((n) =>
                totalPages <= 5 ||
                n === 1 ||
                n === totalPages ||
                Math.abs(currentPage - n) <= 1
              )
              .map((n, index, arr) => {
                const prev = arr[index - 1];
                const showDots = prev && n - prev > 1;

                return (
                  <React.Fragment key={n}>
                    {showDots && (
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    )}
                    <li className={`page-item ${currentPage === n ? "active" : ""}`}>
                      <button
                        className="page-link py-2 px-3"
                        onClick={() => goToPage(n)}
                        style={currentPage === n ? { backgroundColor: "#ffffffff", color: "#ea580c", borderColor: "#d8d8d8ff" } : {}}
                      >
                        {n}
                      </button>
                    </li>
                  </React.Fragment>
                );
              })}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link py-2 px-3" onClick={() => goToPage(currentPage + 1)}>
                &gt;
              </button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link py-2 px-388" onClick={() => goToPage(totalPages)}>
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
