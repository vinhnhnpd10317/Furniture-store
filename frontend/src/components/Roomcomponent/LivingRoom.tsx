import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchLatestProducts, type ProductItem } from "../../api/ProductApi";

export default function LivingRoom() {
    const [sanphams, setSanPham] = useState<ProductItem[]>([]);
    useEffect(() => {
        fetchLatestProducts().then(setSanPham).catch((error) => console.error("Lỗi khi load sản phẩm", error));
    }, []);

    return (
        <div className="container-fluid px-0">
            <img style={{ height: "auto" }} src="../public/img/img-room/img-living-room/h2.avif" alt="hinh1" className="img-fluid w-100 mb-4 shadow" />
            <div className="container py-4">
                <Link to="/" className="btn btn-outline-secondary mb-4">
                    ← Quay lại
                </Link>
                <h1 className="text-uppercase text-success mb-3">"PHÒNG KHÁCH" NƠI LƯU GIỮ NỤ CƯỜI</h1>

                {/* nội dung tĩnh */}
                <div className="row g-4">
                    <div className="col-md-8">
                        <img src="../public/img/img-room/img-living-room/h4.avif" alt="hinh4" className="card-img-top shadow" style={{ height: "500px", borderRadius: "5px" }} />
                    </div>

                    <div className="col-md-4">
                        <h4 className="text-success fw-light mt-4">
                            Vẻ Đẹp Cổ Điển Thanh Lịch Trong Không Gian Phòng Khách
                        </h4>
                        <p style={{ textAlign: "justify" }} className="fw-light">Phòng khách là trái tim của ngôi nhà – nơi khởi nguồn cho những cuộc trò chuyện, những khoảnh khắc gắn kết yêu thương. Với gam màu xanh bạc hà dịu nhẹ, kết hợp cùng nội thất cổ điển và điểm nhấn là thảm xanh cổ điển, không gian mang đến cảm giác thư thái và sang trọng.
                            Chiếc lò sưởi trung tâm, đèn chùm pha lê và các chi tiết trang trí tinh tế như tranh treo tường, bình hoa cổ điển góp phần hoàn thiện vẻ đẹp thanh lịch và ấm cúng. Đây chính là lựa chọn lý tưởng cho những ai yêu thích phong cách sống đậm chất châu Âu, nhưng vẫn đầy gần gũi và tinh tế.</p>
                    </div>

                    <div className="col-md-4 shadow">
                        <img style={{ borderRadius: "3px" }} src="../public/img/img-room/img-living-room/h5.avif" alt="hinh5" className="card-img-top shadow" />
                        <h4 className="text-success fw-light">Phòng Khách Tràn Ngập Ánh Sáng – Không Gian Gắn Kết & Thư Giãn</h4>
                        <p style={{ textAlign: "justify" }} className="fw-light mt-4">Một phòng khách lý tưởng không chỉ là nơi tiếp đón khách đến chơi nhà mà còn là không gian để gia đình quây quần, thư giãn và tận hưởng cuộc sống. Với thiết kế cửa sổ lớn đón nắng, sắc xanh tươi từ cây lá, cùng những gam màu trung tính nhẹ nhàng, căn phòng như hòa quyện với thiên nhiên bên ngoài.</p>
                    </div>
                    <div className="col-md-4 shadow">
                        <img style={{ borderRadius: "3px" }} src="../public/img/img-room/img-living-room/h6.avif" alt="hinh5" className="card-img-top shadow" />
                        <h4 className="text-success fw-light">Phòng Khách Đậm Chất Nghệ Thuật – Điểm Nhấn Của Cảm Xúc & Trí Tuệ</h4>
                        <p style={{ textAlign: "justify" }} className="fw-light mt-4">Không gian phòng khách này là sự hòa quyện hoàn hảo giữa nghệ thuật, tri thức và cảm xúc. Điểm nhấn là bức tranh trừu tượng màu cam nổi bật, làm bừng sáng toàn bộ căn phòng và tạo cảm hứng ngay từ ánh nhìn đầu tiên.</p>
                    </div>
                    <div className="col-md-4 shadow">
                        <img style={{ borderRadius: "3px" }} src="../public/img/img-room/img-living-room/h7.avif" alt="hinh5" className="card-img-top shadow" />
                        <h4 className="text-success fw-light">Phòng Khách Vintage Mộc Mạc – Chạm Vào Ký Ức & Sự Bình Yên</h4>
                        <p style={{ textAlign: "justify" }} className="fw-light mt-4">Nếu bạn đang tìm kiếm một không gian sống mang tính cá nhân, đậm chất hoài cổ và thư giãn, thì phòng khách này chính là lựa chọn hoàn hảo. Với tone màu xanh olive trầm ấm chủ đạo, kết hợp cùng lò sưởi cổ điển và ánh nắng vàng rót nhẹ qua khung cửa sổ, căn phòng gợi nhắc đến những buổi chiều yên ả nơi miền quê châu Âu.</p>
                    </div>

                    <div className="col-md-12 shadow-sm">
                        <img style={{ height: "auto", borderRadius: "3px" }} src="../public/img/img-room/img-living-room/h8.avif" alt="hinh8" className="card-img-top shadow" />
                    </div>

                    <div className="col-md-4">
                        <img style={{ height: "500px", borderRadius: "3px" }} src="../public/img/img-room/img-living-room/h9.avif" alt="" className="card-img-top" />
                    </div>
                    <div className="col-md-4">
                        <img style={{ height: "500px", borderRadius: "3px" }} src="../public/img/img-room/img-living-room/h10.avif" alt="" className="card-img-top" />
                    </div>
                    <div className="col-md-4">
                        <img style={{ height: "500px", borderRadius: "3px" }} src="../public/img/img-room/img-living-room/h11.avif" alt="" className="card-img-top" />
                    </div>

                    {/* render 3 sản phẩm mới nhất*/}
                    <div className="container my-5">
                        <h3 className="text-success mb-4 text-center">SẢN PHẨM MỚI NHẤT</h3>
                        <div className="row">
                            {sanphams.map((product) => (
                                <div className="col-md-4 mb-4" key={product.id}>
                                    <div className="card shadow h-100">
                                        <img
                                            src={`/img/imgproduct/${product.hinh_anh_dai_dien}`}
                                            alt={product.ten_san_pham}
                                            className="card-img-top"
                                            style={{ height: "250px", objectFit: "cover" }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title text-success">{product.ten_san_pham}</h5>
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
        </div>
    )
}