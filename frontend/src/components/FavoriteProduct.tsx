import React, { useEffect, useState } from "react";
import { getFavoritesByUser } from "../api/FavoriteApi";
import { useAuth } from "../components/AuthContext";
import { useCart } from "../components/Products/CartContext";
import { useNavigate } from "react-router-dom";
import { deleteFavorite } from "../api/FavoriteApi";


interface FavoriteItem {
  id: number;
  san_pham_id: number;
  ten_san_pham: string;
  hinh_anh_dai_dien: string;
  gia: number;
  trang_thai_kho: string;
}

export default function FavoriteProducts() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleDeleteFavorite = async (san_pham_id: number) => {
  if (!user?.id) return;
  if (!window.confirm("Bạn có chắc muốn xoá sản phẩm khỏi yêu thích không?")) return;

  try {
    await deleteFavorite(user.id, san_pham_id);
    // Cập nhật lại danh sách yêu thích sau khi xoá
    setFavorites(prev => prev.filter(item => item.san_pham_id !== san_pham_id));
  } catch (err) {
    console.error("Lỗi khi xoá sản phẩm yêu thích:", err);
  }
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
              <div className="card h-100 shadow-sm position-relative">
                {/* Nút Xoá góc trên bên phải */}
                <button
                  className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                  style={{ borderRadius: "50%", padding: "5px 8px" }}
                  onClick={() => handleDeleteFavorite(item.san_pham_id)}
                  title="Xoá khỏi yêu thích"
                >
                  ✕
                </button>

                <img
                  src={
                    item.hinh_anh_dai_dien
                      ? `/img/imgproduct/${item.hinh_anh_dai_dien}`
                      : "/img/imgproduct/product.png"
                  }
                  alt={item.ten_san_pham}
                  className="img-fluid"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    opacity: item.trang_thai_kho === "het_hang" ? 0.6 : 1,
                  }}
                />

                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{item.ten_san_pham}</h5>
                  <p className="card-text text-danger fw-bold">
                    {item.gia.toLocaleString("vi-VN")}₫
                  </p>

                  {item.trang_thai_kho === "het_hang" ? (
                    <div className="text-center mt-2 text-danger fw-bold">HẾT HÀNG</div>
                  ) : (
                    <div className="d-flex justify-content-between gap-2 mt-auto">
                      <button
                        className="btn btn-outline-dark btn-sm flex-fill"
                        onClick={() => handleAddToCart(item)}
                      >
                        Thêm vào giỏ
                      </button>
                      <button
                        className="btn btn-dark btn-sm flex-fill"
                        onClick={() => navigate(`/productdetail/${item.san_pham_id}`)}
                      >
                        Xem thêm
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
