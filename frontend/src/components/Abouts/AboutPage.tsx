import "../Css/About.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <section className="banner-wrapper text-center py-5 fw-bold">
        <img
          src="https://github.com/Lightwar25/memberImg/blob/main/img-banner-detail.png?raw=true"
          alt="Banner Discover"
          className="img-fluid rounded"
          style={{
            width: '100%',
            maxWidth: 'none',
            display: 'block',
            margin: '0 auto',
          }}
        />
        <h1 className="display-4 mb-4 mt-5">🛋️ Cửa Hàng PRIME SEVEN</h1>

      </section>

     {/* Giới thiệu */}
<section className="intro-section py-5 bg-white">
  <div className="container">
    <p className="intro-text lead text-center fw-semibold">
      Chào mừng bạn đến với <strong>PRIME SEVEN</strong> – nơi hội tụ của nghệ thuật thiết kế nội thất hiện đại.
      Với tâm huyết và sự sáng tạo không ngừng nghỉ, chúng tôi tự hào mang đến những giải pháp thiết kế đột phá,
      giúp mỗi không gian sống không chỉ đẹp mắt mà còn phản ánh cá tính riêng của gia chủ.
    </p>
    <p className="text-center mt-3 text-muted">
      Từ căn hộ nhỏ xinh đến biệt thự sang trọng, PRIME SEVEN đồng hành cùng bạn kiến tạo nên một nơi chốn đáng mơ ước –
      nơi thẩm mỹ và công năng được dung hòa hoàn hảo.
    </p>
  </div>
  
      {/* Bộ sưu tập ảnh */}
      <section className="intro-gallery py-4">
        <div className="container">
          <div className="custom-grid-gallery">
            {[
              'https://github.com/Lightwar25/memberImg/blob/main/a1.jpg?raw=true',   
              'https://github.com/Lightwar25/memberImg/blob/main/a2.jpg?raw=trueg',
              'https://github.com/Lightwar25/memberImg/blob/main/a3.jpg?raw=true', 
              'https://github.com/Lightwar25/memberImg/blob/main/a4.jpg?raw=true',
              
            ].map((img, idx) => (
              <div className={`gallery-item item-${idx + 1}`} key={idx}>
                <div className="gallery-frame">
                  <img src={img} alt={`Ảnh ${idx + 1}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CSS nội bộ */}
      <style>{`
        .custom-grid-gallery {
          display: grid;
          grid-template-areas:
            "a b"
            "c d"
            "e f";
          gap: 20px;
        }

        .gallery-item {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .gallery-item:hover {
          transform: scale(1.03);
          z-index: 2;
        }

        .gallery-frame {
          border: 10px solid #fff;
          background: #f0f0f0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
overflow: hidden;
        }

        .gallery-frame img {
          width: 100%;
          height: auto;
          object-fit: cover;
          display: block;
        }

        .item-1 { grid-area: a; }
        .item-2 { grid-area: b; }
        .item-3 { grid-area: c; }
        .item-4 { grid-area: d; }
        .item-5 { grid-area: e; }
        .item-6 { grid-area: f; }

        @media (min-width: 768px) {
          .custom-grid-gallery {
            grid-template-areas:
              "a b"
              "c b"
              "c d"
              "e f";
            grid-template-columns: 1fr 1fr;
          }
        }
          `}</style>

</section>

{/* Phong cách thiết kế */}
<section className="style-section py-5 bg-light">
  <div className="container">
    <h2 className="section-title text-center mb-5">🎨 Các Phong Cách Thiết Kế Nổi Bật</h2>

    {[
      {
        title: "✨ Phong Cách Hiện Đại",
        description:
          "Là sự giao thoa tinh tế giữa hình khối rõ ràng, đường nét tối giản và tiện nghi vượt trội. Nội thất hiện đại tập trung vào công năng sử dụng, ánh sáng tự nhiên và các gam màu trung tính như trắng, xám, đen – mang lại cảm giác rộng rãi, thoáng đãng.",
        image:
          "https://github.com/Lightwar25/memberImg/blob/main/a5.jpg?raw=true",
        reverse: false,
      },
      {
        title: "🌿 Phong Cách Scandinavian",
        description:
          "Lấy cảm hứng từ thiên nhiên vùng Bắc Âu, phong cách Scandinavian sử dụng vật liệu gỗ mộc, vải lanh, len dệt kết hợp với ánh sáng tự nhiên để tạo nên không gian ấm áp, giản dị và đầy thi vị. Phù hợp với những ai yêu thích sự tối giản nhưng đầy chất thơ.",
        image:
          "https://github.com/Lightwar25/memberImg/blob/main/a6.jpg?raw=true",
        reverse: true,
      },
      {
        title: "🧘‍♀️ Phong Cách Tối Giản (Minimalism)",
        description:
          "“Less is more” – nguyên tắc cốt lõi của Minimalism. Mỗi chi tiết đều có lý do tồn tại, tránh rườm rà, tạo nên sự tĩnh lặng, tinh tế và cân bằng. Màu sắc thường là trắng, be hoặc đen kết hợp đồ nội thất mảnh, gọn để tối ưu không gian.",
        image:
          "https://github.com/Lightwar25/memberImg/blob/main/a7.jpg?raw=true",
        reverse: false,
      },
      {
        title: "🏛️ Phong Cách Tân Cổ Điển",
        description:
          "Là sự tái hiện của nét cổ điển sang trọng nhưng được tinh chỉnh lại phù hợp với nhịp sống hiện đại. Trần cao, phào chỉ tỉ mỉ, nội thất uốn cong kết hợp gam màu như vàng champagne, trắng ngọc – tất cả tạo nên vẻ đẹp vĩnh cửu.",
        image:
          "https://github.com/Lightwar25/memberImg/blob/main/a8.jpg?raw=true",
        reverse: true,
      },
      {
        title: "🏕️ Phong Cách Rustic – Mộc Mạc",
description:
          "Phong cách Rustic mang hơi thở thiên nhiên với chất liệu gỗ thô, đá tự nhiên, ánh sáng vàng ấm áp. Không gian Rustic mang lại cảm giác bình yên, gần gũi, đặc biệt phù hợp với các khu nghỉ dưỡng, homestay hoặc biệt thự vùng quê.",
        image:
          "https://github.com/Lightwar25/memberImg/blob/main/a9.jpg?raw=true",
        reverse: false,
      },
    ].map((style, idx) => (
      <div className="row align-items-center mb-5" key={idx}>
        <div className={`col-md-6 ${style.reverse ? "order-md-2" : ""}`}>
          <h4 className="fw-bold mb-3">{style.title}</h4>
          <p className="text-muted">{style.description}</p>
        </div>
        <div className={`col-md-6 ${style.reverse ? "order-md-1" : ""} image-block`}>
          <img
            src={style.image}
            alt={style.title}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: 300, objectFit: "cover", width: "100%" }}
          />
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
                img: 'https://github.com/Lightwar25/memberImg/blob/main/Screenshot%202025-08-12%20223050.png?raw=true',
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
              'https://github.com/Lightwar25/memberImg/blob/main/a10.jpg?raw=trueg',
              'https://github.com/Lightwar25/memberImg/blob/main/a11.jpeg?raw=true',
              'https://github.com/Lightwar25/memberImg/blob/main/a12.jpeg?raw=true',
              'https://github.com/Lightwar25/memberImg/blob/main/a13.jpeg?raw=true',
              'https://github.com/Lightwar25/memberImg/blob/main/a14.jpeg?raw=trueg',
              'https://github.com/Lightwar25/memberImg/blob/main/a15.jpeg?raw=true',
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