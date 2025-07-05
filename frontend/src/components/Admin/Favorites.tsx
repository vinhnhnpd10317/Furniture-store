import React, { useEffect, useState } from "react";
import { getFavorites } from "../../api/FavoriteApi";
import { fetchProducts } from "../../api/ProductApi";

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

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-center">Danh sách sản phẩm được yêu thích</h3>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Người dùng</th>
            <th>Sản phẩm</th>
            <th>Hình ảnh</th>
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
                </tr>
            );
            })}
        </tbody>
      </table>
    </div>
  );
}
