import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavoritesLatest, type FavoriteItem } from "../../api/FavoriteApi";

export default function BathRoom() {
    const [fvrpro, setFvrPro] = useState<FavoriteItem[]>([]);

    useEffect(() => {
        // Khi component mount thì cuộn lên đầu trang
        window.scrollTo({ top: 0, behavior: "instant" });

        getFavoritesLatest()
            .then(setFvrPro)
            .catch((error) =>
                console.error("Lỗi khi load 4 sản phẩm yêu thích nhất", error)
            );
    }, []);

    return (
        <div className="container-fluid px-0">
            <img
                src="/img/img-room/img-bathroom/h11.avif"
                alt=""
                className="img-fluid w-100 mb-4"
            />

            {/* nội dung giữa */}
            <div className="container py-4">
                <Link className="btn btn-outline-secondary mb-4" to="/">
                    ← Quay lại
                </Link>
                <h1 className="text-uppercase text-success mb-3">
                    "PHÒNG TẮM" THƯ GIÃN TIỆN NGHI
                </h1>

                {/* nội dung tĩnh */}
                <div className="row g-4">
                    <div className="col-md-4 shadow">
                        <h4 className="text-success fw-light mb-4">
                            Phòng Tắm Cổ Điển Sang Trọng Với Thiết Kế Ánh Sáng Tự Nhiên
                        </h4>
                        <p
                            className="fw-light"
                            style={{ textAlign: "justify" }}
                        >
                            Phòng tắm được thiết kế tinh tế với sự hòa quyện giữa
                            nét cổ điển và hiện đại. Điểm nhấn là bồn tắm chân
                            sư tử đặt cạnh cửa sổ vòm lớn, giúp không gian luôn
                            tràn ngập ánh sáng tự nhiên. Khu vực tắm kính thiết
                            kế góc cạnh hiện đại, rộng rãi và tiện nghi. Trần
                            vòm mềm mại kết hợp đèn chùm pha lê tạo cảm giác
                            sang trọng và ấm cúng.
                            <br />
                            <br />
                            Toàn bộ tường được ốp đá tự nhiên, nhấn bằng đường
                            viền gạch trang trí tinh xảo. Bên cạnh là bộ đôi
                            lavabo đá marble với không gian rộng rãi, tiện dụng
                            cho sinh hoạt gia đình. Tông màu vàng nhạt – be –
                            trắng góp phần tạo nên vẻ đẹp trang nhã, nhẹ nhàng
                            mà không kém phần đẳng cấp. Đây là mẫu phòng tắm lý
                            tưởng cho những ai yêu thích sự thanh lịch và tiện
                            nghi trong từng chi tiết.
                        </p>
                    </div>

                    <div className="col-md-8">
                        <img
                            src="/img/img-room/img-bathroom/h2.jpeg"
                            alt=""
                            className="card-img-top shadow"
                            style={{
                                height: "500px",
                                borderRadius: "3px",
                            }}
                        />
                    </div>

                    <div className="col-md-6 shadow">
                        <img
                            src="/img/img-room/img-bathroom/h5.jpg"
                            alt=""
                            className="card-img-top"
                            style={{
                                height: "400px",
                                borderRadius: "5px",
                            }}
                        />
                        <h4 className="text-success fw-light my-5">
                            Phòng Tắm Hiện Đại Với Tông Xanh Lục Bảo Đầy Cá Tính
                        </h4>
                        <p
                            className="fw-light"
                            style={{ textAlign: "justify" }}
                        >
                            Không gian phòng tắm hiện đại gây ấn tượng với tông
                            màu xanh lục bảo kết hợp các chi tiết viền vàng ánh
                            kim sang trọng. Gạch ốp tường xếp chéo tạo điểm nhấn
                            cá tính, kết hợp với khu tắm đứng kính trong suốt
                            đầy tinh tế.
                            <br />
                            <br />
                            Bộ tủ lavabo treo tường màu đen nhám cùng chậu rửa
                            sứ trắng tạo nên sự tương phản nổi bật. Gương tròn
                            viền kim loại độc đáo và đèn trang trí thanh mảnh
                            mang lại nét nghệ thuật tinh tế cho tổng thể.
                            <br />
                            <br />
                            Sự phối hợp giữa các chất liệu hiện đại như gỗ, kim
                            loại, gạch men bóng và ánh sáng tự nhiên tạo nên
                            một không gian phòng tắm sang trọng, thanh lịch và
                            đầy cá tính.
                        </p>
                    </div>

                    <div className="col-md-6 shadow">
                        <img
                            src="/img/img-room/img-bathroom/h1.jpg"
                            alt=""
                            className="card-img-top"
                            style={{
                                height: "400px",
                                borderRadius: "5px",
                            }}
                        />
                        <h4 className="text-success fw-light my-5">
                            Phòng Tắm Tối Giản Với Tông Xanh Pastel Nhẹ và Tinh
                            Tế
                        </h4>
                        <p
                            className="fw-light"
                            style={{ textAlign: "justify" }}
                        >
                            Phòng tắm mang phong cách tối giản hiện đại với tông
                            màu xanh pastel dịu nhẹ, mang lại cảm giác thư giãn
                            và dễ chịu. Trung tâm là chiếc bồn tắm độc lập trắng
                            tinh khôi, nổi bật giữa không gian ốp gạch vuông
                            thanh lịch.
                            <br />
                            <br />
                            Các chi tiết kim loại mạ vàng đồng ánh kim như vòi
                            nước, tay cầm, và gương khung mảnh tạo điểm nhấn
                            sang trọng nhưng không phô trương. Tủ gỗ sồi tự
                            nhiên cùng mặt bàn đá trắng càng tôn thêm vẻ hài
                            hòa và ấm cúng.
                        </p>
                    </div>

                    <h3 className="text-uppercase text-success text-center fw-light">
                        những sản phẩm được yêu thích gần đây
                    </h3>

                    {/* load 4 sản phẩm được yêu thích gần đây */}
                    <div className="row shadow mt-4">
                        {fvrpro.map((farvoritePro) => (
                            <div
                                className="col-md-3"
                                key={farvoritePro.id}
                            >
                                <div className="card shadow">
                                    <img
                                        src={`/img/imgproduct/${farvoritePro.hinh_anh_dai_dien}`}
                                        className="card-img-top"
                                        style={{
                                            height: "250px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-success text-center fw-light">
                                            {farvoritePro.ten_san_pham}
                                        </h5>
                                        <p className="text-center text-danger fw-semibold">
                                            {farvoritePro.gia.toLocaleString(
                                                "vi-VN"
                                            )}{" "}
                                            ₫
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 1 hình to 3 hình nhỏ */}
                    <div className="col-md-8">
                        <img
                            src="/img/img-room/img-bathroom/h3.png"
                            alt=""
                            className="card-img-top shadow"
                            style={{
                                borderRadius: "3px",
                                height: "900px",
                            }}
                        />
                    </div>
                    <div className="col-md-4 d-flex flex-column justify-content-between">
                        <img
                            src="/img/img-room/img-bathroom/h5.jpg"
                            alt=""
                            className="card-img-top shadow"
                            style={{
                                borderRadius: "3px",
                                height: "280px",
                            }}
                        />
                        <img
                            src="/img/img-room/img-bathroom/h12.avif"
                            alt=""
                            className="card-img-top shadow"
                            style={{
                                borderRadius: "3px",
                                height: "280px",
                            }}
                        />
                        <img
                            src="/img/img-room/img-bathroom/h13.avif"
                            alt=""
                            className="card-img-top shadow"
                            style={{
                                borderRadius: "3px",
                                height: "280px",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
