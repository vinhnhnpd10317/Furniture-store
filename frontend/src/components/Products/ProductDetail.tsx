import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Productdetail.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, fetchRelatedProducts, type ProductItem } from "../../api/ProductApi";
import type { CategoryItem } from "../../api/CategoryApi";
import { useCart } from "../Products/CartContext";
import { fetchComments, postComment, type BinhLuan } from "../../api/Comment";
import { useAuth } from "../../components/AuthContext";
import { addFavorite, deleteFavorite, getFavoritesByUser } from "../../api/FavoriteApi";
import { useNavigate } from "react-router-dom";

export default function ProductDetail() {
    // const [likedList, setLikedList] = useState<boolean[]>(Array(8).fill(false));
    const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
    const [product, setProduct] = useState<ProductItem | null>(null);
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState<string>("");
    const { addToCart } = useCart();
    const [relatedProducts, setRelatedProducts] = useState<ProductItem[]>([]);

    const [commentContent, setCommentContent] = useState("");
    const [commentList, setCommentList] = useState<BinhLuan[]>([]);
    const { user } = useAuth(); // lấy thông tin user đăng nhập
    const [favoriteProductIds, setFavoriteProductIds] = useState<number[]>([]);

    const navigate = useNavigate();

    // Lấy danh sách sản phẩm yêu thích của người dùng
    useEffect(() => {
      if (user?.id) {
        getFavoritesByUser(user.id)
          .then((data) => {
            const ids = data.map((fav: { san_pham_id: number }) => fav.san_pham_id);
            setFavoriteProductIds(ids);
          })
          .catch((err) => console.error("Lỗi khi tải yêu thích:", err));
      }
    }, [user]);

    const handleToggleFavorite = async (productId: number) => {
    if (!user?.id) {
      alert("Bạn cần đăng nhập để sử dụng chức năng này.");
      return;
    }

    try {
      if (favoriteProductIds.includes(productId)) {
        await deleteFavorite(user.id, productId);
        setFavoriteProductIds((prev) => prev.filter((id) => id !== productId));
        alert("Đã xóa khỏi danh sách yêu thích!");
      } else {
        await addFavorite(user.id, productId);
        setFavoriteProductIds((prev) => [...prev, productId]);
        alert("Đã thêm vào danh sách yêu thích!");
      }
    } catch (error) {
      console.error("Lỗi khi xử lý yêu thích:", error);
    }
  };

    // Thêm vào giỏ hàng
    const handleAddToCart = (item: ProductItem) => {
        addToCart({
            id: item.id,
            name: item.ten_san_pham,
            price: Number(item.gia),
            quantity: quantity, // Sử dụng số lượng đã chọn
            image: item.hinh_anh_dai_dien
                ? `/img/imgproduct/${item.hinh_anh_dai_dien}`
                : "/img/imgproduct/default.jpg",
            material: item.vat_lieu || 'N/A',
            texture: item.chat_lieu || 'N/A',
        });
        alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
    };

    // Tải dữ liệu sản phẩm theo ID
    useEffect(() => {
        window.scrollTo(0, 0);

        const loadProduct = async () => {
        if (!id) {
            setError("Thiếu ID sản phẩm");
            setLoading(false);
            return;
        }

        try {
            const fetchedProduct = await fetchProductById(id);
            setProduct(fetchedProduct);
            const related = await fetchRelatedProducts(
                fetchedProduct.id,
                Number(fetchedProduct.danh_muc_id)
            );
            setRelatedProducts(related);

            setMainImage(`/img/imgproduct/${fetchedProduct.hinh_anh_dai_dien }`); // Đặt hình ảnh chính
            setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Không thể tải sản phẩm này");
            setLoading(false);
        }
        };

        loadProduct();
    }, [id]);
    
    useEffect(() => {
        fetch("http://localhost:3001/categorys")
            .then((res) => res.json())
            .then(setCategories);
    }, []);

    // Mua ngay
    const handleBuyNow = (item: ProductItem) => {
      const productToBuy = {
        id: item.id,
        name: item.ten_san_pham,
        price: Number(item.gia),
        quantity: quantity,
        image: item.hinh_anh_dai_dien
          ? `/img/imgproduct/${item.hinh_anh_dai_dien}`
          : "/img/imgproduct/default.jpg",
        material: item.vat_lieu || 'N/A',
        texture: item.chat_lieu || 'N/A',
      };

      navigate("/orderform", { state: { buyNowItem: productToBuy } });
    };

    // Load comment
    useEffect(() => {
      const loadComments = async () => {
          if (!product) return;

          try {
              const comments = await fetchComments();
              const filtered = comments.filter(
                  (cmt) => cmt.ten_san_pham === product.ten_san_pham
              );
              setCommentList(filtered);
          } catch (err) {
              console.error("Lỗi tải bình luận:", err);
          }
      };

      loadComments();
    }, [product]);

    const getTenDanhMuc = (id: number) => {
        const cat = categories.find((c) => c.id === id);
        return cat ? cat.ten_danh_muc : "Không rõ";
    };

    // Xử lý thay đổi số lượng
    const handleQuantityChange = (value: number) => {
        if (quantity + value >= 1) {
        setQuantity(quantity + value);
        }
    };

    // bình luận
    const handleSendComment = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "null");

      if (!user) {
        alert("Bạn cần đăng nhập để gửi bình luận!");
        return;
      }

      if (!id || !commentContent.trim()) {
        alert("Nội dung bình luận không được để trống.");
        return;
      }

      try {
        await postComment({
          nguoi_dung_id: user.id,
          san_pham_id: Number(id),
          noi_dung: commentContent,
        });

        setCommentContent("");

        const updated = await fetchComments();
        const filtered = updated.filter(
          (cmt) => cmt.ten_san_pham === product?.ten_san_pham
        );
        setCommentList(filtered);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        alert("Gửi bình luận thất bại");
      }
    };

    // Xử lý khi đang tải hoặc lỗi
    if (loading) {
        return <div className="container mt-4">Đang tải sản phẩm...</div>;
    }

    if (error || !product) {
        return <div className="container mt-4">{error || "Không tìm thấy sản phẩm"}</div>;
    }

    // Xử lý danh sách hình ảnh từ chuỗi JSON
    const imageList = product.ds_hinh_anh
    ? product.ds_hinh_anh.split(";").filter((img) => img.trim() !== "")
    : [];

    const allImages = [
    product.hinh_anh_dai_dien,
    ...imageList.filter((img) => img !== product.hinh_anh_dai_dien),
    ];

    const images = allImages.map((img) => "/img/imgproduct/" + img);

    return (
        <div className="container mt-4 mb-5">
            <div className="row">
                {/* Hình ảnh sản phẩm */}
                <div className="col-md-6">
                    <img
                        src={mainImage}
                        className="img-fluid mb-3"
                        alt="Main Product"
                        style={{ maxHeight: "500px", objectFit: "cover", width: "100%", outline: "none" }}
                    />

                    <div className="d-flex gap-2 flex-wrap">
                        {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            onClick={() => setMainImage(img)}
                            className={`img-thumbnail ${mainImage === img ? "border-primary border-3" : ""}`}
                            alt={`Thumb ${i}`}
                            style={{
                            width: "80px",
                            height: "80px",
                            cursor: "pointer",
                            objectFit: "cover",
                            }}
                        />
                        ))}
                    </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="col-md-6 mt-5">
                    <h2 className="mb-3">{product.ten_san_pham || "Tên sản phẩm không có"}</h2>
                    <p><strong>Vật liệu:</strong> {product.vat_lieu || "Chưa cập nhật"}</p>
                    <p><strong>Chất liệu:</strong> {product.chat_lieu || "Chưa cập nhật"}</p>
                    <p><strong>Giá:</strong> {product.gia ? product.gia.toLocaleString("vi-VN") + "₫" : "Chưa cập nhật"}</p>
                    <p><strong>Danh mục:</strong> {getTenDanhMuc(Number(product.danh_muc_id))}</p>

                    <div className="my-3 d-flex align-items-center">
                        <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(-1)}>
                        -
                        </button>
                        <span className="mx-3">{quantity}</span>
                        <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(1)}>
                        +
                        </button>
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
                        <button className="btn btn-dark" onClick={() => handleBuyNow(product)}>MUA NGAY</button>
                        <button className="btn btn-outline-dark" onClick={() => handleAddToCart(product)}>THÊM VÀO GIỎ</button>
                    </div>
                </div>
            </div>

            {/* Mô tả sản phẩm */}
            <div className="row mt-5">
                <div className="col-12">
                    <h4 className="mb-3">MÔ TẢ SẢN PHẨM</h4>
                    <div className="border p-4 bg-light rounded">
                        <p>{product.mo_ta || "Chưa có mô tả"}</p>
                        <p className="mt-3"><strong>Ngày tạo:</strong> {product.ngay_tao || "Chưa cập nhật"}</p>
                    </div>
                </div>
            </div>

            {/* Sản phẩm liên quan */}
            <div className="mt-5 d-none d-md-block">
                <h4 className="mb-4 fw-bold text-center">Sản phẩm bạn có thể thích</h4>
                <div className="row g-4">
                    {relatedProducts.map((item) => (
                        <div className="col-6 col-sm-6 col-md-4 col-lg-3" key={item.id}>
                            <div className="product-cards h-100 d-flex flex-column justify-content-between">
                                <img
                                    src={`/img/imgproduct/${item.hinh_anh_dai_dien || "default.jpg"}`}
                                    alt={item.ten_san_pham}
                                    className="img-fluid"
                                    style={{ height: 180, objectFit: "cover" }}
                                />
                                <div className="d-flex justify-content-between align-items-start mt-2">
                                    <h6 className="mb-1">{item.ten_san_pham}</h6>
                                    <div className="text-end">
                                        <i
                                          className={`bi ${
                                            favoriteProductIds.includes(item.id) ? "bi-heart-fill text-danger" : "bi-heart"
                                          } product-heart-icon`}
                                          style={{
                                            fontSize: "1.2rem",
                                            cursor: "pointer",
                                          }}
                                          onClick={() => handleToggleFavorite(item.id)}
                                        />

                                        <div className="product-price mt-1" style={{ fontSize: 14 }}>
                                            {Number(item.gia).toLocaleString("vi-VN")}₫
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-group d-flex justify-content-center mt-3 product-btn-group">
                                    <button
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        THÊM VÀO GIỎ
                                    </button>
                                    <button
                                        className="btn btn-dark btn-sm"
                                        onClick={() => window.location.href = `/productdetail/${item.id}`}
                                    >
                                        XEM THÊM
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Phần bình luận */}
            <div className="mt-5">
              <h5 className="fw-bold mb-4">Bình luận</h5>
              <div className="mb-4">
                {commentList.map((cmt, idx) => (
                  <div key={idx} className="d-flex align-items-start gap-3 p-3 mb-3 rounded shadow-sm">
                    <img
                      src={`https://i.pravatar.cc/40?img=${(idx % 10) + 1}`}
                      className="rounded-circle"
                      alt="User"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h6 className="mb-1 fw-semibold">{cmt.ten_nguoi_dung}</h6>
                      <p className="mb-1">{cmt.noi_dung}</p>
                      <small className="text-muted">
                        {new Date(cmt.ngay_binh_luan).toLocaleString()}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gửi bình luận */}
              {localStorage.getItem("user") ? (
                <div className="d-flex align-items-start gap-3">
                  <img
                    src="https://i.pravatar.cc/40?img=3"
                    className="rounded-circle"
                    alt="User"
                    width={40}
                    height={40}
                  />
                  <div className="flex-grow-1">
                    <textarea
                      className="form-control"
                      placeholder="Nhập bình luận của bạn..."
                      rows={3}
                      style={{ resize: "none" }}
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                    ></textarea>
                    <div className="d-flex justify-content-end mt-2">
                      <button className="btn btn-dark btn-sm" onClick={handleSendComment}>
                        Gửi
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="alert alert-warning">
                  Vui lòng <a href="/login">đăng nhập</a> để bình luận.
                </div>
              )}
            </div>
        </div>
    );
}