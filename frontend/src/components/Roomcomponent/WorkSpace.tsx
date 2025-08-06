import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchLatestProducts, type ProductItem } from "../../api/ProductApi";

export default function WorkRoom() {
    const [sanphams, setSanPham] = useState<ProductItem[]>([]);
    useEffect(() => {
        fetchLatestProducts().then(setSanPham).catch((error) => console.error("Lỗi khi load sản phẩm", error));
    }, []);

    const imageStyle: React.CSSProperties = {
        objectFit: "cover",
        aspectRatio: "4/3",
        borderRadius: "5px",
    };

    return (
        <div className="container-fluid px-0">
            <img
                src="https://cdn0212.cdn4s.com/media/phong-khach-ket-hop-phong-lam-viec-19.jpg"
                alt="phonglamviec-banner"
                className="img-fluid w-100 mb-4 shadow"
                style={{ objectFit: "cover", aspectRatio: "16/6" }}
            />

            <div className="container py-4">
                <Link to="/" className="btn btn-outline-secondary mb-4">
                    ← Quay lại
                </Link>
                <h1 className="text-uppercase text-primary mb-3">PHÒNG LÀM VIỆC – KHÔNG GIAN CỦA CẢM HỨNG & TẬP TRUNG</h1>

                <div className="row g-4">
                    <div className="col-md-6">
                        <img
                            src="https://donggia.vn/wp-content/uploads/2020/10/thiet-ke-noi-that-phong-chu-tich-giam-doc-8.jpg"
                            alt="phong1"
                            className="img-fluid w-100 shadow"
                            style={imageStyle}
                        />
                    </div>
                    <div className="col-md-6">
                        <h4 className="text-primary fw-light mt-3">Thiết Kế Tối Giản Tăng Hiệu Suất</h4>
                        <p style={{ textAlign: "justify" }} className="fw-light">
                            Không gian làm việc nên là nơi khơi gợi sự tập trung và sáng tạo. Với bàn gỗ đơn giản, ánh sáng tự nhiên và bố trí gọn gàng, phòng làm việc này mang đến cảm giác dễ chịu và hiệu quả. Màu trắng chủ đạo kết hợp cùng cây xanh tạo nên sự cân bằng giữa công việc và cảm hứng.
                        </p>
                    </div>

                    <div className="col-md-4 shadow">
                        <img
                            src="https://tse2.mm.bing.net/th/id/OIP.DQYxH_9gp5gr-48_uD_MtwHaE8?pid=Api&P=0&h=180g"
                            alt="phong2"
                            className="img-fluid w-100"
                            style={imageStyle}
                        />
                        <h5 className="text-primary mt-3">Không Gian Sáng Tạo Cho Freelancer</h5>
                        <p style={{ textAlign: "justify" }} className="fw-light">
                            Dành cho người làm việc tự do, căn phòng mang phong cách mở và linh hoạt, giúp bạn có thể dễ dàng thay đổi không gian theo tâm trạng. Sự kết hợp giữa kệ sách mở, đèn làm việc và các vật trang trí nghệ thuật tạo nên môi trường kích thích tư duy.
                        </p>
                    </div>

                    <div className="col-md-4 shadow">
                        <img
                            src="https://thietkevanphong.pro/wp-content/uploads/2021/02/thiet-ke-phong-lam-viec-tai-nha-0.jpg"
                            alt="phong3"
                            className="img-fluid w-100"
                            style={imageStyle}
                        />
                        <h5 className="text-primary mt-3">Góc Làm Việc Cạnh Cửa Sổ</h5>
                        <p style={{ textAlign: "justify" }} className="fw-light">
                            Nếu bạn yêu thích ánh sáng tự nhiên, một góc làm việc gần cửa sổ sẽ là sự lựa chọn tuyệt vời. Thiết kế này không chỉ giúp tiết kiệm điện mà còn giúp mắt được thư giãn sau mỗi giờ làm việc căng thẳng.
                        </p>
                    </div>

                    <div className="col-md-4 shadow">
                        <img
                            src="https://luxcasa.vn/img/goi-y-cai-tao-phong-lam-viec-tai-nha.jpg"
                            alt="phong4"
                            className="img-fluid w-100"
                            style={imageStyle}
                        />
                        <h5 className="text-primary mt-3">Phòng Làm Việc Cho Người Bận Rộn</h5>
                        <p style={{ textAlign: "justify" }} className="fw-light">
                            Với thiết kế đa chức năng, mọi vật dụng đều được bố trí khoa học, phòng làm việc này phù hợp với những người có lịch làm việc dày đặc. Ghế công thái học, bàn làm việc có hộc tủ và bảng ghi chú giúp mọi việc trở nên ngăn nắp.
                        </p>
                    </div>

                    <div className="col-md-12 shadow-sm">
                        <img
                            src="https://hcmute.edu.vn/Resources/Images/SubDomain/HomePage/Tin%20van/Nam%202023/27-7-2023/Sang%20tao/Sang%20tao%205.jpg"
                            alt="collection"
                            className="img-fluid w-100 mb-4"
                            style={imageStyle}
                        />
                    </div>

                    <div className="col-md-4">
                        <img
                            src="https://www.constructionplusasia.com/wp-content/uploads/2021/09/khong-gian-lam-viec-1.jpg"
                            alt=""
                            className="img-fluid w-100"
                            style={imageStyle}
                        />
                    </div>
                    <div className="col-md-4">
                        <img
                            src="https://hcmute.edu.vn/Resources/Images/SubDomain/HomePage/Tin%20van/Nam%202023/27-7-2023/Sang%20tao/Sang%20tao%204.jpg"
                            alt=""
                            className="img-fluid w-100"
                            style={imageStyle}
                        />
                    </div>
                    <div className="col-md-4">
                        <img
                            src="https://dehouse.vn/wp-content/uploads/2023/02/16-2.png"
                            alt=""
                            className="img-fluid w-100"
                            style={imageStyle}
                        />
                    </div>
                </div>

                <div className="container my-5">
                    <h3 className="text-primary mb-4 text-center">SẢN PHẨM MỚI NHẤT CHO PHÒNG LÀM VIỆC</h3>
                    <div className="row">
                        {sanphams.map((product) => (
                            <div className="col-md-4 mb-4" key={product.id}>
                                <div className="card shadow h-100">
                                    <img
                                        src={`/img/imgproduct/${product.hinh_anh_dai_dien}`}
                                        alt={product.ten_san_pham}
                                        className="card-img-top"
                                        style={{ objectFit: "cover", aspectRatio: "4/3" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">{product.ten_san_pham}</h5>
                                        <p className="card-text text-muted">
                                            {product.mo_ta.length > 100
                                                ? product.mo_ta.slice(0, 100) + "..."
                                                : product.mo_ta}
                                        </p>
                                        <p className="fw-bold">{product.gia.toLocaleString()} VNĐ</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
