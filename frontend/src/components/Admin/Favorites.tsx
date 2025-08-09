import React, { useEffect, useState } from "react";
import { getFavorites } from "../../api/FavoriteApi";
import { fetchProducts } from "../../api/ProductApi";
import { deleteFavorite } from "../../api/FavoriteApi";
import { FaTrash } from "react-icons/fa";

export default function AdminFavorites() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [favorites, setFavorites] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [productsMap, setProductsMap] = useState<{ [id: number]: any }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const load = async () => {
      const [favs, prods] = await Promise.all([getFavorites(), fetchProducts({})]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const map: { [id: number]: any } = {};
      prods.forEach((p) => (map[p.id] = p));
      setProductsMap(map);
      setFavorites(favs);
    };
    load();
  }, []);

  const handleDeleteFavorite = async (nguoi_dung_id: number, san_pham_id: number) => {
    try {
      await deleteFavorite(nguoi_dung_id, san_pham_id);
      setFavorites((prev) =>
        prev.filter(
          (fav) =>
            !(fav.nguoi_dung_id === nguoi_dung_id && fav.san_pham_id === san_pham_id)
        )
      );
    } catch (error) {
      console.error("Lỗi khi xoá yêu thích:", error);
    }
  };

  const totalPages = Math.ceil(favorites.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentFavorites = favorites.slice(startIndex, startIndex + perPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container-fluid py-4">
      <h3 className="mb-4 text-center">Danh sách sản phẩm được yêu thích</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr className="text-center">
            <th className="py-3">Người dùng</th>
            <th className="py-3">Sản phẩm</th>
            <th className="py-3" style={{ width: 120 }}>Hình ảnh</th>
            <th className="py-3" style={{ width: 120 }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentFavorites.map((fav) => {
            const prod = productsMap[fav.san_pham_id];
            return (
              <tr key={`${fav.nguoi_dung_id}-${fav.san_pham_id}`}>
                <td>{fav.nguoi_dung_id}</td>
                <td>{prod?.ten_san_pham || "[??]"}</td>
                <td>
                  <img
                    src={`/img/imgproduct/${prod?.hinh_anh_dai_dien}`}
                    width={100}
                    alt=""
                  />
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1"
                    onClick={() =>
                      handleDeleteFavorite(fav.nguoi_dung_id, fav.san_pham_id)
                    }
                  >
                    <FaTrash /> Xoá
                  </button>
                </td>
              </tr>
            );
          })}
          {favorites.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center">
                Không có sản phẩm yêu thích nào
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="pagination" className="mt-4">
          <ul className="pagination justify-content-end mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link py-2 px-3" onClick={() => goToPage(1)}>
                &laquo;
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link py-2 px-3"
                onClick={() => goToPage(currentPage - 1)}
              >
                &lt;
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (n) =>
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
                    <li
                      className={`page-item ${
                        currentPage === n ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link py-2 px-3"
                        onClick={() => goToPage(n)}
                        style={
                          currentPage === n
                            ? {
                                backgroundColor: "#ffffffff",
                                color: "#ea580c",
                                borderColor: "#d8d8d8ff",
                              }
                            : {}
                        }
                      >
                        {n}
                      </button>
                    </li>
                  </React.Fragment>
                );
              })}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link py-2 px-3"
                onClick={() => goToPage(currentPage + 1)}
              >
                &gt;
              </button>
            </li>
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link py-2 px-388"
                onClick={() => goToPage(totalPages)}
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
