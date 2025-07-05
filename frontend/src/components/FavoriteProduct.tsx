import React, { useEffect, useState } from "react";
import { getFavoritesByUser } from "../api/FavoriteApi";
import { useAuth } from "../components/AuthContext";
import { useCart } from "../components/Products/CartContext";
import { useNavigate } from "react-router-dom";

interface FavoriteItem {
  id: number;
  san_pham_id: number;
  ten_san_pham: string;
  hinh_anh_dai_dien: string;
  gia: number;
}

export default function FavoriteProducts() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    if (user?.id) {
      getFavoritesByUser(user.id)
        .then(setFavorites)
        .catch((err) => console.error("Lỗi khi tải yêu thích:", err));
    }
  }, [user]);

  const handleAddToCart = (item: FavoriteItem) => {
    addToCart({
      id: item.san_pham_id,
      name: item.ten_san_pham,
      price: item.gia,
      quantity: 1,
      image: `/img/imgproduct/${item.hinh_anh_dai_dien}`,
      material: "N/A",
      texture: "N/A",
    });
    alert("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">🧡 Sản phẩm yêu thích</h2>
      <div className="row">
        {favorites.length === 0 ? (
          <p>Bạn chưa có sản phẩm yêu thích nào.</p>
        ) : (
          favorites.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={`/img/imgproduct/${item.hinh_anh_dai_dien}`}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  alt={item.ten_san_pham}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{item.ten_san_pham}</h5>
                  <p className="card-text text-danger fw-bold">{item.gia.toLocaleString("vi-VN")}₫</p>
                  <div className="d-flex justify-content-between mt-auto">
                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() => handleAddToCart(item)}
                    >
                      Thêm vào giỏ
                    </button>
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() => navigate(`/productdetail/${item.san_pham_id}`)}
                    >
                      Xem thêm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
