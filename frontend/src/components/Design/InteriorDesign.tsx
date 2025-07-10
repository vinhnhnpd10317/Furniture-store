import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

const InteriorDesign = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs
      .sendForm("service_vuazo77", "template_kiycbff", form.current, "N_VEUE_HoD6g4vHJM")
      .then(() => {
        setIsSent(true);
        form.current?.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
      });
  };

  return (
    <div className="container py-5">
      {/* Banner chính */}
      <div className="text-center mb-5">
        <h1 className="mt-4 text-uppercase text-primary">Thiết kế nội thất</h1>
        <p className="lead">
          Hẹn gặp ngay đội ngũ chuyên nghiệp và giàu kinh nghiệm từ Nhà Xinh để
          được tư vấn những giải pháp hoàn thiện nội thất cho ngôi nhà của bạn.
        </p>
        <Link to="/contact" className="btn btn-success btn-lg mt-3">
          Liên hệ ngay: 0906904114
        </Link>
        <img
          src="https://nhaxinh.com/wp-content/uploads/2023/05/du-an-thiet-ke-biet-thu-dao-ecopark-1jpg-1536x1024.jpg"
          alt="Thiết kế nội thất"
          className="img-fluid rounded shadow"
          style={{ maxHeight: "520px", objectFit: "cover", width: "100%" }}
        />
      </div>

      {/* Dự án tiêu biểu */}
      <div className="mb-5">
        <h2 className="text-uppercase mb-4 text-center">Các dự án thực hiện</h2>
        <div className="row g-4">
          {[
            {
              img: "https://nhaxinh.com/wp-content/uploads/2024/02/noi-that-phong-khach-sang-trong-1-1241x800.jpg",
              title: "Căn hộ triệu đô với nội thất sang trọng",
              text: "Nội thất bọc da mang tới màu sắc trầm ấm và sang trọng cho không gian sống.",
            },
            {
              img: "https://nhaxinh.com/wp-content/uploads/2023/05/Thiet-ke-biet-thu-Nine-South-5-768x512.jpg",
              title: "Căn hộ triệu đô với nội thất sang trọng",
              text: "Nội thất bọc da mang tới màu sắc trầm ấm và sang trọng cho không gian sống.",
            },
            {
              img: "https://nhaxinh.com/wp-content/uploads/2023/05/Thiet-ke-can-ho-The-Cove-Empire-4PN.jpg",
              title: "Căn hộ triệu đô với nội thất sang trọng",
              text: "Nội thất bọc da mang tới màu sắc trầm ấm và sang trọng cho không gian sống.",
            },
            {
              img: "https://nhaxinh.com/wp-content/uploads/2023/06/thiet-ke-can-ho-the-collection-1-768x513.jpg",
              title: "Thiết kế căn hộ The Collection",
              text: "Dự án The Collection kết hợp màu sắc hiện đại với tầm nhìn xanh mát.",
            },
          ].map((item, index) => (
            <div key={index} className="col-md-6">
              <div className="card shadow-sm border-0 h-100">
                <img src={item.img} className="card-img-top" alt={item.title} />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{item.title}</h5>
                  <p className="card-text">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form đăng ký tư vấn */}
      <div className="bg-light p-4 rounded shadow mb-5">
        <h3 className="text-center fw-bold mb-3">ĐĂNG KÝ TƯ VẤN TẠI NHÀ</h3>
        <p className="text-center text-muted mb-4">
          Hẹn gặp ngay tư vấn thiết kế nội thất tại nhà bằng cách để lại thông tin tại form dưới đây
        </p>

        <form ref={form} onSubmit={sendEmail} className="mx-auto" style={{ maxWidth: "600px" }}>
          <div className="mb-3">
            <input
              type="text"
              name="user_name"
              className="form-control"
              placeholder="Tên của bạn (Yêu cầu)"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="user_phone"
              className="form-control"
              placeholder="Điện thoại (Yêu cầu)"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="user_email"
              className="form-control"
              placeholder="Email của bạn"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="user_address"
              className="form-control"
              placeholder="Địa chỉ"
            />
          </div>
          <div className="mb-3">
            <textarea
              name="message"
              className="form-control"
              rows={4}
              placeholder="Yêu cầu của bạn (Yêu cầu)"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-dark w-100">Gửi yêu cầu</button>
          {isSent && (
            <p className="text-success text-center mt-3">
              Yêu cầu của bạn đã được gửi thành công!
            </p>
          )}
        </form>
      </div>
      {/* Bộ sưu tập ảnh nội thất */}
<div className="mb-5">
  <h2 className="text-uppercase mb-4 text-center">Bộ sưu tập không gian sống</h2>
  <div className="row g-3">
    <div className="col-lg-6">
      <img
        src="https://nhaxinh.com/wp-content/uploads/2021/11/nha-xinh-phong-khach-1.jpg"
        alt="Phòng khách hiện đại"
        className="img-fluid rounded shadow-sm w-100"
        style={{ objectFit: "cover", height: "100%" }}
      />
    </div>
    <div className="col-lg-6">
      <div className="row g-3">
        <div className="col-6">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2021/11/533332_10002.jpg"
            alt="Góc thư giãn"
            className="img-fluid rounded shadow-sm w-100"
          />
        </div>
        <div className="col-6">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2021/11/thecollection5.jpg"
            alt="Phòng ăn sang trọng"
            className="img-fluid rounded shadow-sm w-100"
          />
        </div>
        <div className="col-6">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2021/11/nha-xinh-phong-ngu-3.jpg"
            alt="Phòng ngủ tối giản"
            className="img-fluid rounded shadow-sm w-100"
          />
        </div>
        <div className="col-6">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2023/05/thiet-ke-noi-that-nha-xinh-bep-16523.jpg"
            alt="Không gian làm việc"
            className="img-fluid rounded shadow-sm w-100"
          />
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default InteriorDesign;
