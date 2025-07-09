import React, { useEffect, useState } from "react";
import { getFavorites } from "../../api/FavoriteApi";
import { fetchProducts } from "../../api/ProductApi";
import { deleteFavorite } from "../../api/FavoriteApi";

export default function AdminFavorites() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [favorites, setFavorites] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [productsMap, setProductsMap] = useState<{ [id: number]: any }>({});

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
        setFavorites(prev =>
        prev.filter(fav => !(fav.nguoi_dung_id === nguoi_dung_id && fav.san_pham_id === san_pham_id))
        );
    } catch (error) {
        console.error("Lỗi khi xoá yêu thích:", error);
    }
    };
  return (
    <div className="container my-5">
      <h3 className="mb-4 text-center">Danh sách sản phẩm được yêu thích</h3>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Người dùng</th>
            <th>Sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((fav) => {
            const prod = productsMap[fav.san_pham_id];
            return (
                <tr key={fav.id}>
                <td>{fav.nguoi_dung_id}</td>
                <td>{prod?.ten_san_pham || "[??]"}</td>
                <td>
                    <img src={`/img/imgproduct/${prod?.hinh_anh_dai_dien}`} width={80} alt="" />
                </td>
                <td>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteFavorite(fav.nguoi_dung_id, fav.san_pham_id)}
                >
                    Xoá
                </button>
                </td>
                </tr>
            );
            })}
        </tbody>
      </table>
    </div>
  );
}
