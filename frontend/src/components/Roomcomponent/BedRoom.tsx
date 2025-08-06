import React from "react";
import { Link } from "react-router-dom";

export default function BedRoom() {
    const imageStyle: React.CSSProperties = {
        objectFit: "cover",
        aspectRatio: "4/3",
        borderRadius: "5px"
    };

    return (
        <div className="container-fluid px-0">
            <img
                src="https://aeros.vn/upload/images/nha-pho/noi-that-phong-ngu-nha-pho-4.jpg"
                alt="phongngu-banner"
                className="img-fluid w-100 mb-4 shadow"
                style={{ objectFit: "cover", aspectRatio: "16/6" }}
            />
            <div className="container py-4">
                <Link className="btn btn-outline-secondary mb-4" to="/">
                    ← Quay lại
                </Link>
                <h1 className="text-uppercase text-success mb-3">Phòng Ngủ Hiện Đại – Không Gian Sống Đẳng Cấp</h1>

                <div className="row g-4">
                    <div className="col-md-4 shadow">
                        <img
                            src="../public/img/img-room/img-bed-room/h1.jpg"
                            alt="phongngu1"
                            className="img-fluid w-100"
                            style={imageStyle}
                        />
                        <h5 className="text-center text-uppercase fw-semibold text-success mt-3">Chốn Bình Yên Mang Hơi Thở Cổ Điển</h5>
                        <p className="text-success fw-light" style={{ textAlign: "justify" }}>
                            Không gian phòng ngủ mang phong cách vintage châu Âu, với những gam màu trầm ấm và họa tiết hoa tinh tế, tạo cảm giác hoài niệm nhưng vẫn đầy ấm cúng. Từng chi tiết – từ bộ ga gối họa tiết cổ điển đến chiếc đèn ngủ ánh vàng dịu nhẹ – đều góp phần mang đến sự thư giãn tuyệt đối, giúp bạn đắm chìm vào giấc ngủ yên bình mỗi đêm.
                        </p>
                    </div>

                    <div className="col-md-4 shadow">
                        <img
                            src="../public/img/img-room/img-bed-room/h3.avif"
                            alt="phongngu2"
                            className="img-fluid w-100"
                            style={imageStyle}
                        />
                        <h5 className="text-center text-uppercase fw-semibold text-success mt-3">Không Gian Xanh – Chạm Vào Hơi Thở Rừng Sâu</h5>
                        <p className="text-success fw-light" style={{ textAlign: "justify" }}>
                            Lấy cảm hứng từ thiên nhiên rừng sâu, không gian phòng ngủ này mang đến cảm giác như đang được ẩn mình giữa khu rừng yên ả. Bức tranh tường rừng cây kết hợp cùng đầu giường nhung xanh rêu tạo nên sự gần gũi nhưng vẫn sang trọng.
                        </p>
                    </div>

                    <div className="col-md-4 shadow">
                        <img
                            src="../public/img/img-room/img-bed-room/h2.avif"
                            alt="phongngu3"
                            className="img-fluid w-100"
                            style={imageStyle}
                        />
                        <h5 className="text-center text-uppercase fw-semibold text-success mt-3">Phòng Ngủ Retro – Nơi Cất Giữ Ký Ức</h5>
                        <p className="text-success fw-light" style={{ textAlign: "justify" }}>
                            Phòng ngủ mang phong cách retro hoài cổ, kết hợp tinh tế giữa nội thất gỗ truyền thống, giấy dán tường họa tiết cổ điển và ánh đèn vàng ấm áp. Không gian này gợi lại hình ảnh những ngôi nhà thời xưa, nơi sự đơn giản nhưng chỉn chu tạo nên một vẻ đẹp mộc mạc và đầy cảm xúc.
                        </p>
                    </div>

                    {/* Bổ sung thêm nội dung mới tương tự WorkRoom */}
                    <div className="col-md-6 shadow">
                        <img
                            src="../public/img/img-room/img-bed-room/h4.avif"
                            alt="phongngu4"
                            className="img-fluid w-100"
                            style={imageStyle}
                        />
                        <h5 className="text-success fw-semibold mt-3">Thiết Kế Tối Giản Cho Người Trẻ</h5>
                        <p className="text-success fw-light" style={{ textAlign: "justify" }}>
                            Căn phòng ngủ hiện đại, sử dụng gam màu trắng và xám kết hợp cùng ánh sáng tự nhiên tạo nên sự tươi mới. Phù hợp cho những người trẻ sống trong các căn hộ studio hoặc căn hộ nhỏ, không gian này vừa tiết kiệm diện tích vừa tối ưu sự tiện nghi.
                        </p>
                    </div>

                    <div className="col-md-6 shadow">
                        <img
                            src="../public/img/img-room/img-bed-room/h5.avif"
                            alt="phongngu5"
                            className="img-fluid w-100"
                            style={imageStyle}
                        />
                        <h5 className="text-success fw-semibold mt-3">Phòng Ngủ Mở – Hòa Quyện Với Thiên Nhiên</h5>
                        <p className="text-success fw-light" style={{ textAlign: "justify" }}>
                            Thiết kế mở với ban công rộng, cây xanh và ánh sáng tràn ngập giúp căn phòng như hòa vào thiên nhiên. Mỗi buổi sáng thức dậy, bạn sẽ cảm nhận được sự tươi mới và tràn đầy năng lượng từ không gian sống này.
                        </p>
                    </div>

                    <div className="col-md-12 shadow-sm">
                        <img
                            src="../public/img/img-room/img-bed-room/h6.avif"
                            alt="bo-suu-tap"
                            className="img-fluid w-100"
                            style={{ objectFit: "cover", aspectRatio: "21/9", borderRadius: "6px" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
