import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Productdetail.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, type ProductItem } from "../../api/ProductApi";
import type { CategoryItem } from "../../api/CategoryApi";
import { useCart } from "../Products/CartContext";
import { fetchComments, postComment, type BinhLuan } from "../../api/Comment";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string>("");
  const [commentContent, setCommentContent] = useState("");
  const [commentList, setCommentList] = useState<BinhLuan[]>([]);
  const [likedList, setLikedList] = useState<boolean[]>(Array(8).fill(false));

  const { addToCart } = useCart();

  const handleAddToCart = (item: ProductItem) => {
    addToCart({
      id: item.id,
      name: item.ten_san_pham,
      price: Number(item.gia),
      quantity: quantity,
      image: item.hinh_anh_dai_dien
        ? `/img/imgproduct/${item.hinh_anh_dai_dien}`
        : "/img/imgproduct/default.jpg",
      material: item.vat_lieu || "N/A",
      texture: item.chat_lieu || "N/A",
    });
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  const toggleLike = (index: number) => {
    const updated = [...likedList];
    updated[index] = !updated[index];
    setLikedList(updated);
  };

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
        setMainImage(`/img/imgproduct/${fetchedProduct.hinh_anh_dai_dien}`);
        setLoading(false);
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

  useEffect(() => {
    if (product) {
      fetchComments().then((data) => {
        const filtered = data.filter(
          (cmt) => cmt.ten_san_pham === product.ten_san_pham
        );
        setCommentList(filtered);
      });
    }
  }, [product]);

  const getTenDanhMuc = (id: number) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.ten_danh_muc : "Không rõ";
  };

  const handleQuantityChange = (value: number) => {
    if (quantity + value >= 1) {
      setQuantity(quantity + value);
    }
  };

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
    } catch (err) {
      alert("Gửi bình luận thất bại");
    }
  };

  if (loading) {
    return <div className="container mt-4">Đang tải sản phẩm...</div>;
  }

  if (error || !product) {
    return (
      <div className="container mt-4">
        {error || "Không tìm thấy sản phẩm"}
      </div>
    );
  }

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
            style={{
              maxHeight: "500px",
              objectFit: "cover",
              width: "100%",
              outline: "none",
            }}
          />
          <div className="d-flex gap-2 flex-wrap">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setMainImage(img)}
                className={`img-thumbnail ${
                  mainImage === img ? "border-primary border-3" : ""
                }`}
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
          <h2 className="mb-3">{product.ten_san_pham}</h2>
          <p><strong>Vật liệu:</strong> {product.vat_lieu || "Chưa cập nhật"}</p>
          <p><strong>Chất liệu:</strong> {product.chat_lieu || "Chưa cập nhật"}</p>
          <p><strong>Giá:</strong> {product.gia ? product.gia.toLocaleString("vi-VN") + "₫" : "Chưa cập nhật"}</p>
          <p><strong>Danh mục:</strong> {getTenDanhMuc(Number(product.danh_muc_id))}</p>
          <div className="my-3 d-flex align-items-center">
            <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(-1)}>-</button>
            <span className="mx-3">{quantity}</span>
            <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <button className="btn btn-dark">MUA NGAY</button>
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