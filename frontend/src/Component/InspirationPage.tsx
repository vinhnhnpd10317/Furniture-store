import React from "react";

const cards = [
  {
    img: "https://nhaxinh.com/wp-content/uploads/2025/05/khong-giang-768x512.webp",
    title: "Tô màu cuộc sống của bạn",
    description:
      "Hãy chào đón phong cách sống động với những chi tiết đầy màu sắc bắt [...]",
  },
  {
    img: "https://nhaxinh.com/wp-content/uploads/2025/04/goc-cam-hung-4-768x512.webp",
    title: "CHIÊM NGƯỠNG CÁC DÒNG SẢN PHẨM CHO MÙA MỚI TẠI NHÀ XINH",
    description:
      "Lấy cảm hứng từ thành phố Valencia, miền Đông Nam Tây Ban Nha, nơi nổi [...]",
  },
  {
    img: "https://nhaxinh.com/wp-content/uploads/2025/03/Sofa-da-Jazz-768x511.jpg",
    title: "Top 5 Sofa Da Tại Nhà Xinh Cho Mọi Không Gian Hiện Đại",
    description:
      "Sofa da luôn là lựa chọn hàng đầu cho phòng khách bởi sự sang trọng [...]",
  },
  {
    img: "https://nhaxinh.com/wp-content/uploads/2025/02/NHA-XINH-TRAO-GUI-HUONG-THOM-15-1-768x512.jpg",
    title: "GỢI Ý QUÀ TẶNG 8/3 – TRAO HƯƠNG THƠM, TÔN VINH PHÁI ĐẸP CÙNG NHÀ XINH",
    description:
      "Ngày Quốc tế Phụ nữ 8/3 là dịp đặc biệt để tôn vinh vẻ đẹp [...]",
  },
  {
    img: "https://nhaxinh.com/wp-content/uploads/2024/10/phong-khach-thu-gian-hung-king-1-768x553.jpg",
    title: "Ghế sofa cho không gian nhỏ",
    description:
      "Ghế sofa là thực sự cần thiết cho không gian phòng khách. Để lựa chọn [...]",
  },
  {
    img: "https://nhaxinh.com/wp-content/uploads/2025/02/goi-y-qua-tang-14-2-768x512.jpg",
    title: "GỢI Ý QUÀ TẶNG CHO NGÀY LỄ TÌNH NHÂN 14/02",
    description:
      "Trong không khí lễ hội của những ngày xuân, hãy cùng chọn lựa món quà [...]",
  },
];

const InspirationPage = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Góc Cảm Hứng Nhà Xinh</h1>

      

      <div className="row g-4">
        {cards.map(({ img, title, description }, index) => (
          <div className="col-md-6" key={index}>
            <div className="card h-100 shadow-sm">
              <img src={img} className="card-img-top" alt={title} />
              <div className="card-body">
                <h5 className="card-title text-uppercase">{title}</h5>
                <p className="card-text">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
      <div className="mb-3">
        <button className="btn btn-success">XEM TẤT CẢ</button>
      </div>
    </div>
  );
};

export default InspirationPage;
