import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavoritesLatest, type FavoriteItem } from "../../api/FavoriteApi";

export default function KitchenRoom() {
    const [fvrpro, setFvrPro] = useState<FavoriteItem[]>([]);

    useEffect(() => {
        getFavoritesLatest()
            .then(setFvrPro)
            .catch((error) =>
                console.error("Lỗi khi load 4 sản phẩm yêu thích nhất", error)
            );
    }, []);

    return (
        <div className="container-fluid px-0">
            <img src="https://nhaxinh.com/wp-content/uploads/2025/01/Ghe-An-Napoli-1-05-768x511.jpg" alt="" className="img-fluid w-100 mb-4" />

            <div className="container py-4">
                <Link className="btn btn-outline-secondary mb-4" to="/">
                    ← Quay lại
                </Link>
                <h1 className="text-uppercase text-success mb-3">KHÔNG GIAN BẾP HIỆN ĐẠI & TIỆN NGHI</h1>

                <div className="row g-4">
                    <div className="col-md-4 shadow">
                        <h4 className="text-success fw-light mb-4">
                            Bếp Chữ L Tối Ưu Không Gian Với Thiết Kế Gỗ Tự Nhiên
                        </h4>
                        <p className="fw-light" style={{ textAlign: "justify" }}>
                            Căn bếp sử dụng chất liệu gỗ sồi tự nhiên làm chủ đạo, kết hợp mặt đá trắng tạo sự sạch sẽ và sang trọng. Thiết kế chữ L giúp tận dụng tối đa không gian góc, mang lại sự tiện dụng trong thao tác nấu nướng. Hệ tủ bếp trên – dưới rộng rãi, bố trí ngăn nắp, đi kèm đèn LED chiếu sáng tạo cảm giác ấm cúng và hiện đại. Đây là mẫu bếp phù hợp với gia đình yêu thích phong cách tối giản mà vẫn đầy đủ tiện nghi.
                        </p>
                    </div>

                    <div className="col-md-8">
                        <img src="https://nhaxinh.com/wp-content/uploads/2024/11/phong-an-hien-dai-moretti-600x640.jpg" alt="" className="card-img-top shadow" style={{ height: "500px", borderRadius: "3px" }} />
                    </div>

                    <div className="col-md-6 shadow">
                        <img src="https://nhaxinh.com/wp-content/uploads/2024/01/phong-an-ngay-tet-1-768x551.jpg" alt="" className="card-img-top" style={{ height: "400px", borderRadius: "5px" }} />
                        <h4 className="text-success fw-light my-5">
                            Bếp Hiện Đại Với Tông Màu Trắng – Xám Sang Trọng
                        </h4>
                        <p className="fw-light" style={{ textAlign: "justify" }}>
                            Thiết kế bếp mở liên thông phòng khách, tạo nên sự kết nối không gian hiện đại. Tông màu trắng - xám kết hợp ánh sáng tự nhiên và đèn trần dạng thanh giúp không gian rộng thoáng, sang trọng. Đảo bếp lớn tích hợp bồn rửa và bếp nấu, vừa tiện nghi vừa thẩm mỹ.
                        </p>
                    </div>

                    <div className="col-md-6 shadow">
                        <img src="https://nhaxinh.com/wp-content/uploads/2023/06/phong-an-jazz-768x512.jpg" alt="" className="card-img-top" style={{ height: "400px", borderRadius: "5px" }} />
                        <h4 className="text-success fw-light my-5">
                            Bếp Nhỏ Gọn Dành Cho Căn Hộ Chung Cư
                        </h4>
                        <p className="fw-light" style={{ textAlign: "justify" }}>
                            Mẫu bếp được thiết kế tối giản, tận dụng diện tích nhỏ trong căn hộ chung cư. Hệ tủ kịch trần giúp tăng không gian lưu trữ. Mặt bếp sử dụng đá granite đen dễ vệ sinh. Thiết bị bếp được bố trí khoa học giúp tối ưu trải nghiệm người dùng.
                        </p>
                    </div>
                    <div className="col-md-12 shadow-sm">
                        <img style={{ height: "auto", borderRadius: "3px" }} src="https://nhaxinh.com/wp-content/uploads/2023/11/phong-an-coastal-vang.jpg" alt="hinh8" className="card-img-top shadow" />
                    </div>
                    <div className="col-md-4">
                        <img style={{ height: "500px", borderRadius: "3px" }} src="https://nhaxinh.com/wp-content/uploads/2023/10/phong-an-maxine-khong-gian.png" alt="" className="card-img-top" />
                    </div>
                    <div className="col-md-4">
                        <img style={{ height: "500px", borderRadius: "3px" }} src="https://nhaxinh.com/wp-content/uploads/2022/09/Phong-an-cabo-01.jpg" alt="" className="card-img-top" />
                    </div>
                    <div className="col-md-4">
                        <img style={{ height: "500px", borderRadius: "3px" }} src="https://nhaxinh.com/wp-content/uploads/2024/11/phong-an-hien-dai-moretti.jpg" alt="" className="card-img-top" />
                    </div>
                </div>
            </div>
        </div>
    );
}
