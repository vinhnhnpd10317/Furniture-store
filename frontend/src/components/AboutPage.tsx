import "../Css/About.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Banner */}
      <section className="banner-wrapper text-center py-5 fw-bold">
        <h1 className="display-4 mb-4">🛋️ Cửa Hàng PRIME SEVEN</h1>
        <img
          src="https://thietkemyb.com.vn/wp-content/uploads/2022/10/banner-noi-that.jpg"
          alt="Banner Discover"
          className="banner-img img-fluid rounded"
        />
      </section>

      {/* Giới thiệu */}
      <section className="intro-section">
        <div className="container">
          <p className="intro-text">
            Chào mừng bạn đến với PRIME SEVEN – nơi hội tụ của nghệ thuật thiết kế nội thất hiện đại. Chúng tôi cung cấp các sản phẩm nội thất cao cấp, tinh tế, và tiện nghi với sứ mệnh tạo nên không gian sống lý tưởng cho mỗi khách hàng.
          </p>
        </div>
      </section>

      {/* Phong cách */}
      <section className="style-section bg-light">
        <div className="container">
          <h2 className="section-title">🎨 Phong Cách Thiết Kế</h2>

          {[
            {
              title: 'Phong Cách Hiện Đại',
              description: 'Sự kết hợp giữa công năng và thẩm mỹ, tối giản đường nét nhưng vẫn đầy đủ tiện nghi.',
              image: 'https://housedesign.vn/wp-content/uploads/2019/12/noi-that-hien-dai.jpg',
              reverse: false,
            },
            {
              title: 'Phong Cách Scandinavian',
              description: 'Gam màu nhẹ nhàng, vật liệu tự nhiên, ánh sáng chan hòa – mang đến sự ấm áp và giản dị.',
              image: 'https://file.hstatic.net/1000400963/file/phong-cach-noi-that-scandinavian-1_115425c0727a4330833b1fa7bd1d5010.jpg',
              reverse: true,
            },
            {
              title: 'Phong Cách Tối Giản (Minimalism)',
              description: 'Loại bỏ chi tiết thừa, tập trung vào trải nghiệm không gian tinh gọn và hiện đại.',
              image: 'https://housedesign.vn/wp-content/uploads/2019/12/phong-cach-minimalism.jpg',
              reverse: false,
            },
          ].map((style, idx) => (
            <div className="row align-items-center mb-5" key={idx}>
              <div className={`col-md-6 ${style.reverse ? 'order-md-2' : ''}`}>
                <h4>{style.title}</h4>
                <p>{style.description}</p>
              </div>
              <div className={`col-md-6 ${style.reverse ? 'order-md-1' : ''} image-block`}>
                <img src={style.image} alt={style.title} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Thành viên nhóm */}
      <section className="team-section bg-light">
        <div className="container">
          <h2 className="section-title">👥 Các Gương Mặt Tiêu Biểu Của Cửa Hàng</h2>
          <div className="row g-4 justify-content-center">
            {[
              {
                name: 'Nguyễn Hữu Nhật Vinh',
                role: 'Tổng Quản Lý Cửa Hàng',
                desc: 'Điều hành toàn bộ hoạt động cửa hàng, quản lý tài chính, nhân sự và chiến lược phát triển.',
                img: 'https://github.com/Lightwar25/memberImg/blob/main/1.png?raw=true',
              },
              {
                name: 'Trương Quang Chiến',
                role: 'Quản lý bán hàng',
                desc: 'Quản lý đội ngũ bán hàng, tư vấn, chốt đơn và chăm sóc khách.',
                img: 'https://github.com/Lightwar25/memberImg/blob/main/7.png?raw=true',
              },
              {
                name: 'Trần Hải Hiếu',
                role: 'Quản lý kho & vận chuyển',
                desc: 'Sắp xếp hàng hóa, theo dõi tồn kho và điều phối giao hàng.',
                img: 'https://github.com/Lightwar25/memberImg/blob/main/6.png?raw=true',
              },
              {
                name: 'Nguyễn Hữu Thuật',
                role: 'Chuyên viên thiết kế',
                desc: 'Lên ý tưởng không gian, phối màu và chọn nội thất phù hợp.',
                img: 'https://github.com/Lightwar25/memberImg/blob/main/3.png?raw=true',
              },
              {
                name: 'Trương Văn Huy',
                role: 'Giám sát thi công',
                desc: 'Đảm bảo tiến độ, chất lượng và an toàn công trình lắp đặt.',
                img: 'https://github.com/Lightwar25/memberImg/blob/main/4.png?raw=true',
              },
              {
                name: 'Đỗ Tấn Phát',
                role: 'Chăm sóc khách hàng',
                desc: 'Giải đáp thắc mắc, hỗ trợ đổi trả, đảm bảo sự hài lòng.',
                img: 'https://github.com/Lightwar25/memberImg/blob/main/2.png?raw=true',
              },
              {
                name: 'Nguyễn Xuân Sơn',
                role: 'Marketing & truyền thông',
                desc: 'Quảng bá thương hiệu, quản lý mạng xã hội và chiến dịch tiếp thị.',
                img: 'https://github.com/Lightwar25/memberImg/blob/main/5.png?raw=true',
              },
            ].map((member, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="team-card shadow-sm p-4 rounded-4 bg-white text-center h-100">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="member-avatar mb-3"
                  />
                  <h5 className="fw-bold">{member.name}</h5>
                  <p className="text-muted fst-italic mb-1">{member.role}</p>
                  <p>{member.desc}</p>
                  <div className="social-icons mb-3">
                    <a href="#" className="me-3">
                      <i className="fab fa-facebook fa-lg"></i>
                    </a>
                    <a href="#">
                      <i className="fas fa-envelope fa-lg"></i>
                    </a>
                  </div>
                  <button className="btn btn-outline-secondary rounded-pill">Liên hệ</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bộ sưu tập */}
      <section className="gallery-section">
        <div className="container">
          <h2 className="section-title">🖼️ Bộ Sưu Tập Hình Ảnh</h2>
          <div className="row gallery gx-4 gy-4">
            {[
              'https://images.pexels.com/photos/13044790/pexels-photo-13044790.png',
              'https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg',
              'https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg',
              'https://images.pexels.com/photos/1099816/pexels-photo-1099816.jpeg',
              'https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg',
              'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg',
            ].map((img, idx) => (
              <div className="col-md-4 col-12" key={idx}>
                <img src={img} alt={`Interior ${idx + 1}`} className="gallery-img" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
