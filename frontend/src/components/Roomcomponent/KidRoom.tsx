import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function KidRoom() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-fluid p-0">
      {/* Banner đầu trang */}
      <div
        style={{
          backgroundImage: "url('https://murphydoor.com/cdn/shop/articles/Small_Kids_Bedroom_Ideas.png?v=1742243790&width=1100')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
          textAlign: "center",
        }}
      >
        <div>
          <h1 className="display-5 fw-bold">Không Gian Sáng Tạo Dành Riêng Cho Bé</h1>
          <p className="lead">Khám phá những ý tưởng thiết kế phòng trẻ em đầy cảm hứng và an toàn</p>
        </div>
      </div>

      <div className="container py-5">
        {/* Giới thiệu mở đầu */}
        <p className="lead text-muted">
          Phòng ngủ trẻ em không chỉ là nơi để nghỉ ngơi, mà còn là không gian để bé phát triển trí tuệ, sáng tạo và thể hiện cá tính.
          Thiết kế một căn phòng hoàn hảo cho trẻ là sự kết hợp giữa màu sắc, ánh sáng, tiện nghi và an toàn – tất cả đều cần được
          cân nhắc kỹ lưỡng.
        </p>

        {/* Khu vực 1 */}
        <h2 className="mt-5 text-primary">1. Thiết kế phù hợp theo độ tuổi</h2>
        <div className="row align-items-center my-4">
          <div className="col-md-6">
            <img
              src="https://flexfit.vn/wp-content/uploads/2021/05/thiet-ke-phong-ngu-cho-be-gai-10.jpg"
              className="img-fluid rounded shadow"
              alt="Phòng cho bé gái"
            />
          </div>
          <div className="col-md-6">
            <p>
              Mỗi độ tuổi mang đến một nhu cầu khác nhau trong thiết kế nội thất. Trẻ nhỏ cần một không gian ấm áp, màu sắc nhẹ nhàng
              và vật liệu an toàn. Trong khi đó, các bé lớn hơn lại cần không gian cá nhân với những yếu tố phản ánh sở thích riêng.
            </p>
            <ul>
              <li>
                <strong>Chất liệu an toàn:</strong> tránh các góc nhọn, dùng gỗ tự nhiên hoặc nhựa cao cấp không độc hại.
              </li>
              <li>
                <strong>Màu sắc phù hợp:</strong> bé gái thích hồng, pastel; bé trai ưa xanh dương, vàng tươi.
              </li>
              <li>
                <strong>Đồ nội thất đúng kích cỡ:</strong> bàn ghế thấp vừa tầm bé, tủ đồ dễ mở giúp tăng tính tự lập.
              </li>
            </ul>
          </div>
        </div>

        {/* Khu vực 2 */}
        <h2 className="mt-5 text-primary">2. Tối ưu không gian & lưu trữ thông minh</h2>
        <div className="row align-items-center my-4 flex-md-row-reverse">
          <div className="col-md-6">
            <img
              src="https://noithatmanhhe.vn/wp-content/uploads/2023/09/giuong_tang_mau_xanh-3.webp"
              className="img-fluid rounded shadow"
              alt="Phòng ngủ sáng tạo"
            />
          </div>
          <div className="col-md-6">
            <p>
              Những căn phòng nhỏ vẫn có thể trở nên rộng rãi nếu biết tận dụng không gian. Các thiết kế giường tầng, tủ âm tường, hay
              hộc kéo dưới giường không chỉ tiết kiệm diện tích mà còn dạy trẻ cách sắp xếp đồ đạc khoa học.
            </p>
            <ul>
              <li>
                <strong>Giường tầng tích hợp:</strong> có thể kèm bàn học, tủ sách.
              </li>
              <li>
                <strong>Kệ nổi hoặc ngăn kéo âm:</strong> giúp lưu trữ đồ chơi, quần áo gọn gàng.
              </li>
              <li>
                <strong>Tận dụng chiều cao:</strong> tủ đồ cao chạm trần để mở rộng không gian sàn cho bé chơi đùa.
              </li>
            </ul>
          </div>
        </div>

        {/* Khu vực 3 */}
        <h2 className="mt-5 text-primary">3. Khơi gợi sự sáng tạo trong từng góc nhỏ</h2>
        <div className="row align-items-center my-4">
          <div className="col-md-6">
            <img
              src="https://noithatmyhouse.com/wp-content/uploads/2024/01/thiet-ke-phong-be-gai.jpg"
              className="img-fluid rounded shadow"
              alt="Không gian sáng tạo"
            />
          </div>
          <div className="col-md-6">
            <p>
              Phòng ngủ không chỉ để ngủ. Hãy tạo những không gian nhỏ để bé vẽ tranh, đọc truyện, hoặc tưởng tượng. Điều này giúp bé
              phát triển trí tưởng tượng và tạo nên những kỷ niệm tuổi thơ tuyệt vời.
            </p>
            <ul>
              <li>
                <strong>Khu đọc sách:</strong> ghế lười, đèn vàng, kệ truyện tranh.
              </li>
              <li>
                <strong>Bảng vẽ hoặc tường nam châm:</strong> cho bé thể hiện ý tưởng hàng ngày.
              </li>
              <li>
                <strong>Góc mơ mộng:</strong> màn che, đèn dây trang trí tạo thành "lâu đài" riêng của bé.
              </li>
            </ul>
          </div>
        </div>

        {/* Kết thúc */}
        <div className="text-center mt-5">
          <h3 className="text-success">Khám phá các mẫu nội thất dành riêng cho trẻ em</h3>
          <Link to="/products" className="btn btn-primary mt-3 px-4 py-2">
            Xem sản phẩm ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
