import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Productdetail.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

interface Product {
    name: string;
    material: string;
    size: string;
    code: string;
    category: string;
    mainImage: string;
    images: string[];
    description: string[];
    warranty: string;
}

export default function ProductDetail() {
    const [likedList, setLikedList] = useState<boolean[]>(Array(8).fill(false));

    const toggleLike = (index: number) => {
        const updated = [...likedList];
        updated[index] = !updated[index];
        setLikedList(updated);
    };

    // Giả lập dữ liệu sản phẩm lấy từ DB
    const product: Product = {
        name: "Armchair Hùng King + Gối VACT3231",
        material: "Mặt ngồi nhồi đệm bọc vải, chân kim loại",
        size: "S910 - RF60 - C1000mm",
        code: "31176218",
        category: "Armchair, Phòng khách",
        mainImage: "img/imgproduct/image.png",
        images: [
            "img/imgproduct/image.png",
            "img/imgproduct/image1.png",
            "img/imgproduct/image2.png",
            "img/imgproduct/image3.png",
            "img/imgproduct/image4.png",
            "img/imgproduct/image5.png",
        ],
        description: [
            "Khung ghế bằng gỗ, mặt ngồi bọc vải",
            "Màu sắc: Màu be",
            "Hàng thật như hình",
            "Không giống hoàn tiền 100%",
            "Giao hàng tận nơi, kiểm tra hàng trước khi thanh toán",
        ],
        warranty: "Bảo hành 12 tháng.",
    };

    const comments = [
    {
        user: "Nguyễn Văn A",
        avatar: "https://i.pravatar.cc/40?img=1",
        comment: "Sản phẩm rất đẹp, chất lượng tốt.",
        time: "2 giờ trước"
    },
    {
        user: "Trần Thị B",
        avatar: "https://i.pravatar.cc/40?img=2",
        comment: "Đã mua và rất hài lòng!",
        time: "1 ngày trước"
    }
  ];

    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState<string>(product.mainImage);

    const handleQuantityChange = (value: number) => {
        if (quantity + value >= 1) {
        setQuantity(quantity + value);
        }
    };

    return (
        <div className="container mt-4 mb-5">
            <div className="row">
                {/* Product Images */}
                <div className="col-md-6">
                <img
                    src={mainImage}
                    className="img-fluid mb-3"
                    alt="Main Product"
                    style={{ maxHeight: "500px", objectFit: "cover", width: "100%" }}
                />

                <div className="d-flex gap-2 flex-wrap">
                    {product.images.map((img, i) => (
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

                {/* Product Info */}
                <div className="col-md-6 mt-5">
                <h2 className="mb-3">{product.name}</h2>
                <p><strong>Vật liệu:</strong> {product.material}</p>
                <p><strong>Chất liệu:</strong> {product.size}</p>
                <p><strong>Mã SP:</strong> {product.code}</p>
                <p><strong>Danh mục:</strong> {product.category}</p>

                <div className="my-3 d-flex align-items-center">
                    <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(-1)}>-</button>
                    <span className="mx-3">{quantity}</span>
                    <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(1)}>+</button>
                </div>

                <div className="d-flex gap-2 flex-wrap">
                    <button className="btn btn-dark">MUA NGAY</button>
                    <button className="btn btn-outline-dark">THÊM VÀO GIỎ</button>
                </div>
                </div>
            </div>

            {/* Mô tả sản phẩm */}
            <div className="row mt-5">
                <div className="col-12">
                <h4 className="mb-3">MÔ TẢ SẢN PHẨM</h4>
                <div className="border p-4 bg-light rounded">
                    <ul>
                    {product.description.map((desc, index) => (
                        <li key={index}>{desc}</li>
                    ))}
                    </ul>
                    <p className="mt-3"><strong>{product.warranty}</strong></p>
                </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-5 d-none d-md-block">
                <h4 className="mb-4 fw-bold text-center">Sản phẩm bạn có thể thích</h4>
                <div className="row g-4">
                    {[1, 2, 3, 4].map((_, idx) => (
                        <div className="col-6 col-sm-6 col-md-4 col-lg-3" key={idx}>
                            <div className="product-cards h-100 d-flex flex-column justify-content-between">
                                <img
                                    src="img/imgproduct/product.png"
                                    alt="Armchair Mimi"
                                    className="img-fluid"
                                />
                                <div className="d-flex justify-content-between align-items-start mt-2">
                                    <h6 className="mb-1">Armchair Mimi</h6>
                                    <div className="text-end">
                                        <i
                                            className={`bi ${likedList[idx] ? "bi-heart-fill" : "bi-heart"} product-heart-icon`}
                                            style={{
                                                fontSize: "1.2rem",
                                                color: likedList[idx] ? "red" : "#999",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => toggleLike(idx)}
                                        />
                                        <div className="product-price mt-1" style={{ fontSize: 14 }}>
                                            49.000.000₫
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-group d-flex justify-content-center mt-3 product-btn-group">
                                    <button className="btn btn-outline-dark btn-sm">THÊM VÀO GIỎ</button>
                                    <button className="btn btn-dark btn-sm">XEM THÊM</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Comments Section */}
            <div className="mt-5">
                <h5 className="fw-bold mb-4">Bình luận</h5>

                {/* Danh sách bình luận */}
                <div className="mb-4">
                {comments.map((cmt, idx) => (
                    <div
                    key={idx}
                    className="d-flex align-items-start gap-3 p-3 mb-3 rounded shadow-sm"
                    >
                        <img
                            src={cmt.avatar}
                            className="rounded-circle"
                            alt="User"
                            width={40}
                            height={40}
                        />
                        <div>
                            <h6 className="mb-1 fw-semibold">{cmt.user}</h6>
                            <p className="mb-1">{cmt.comment}</p>
                            <small className="text-muted">{cmt.time}</small>
                        </div>
                    </div>
                ))}
                </div>

                {/* Form bình luận */}
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
                        ></textarea>
                        <div className="d-flex justify-content-end mt-2">
                        <button className="btn btn-dark btn-sm">Gửi</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        
    );
}
