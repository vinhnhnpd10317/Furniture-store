import React from "react";
import { Link } from "react-router-dom";

export default function BedRoom() {
    return (
        <div className="container-fluid px-0">
            <img src="../public/img/img-room/img-bed-room/h10.avif" alt="" className="img-fluid w-100 mb-4" style={{ height: "700px" }} />
            <div className="container py-4">
                <Link className="btn btn-outline-secondary mb-4" to="/">
                    ← Quay lại
                </Link>
                <h1 className="text-uppercase text-success mb-3">Phòng Ngủ Hiện Đại – Không Gian Sống Đẳng Cấp</h1>

                {/* dự liệu tĩnh */}
                <div className="row g-4">
                    <div className="col-md-4 shadow mb-2">
                        <img src="../public/img/img-room/img-bed-room/h1.jpg" alt="" className="card-img-top" style={{ height: "300px", borderRadius: "3px" }} />
                        <h5 className="text-center text-uppercase fw-semibold text-success mt-3">Chốn Bình Yên Mang Hơi Thở Cổ Điển</h5>
                        <p className="text-success fw-light" style={{ textAlign: "justify" }}>Không gian phòng ngủ mang phong cách vintage châu Âu, với những gam màu trầm ấm và họa tiết hoa tinh tế, tạo cảm giác hoài niệm nhưng vẫn đầy ấm cúng. Từng chi tiết – từ bộ ga gối họa tiết cổ điển đến chiếc đèn ngủ ánh vàng dịu nhẹ – đều góp phần mang đến sự thư giãn tuyệt đối, giúp bạn đắm chìm vào giấc ngủ yên bình mỗi đêm.</p>
                    </div>

                    <div className="col-md-4 shadow mb-2">
                        <img src="../public/img/img-room/img-bed-room/h3.avif" alt="" className="card-img-top" style={{ height: "300px", borderRadius: "3px" }} />
                        <h5 className="text-center text-uppercase fw-semibold text-success mt-3">Không Gian Xanh – Chạm Vào Hơi Thở Rừng Sâu    </h5>
                        <p className="text-success fw-light" style={{ textAlign: "justify" }}>Lấy cảm hứng từ thiên nhiên rừng sâu, không gian phòng ngủ này mang đến cảm giác như đang được ẩn mình giữa khu rừng yên ả.

                            Bức tranh tường rừng cây kết hợp cùng đầu giường nhung xanh rêu tạo nên sự gần gũi nhưng vẫn sang trọng. Những chiếc gối họa tiết hoa và nội thất pastel tinh tế khiến căn phòng trở nên ấm áp, mềm mại nhưng không kém phần tinh tế.</p>
                    </div>

                    <div className="col-md-4 shadow mb-2">
                        <img src="../public/img/img-room/img-bed-room/h2.avif" alt="" className="card-img-top" style={{ height: "300px", borderRadius: "3px" }} />
                        <h5 className="text-center text-uppercase fw-semibold text-success mt-3">Phòng Ngủ Retro – Nơi Cất Giữ Ký Ức</h5>
                        <p className="text-success fw-light" style={{ textAlign: "justify" }}>Phòng ngủ mang phong cách retro hoài cổ, kết hợp tinh tế giữa nội thất gỗ truyền thống, giấy dán tường họa tiết cổ điển và ánh đèn vàng ấm áp.

                            Không gian này gợi lại hình ảnh những ngôi nhà thời xưa, nơi sự đơn giản nhưng chỉn chu tạo nên một vẻ đẹp mộc mạc và đầy cảm xúc.</p>
                    </div>

                    {/*  */}
                </div>
            </div>
        </div>
    )
}