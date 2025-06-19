import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/Home.css";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  useEffect(() => {
    function createInspirationSlider(container: Element) {
      const dots = container.querySelectorAll(".dot");
      const groups = container.querySelectorAll(".inspiration-group");

      let currentIndex = 0;

      dots.forEach(dot => {
        dot.addEventListener("click", () => {
          const newIndex = parseInt(dot.getAttribute("data-index"));
          if (newIndex === currentIndex) return;

          const currentGroup = groups[currentIndex];
          const nextGroup = groups[newIndex];

          // Remove active from dots
          dots.forEach(d => d.classList.remove("active"));
          dot.classList.add("active");

          // Reset animation states
          groups.forEach(g => {
            g.classList.remove("active", "slide-out-left", "slide-in-right", "show-from-right");
          });

          // Animate current group out
          currentGroup.classList.add("slide-out-left");

          // Prepare next group
          nextGroup.classList.add("slide-in-right");

          setTimeout(() => {
            currentGroup.classList.remove("slide-out-left");
            nextGroup.classList.remove("slide-in-right");
            nextGroup.classList.add("active");
          }, 500);

          currentIndex = newIndex;
        });
      });
    }

    // Gọi hàm cho mỗi section
    document.querySelectorAll(".inspiration-section").forEach(section => {
      createInspirationSlider(section);
    });
  }, []);
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Clearance Sale - Premi Nine Seven</title>
      <link rel="stylesheet" href="style/home.css" />
      <div className="banner">
        <img
          src="https://nhaxinh.com/wp-content/uploads/2025/05/z6580490141577_8548ffc185be52ddf8e968ae8b7a90b4.jpg"
          alt="Clearance Sale - Ưu đãi lớn nhất"
        />
      </div>
      <div className="product-layout">
        <div className="left-large">
          <div className="product">
            <img
              src="https://nhaxinh.com/wp-content/uploads/2023/07/BST-COASTAL-SOFA-VANG-2.jpg"
              alt="Sofa"
            />
            <span className="label">SOFA</span>
          </div>
        </div>
        <div className="right-small">
          <div className="small-grid">
            <div className="product">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2023/04/nha-xinh-banner-ban-an-vuong-24423.jpg"
                alt="Bàn ăn"
              />
              <span className="label">BÀN ĂN</span>
            </div>
            <div className="product">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2022/01/giuong-ngu-pio-1.jpg"
                alt="Giường"
              />
              <span className="label">GIƯỜNG</span>
            </div>
            <div className="product">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2024/01/banner-armchair-nhaxinh-31-1-24.jpg"
                alt="Armchair"
              />
              <span className="label">ARMCHAIR</span>
            </div>
            <div className="product">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2021/11/nha-xinh-ghe-an-phong-an-749x800.jpg"
                alt="Ghế ăn"
              />
              <span className="label">GHẾ ĂN</span>
            </div>
          </div>
        </div>
      </div>
      <section className="layout">
        <div className="rows row1">
          <div className="left">
            <img
              src="https://nhaxinh.com/wp-content/uploads/2024/01/nha-xinh-banner-phong-khach-31-1-24.jpg"
              alt="Ảnh 1"
            />
          </div>
          <div className="containers">
            <div className="text-block">
              <div className="text-item">
                Không gian phòng khách
                <p style={{ fontSize: 15 }}>
                  Phòng khách là không gian chính của ngôi nhà, là nơi sum họp gia
                  đình
                </p>
              </div>
              <div className="text-item">
                Đồ trang trí
                <p style={{ fontSize: 15 }}>
                  Mang lại những nguồn cảm hứng và nét sinh động cho không gian
                </p>
              </div>
            </div>
            <div className="image-block">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2024/01/nha-xinh-do-trang-tri-banner-31-1-24.jpg"
                alt="Ảnh 2"
              />
            </div>
          </div>
        </div>
        {/* Hàng 2 */}
        <div className="rows row2">
          <div className="left horizontal">
            <img
              src="https://nhaxinh.com/wp-content/uploads/2023/05/mau-phong-ngu-16-5-23.jpg"
              alt="Ảnh 3"
            />
            <div className="text-side">
              Không gian phòng ngủ
              <p style={{ fontSize: 15 }}>
                Những mẫu phòng ngủ của Premi Seven mang đến cảm giác ấm cúng, gần
                gũi và thoải mái
              </p>
            </div>
          </div>
          <div className="right vertical">
            <img
              src="https://nhaxinh.com/wp-content/uploads/2022/09/banner-phong-an-nha-xinh-12-9-22.jpg"
              alt="Ảnh 4"
            />
            <div className="text-below">
              Không gian phòng ăn
              <p style={{ fontSize: 15 }}>
                Một bữa ăn ngon luôn là mong ước của mỗi gia đình. Không gian phòng
                ăn đóng vai trò rất quan trọng trong văn hóa Việt
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* PHẦN GIỚI THIỆU */}
      <div className="intro-container">
        <div className="intro-left">
          <h2>NỘI THẤT KINH TẾ</h2>
          <p>
            Với kinh nghiệm hơn 25 năm trong hoàn thiện nội thất, Premi Seven mang
            đến giải pháp toàn diện trong bao gồm thiết kế, trang trí và cung cấp
            nội thất trọn gói. Sở hữu đội ngũ chuyên nghiệp và hệ thống 8 cửa hàng,
            Premi Seven là lựa chọn cho không gian tinh tế và hiện đại.
          </p>
          <a href="#" className="btn-green">
            Xem thêm
          </a>
        </div>
        <div className="intro-right">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2023/05/nha-xinh-thiet-ke-noi-that-ecopark-16523-1200x800.jpg"
            alt="Ảnh giới thiệu"
          />
        </div>
      </div>
      {/* PHẦN SẢN PHẨM MỚI */}
      <div className="product-container">
        <div className="product-header">
          <h3>SẢN PHẨM MỚI</h3>
          <a href="#">xem tất cả &gt;</a>
        </div>
        <div className="product-list">
          <div className="product-card">
            <img
              src="https://nhaxinh.com/wp-content/uploads/2024/08/ban-nuoc-orientale-walnut-300x200.jpg"
              alt="Sản phẩm 1"
            />
            <div className="product-name">Bàn nước Orientale walnut</div>
            <div className="price">49,000,000đ</div>
            <div className="hover-actions">
              <button>THÊM VÀO GIỎ</button>
              <button className="black">XEM THÊM</button>
            </div>
          </div>
          <div className="product-card">
            <img
              src="https://nhaxinh.com/wp-content/uploads/2025/05/300000000000117909_ARMCHAIR-SF044VF.I-VAI-SO-405-300x200.webp"
              alt="Sản phẩm 1"
            />
            <div className="product-name">Armchair Dark 405-1</div>
            <div className="price">17,900,000đ</div>
            <div className="hover-actions">
              <button>THÊM VÀO GIỎ</button>
              <button className="black">XEM THÊM</button>
            </div>
          </div>
          <div className="product-card">
            <img
              src="https://nhaxinh.com/wp-content/uploads/2024/07/sofa-2-cho-may-moi-mau-xanh-300x200.jpg"
              alt="Sản phẩm 1"
            />
            <div className="product-name">Sofa 2 chỗ Mây mới</div>
            <div className="price">21,900,000đ</div>
            <div className="hover-actions">
              <button>THÊM VÀO GIỎ</button>
              <button className="black">XEM THÊM</button>
            </div>
          </div>
          <div className="product-card">
            <img
              src="https://nhaxinh.com/wp-content/uploads/2024/07/armchair-may-moi-mau-xanh-300x200.jpg"
              alt="Sản phẩm 1"
            />
            <div className="product-name">Armchair Mây mới</div>
            <div className="price">14,500,000đ</div>
            <div className="hover-actions">
              <button>THÊM VÀO GIỎ</button>
              <button className="black">XEM THÊM</button>
            </div>
          </div>
        </div>
      </div>
      {/* Slider 1 */}
      <section className="inspiration-section" id="inspiration-slider-1">
        <h2 className="section-title">Góc cảm hứng </h2>
        <div className="inspiration-slider">
          <div className="inspiration-group active">
            <div className="inspiration-item">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2025/05/khong-giang-1200x800.webp"
                alt="Ảnh 1"
              />
              <h3>Tô màu cuộc sống của bạn</h3>
              <p>
                Hãy chào đón phong cách sống động với những chiếc bình đầy màu sắc
                bắt mắt! Trung bày chúng cũng.
              </p>
            </div>
            <div className="inspiration-item">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2025/04/goc-cam-hung-4-1200x800.webp"
                alt="Ảnh 2"
              />
              <h3>Chiêm ngưỡng các dòng sản phẩm cho mùa mới tại Premi Seven</h3>
              <p>
                Lấy cảm hứng từ thành phố Valencia, miền Đông Nam Tây Ban Nha, nơi
                nổi tiếng với sự giao thoa.
              </p>
            </div>
          </div>
          <div className="inspiration-group">
            <div className="inspiration-item">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2025/03/Sofa-da-Jazz.jpg"
                alt="Ảnh 3"
              />
              <h3>Top 5 Sofa Da Tại Nhà Xinh Cho Mọi Không Gian Hiện Đại</h3>
              <p>
                Sofa da luôn là lựa chọn hàng đầu cho phòng khách bởi sự sang trọng,
                đẳng cấp và độ bền vượt trội. Trong năm 2025, xu hướng sofa da hướng
                đến các tiêu chí.
              </p>
            </div>
            <div className="inspiration-item">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2025/02/NHA-XINH-TRAO-GUI-HUONG-THOM-15-1-1200x800.jpg"
                alt="Ảnh 4"
              />
              <h3>
                Gợi Ý Quà Tặng 8/3 – Trao Hương Thơm, Tôn Vinh Phái Đẹp Cùng Nhà
                Xinh
              </h3>
              <p>
                Ngày Quốc tế Phụ nữ 8/3 là dịp đặc biệt để tôn vinh vẻ đẹp và những
                đóng góp quan trọng của phái đẹp. Hãy cùng Nhà Xinh gửi trao những
                món quà ý nghĩa, thay lời tri ân đến những người phụ nữ quan trọng
                trong cuộc đời bạn.
              </p>
            </div>
          </div>
          <div className="inspiration-group">
            <div className="inspiration-item">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2024/10/phong-khach-thu-gian-hung-king-1-1110x800.jpg"
                alt="Ảnh 5"
              />
              <h3>Ghế sofa cho không gian nhỏ</h3>
              <p>
                Ghế sofa là thực sự cần thiết cho không gian phòng khách. Để lựa
                chọn được một chiếc sofa phù hợp, cần phải có nhiều tiêu chí đánh
                giá.
              </p>
            </div>
            <div className="inspiration-item">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2025/02/goi-y-qua-tang-14-2-1200x800.jpg"
                alt="Ảnh 6"
              />
              <h3>GỢI Ý QUÀ TẶNG CHO NGÀY LỄ TÌNH NHÂN 14/02</h3>
              <p>
                Trong không khí dễ chịu của những ngày xuân, hãy cùng chọn lựa món
                quà mang đủ sắc – hương tại Nhà Xinh dành đến cho người thương vào
                ngày lễ 14/02.
              </p>
            </div>
          </div>
        </div>
        <div className="inspiration-dots">
          <span className="dot active" data-index={0} />
          <span className="dot" data-index={1} />
          <span className="dot" data-index={2} />
        </div>
      </section>
      <section className="layout-image-left-text-right">
        <div className="image-left">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2022/07/gioi-thieu-nha-xinh-moi-25-7-22-1200x800.jpg"
            alt="Không gian sống tinh tế"
          />
        </div>
        <div className="text-right">
          <h2>Tổ ấm của người tinh tế</h2>
          <p>
            Trong suốt hơn 25 năm qua, cảm hứng từ gu thẩm mỹ tinh tế và tinh thần
            “Việt” đã giúp Premi Seven tạo ra những thiết kế độc đáo, hợp thời và
            chất lượng. Premi Seven hiện đã mở 8 cửa hàng tại Việt Nam.
          </p>
          <a href="#" className="btn-green">
            VỀ PRIME SEVEN
          </a>
        </div>
      </section>
      <section className="inspiration-section" id="inspiration-slider-2">
        <h2 className="section-title">Chuyện Prime Seven</h2>
        <div className="inspiration-slider">
          <div className="inspiration-group active">
            <div className="inspiration-item">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2025/04/0423-1400x788.png"
                alt="Ảnh 7"
              />
              <h3>KHÁM PHÁ NHÀ MÁY SẢN XUẤT CÁC SẢN PHẨM VIỆT CỦA PREMI SEVEN</h3>
              <p>
                Hãy cùng Premi Seven khám phá xưởng sản xuất nhà máy AA Tây Ninh,
                nơi ra đời phần lớn các sản phẩm đậm chất Việt tại Prime Seven.
              </p>
            </div>
            <div className="inspiration-item">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2025/04/khong-gian-nha-xinh-pmh-8-1200x800.jpg"
                alt="Ảnh 8"
              />
              <h3>
                Chạm – Cảm – Trải Nghiệm Không Gian Mới Tại Premi Seven Phú Mỹ Hưng
              </h3>
              <p>
                Trong không gian mới của Premi Seven Phú Mỹ Hưng, mỗi góc nhỏ đều kể
                một câu chuyện riêng về phong cách sống, từ đương đại đến hiện đại,
                từ tối giản đến tinh tế đầy nghệ thuật.
              </p>
            </div>
          </div>
          <div className="inspiration-group">
            <div className="inspiration-item">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2025/04/dien-mao-moi-nha-xinh-phu-my-hung-h4-1200x800.jpg"
                alt="Ảnh 9"
              />
              <h3>Khai Trương Diện Mạo Mới Cửa Hàng Premi Seven Phú Mỹ Hưng</h3>
              <p>
                Nội Thất Premi Seven, thương hiệu thuộc AKA Furniture, một cái tên
                quen thuộc trong làng nội thất Việt đã tiếp tục “thay áo mới”.
              </p>
            </div>
            <div className="inspiration-item">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2025/03/khong-gian-nha-xinh-diamond-9-1-1200x800.jpg"
                alt="Ảnh 10"
              />
              <h3>Hòa Mình Giữa Không Gian Mới Của Premi Seven Diamond Plaza</h3>
              <p>
                Không gian mới Premi Seven Diamond Plaza khoác lên mình sự sang
                trọng, tinh tế với tông nền pastel nhã nhặn, nhấn cùng gam màu vàng
                đồng và silver một cách sống động.{" "}
              </p>
            </div>
          </div>
          <div className="inspiration-group">
            <div className="inspiration-item">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2025/02/Nha-Xinh-Bo-tu-bao-thu-11-1201x800.jpg"
                alt="Ảnh 11"
              />
              <h3>
                Bật Mí Căn Nhà Đặc Biệt Của Bộ Tứ Báo Thủ I Nội Thất 100% Sang Xịn
                Mịn Từ Premi Seven
              </h3>
              <p>
                Ánh nắng vàng dịu dàng len lỏi qua khung cửa sổ, chạm vào từng món
                đồ nội thất tinh xảo trong không gian tổ ấm của cặp đôi Quỳnh Anh
                (Tiểu Vy) và Quốc Anh (Quốc Anh).
              </p>
            </div>
            <div className="inspiration-item">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2025/01/Workshop-Cham-Tet-Nha-Xinh-3-1-533x800.jpg"
                alt="Ảnh 12"
              />
              <h3>
                Một mùa Tết đã đến gần với những khoảnh khắc đáng nhớ trong Workshop
                cắm hoa “Chạm” tại Premi Seven.
              </h3>
              <p>
                Premi Seven hân hạnh được Nhà thiết kế Lý Quí Khánh, Nhà thiết kế
                nội thất Cheng Bảo Phương, và nhãn hàng D.Mia Flower đồng hành cùng
                với Nữ ca sĩ Văn Mai Hương.
              </p>
            </div>
          </div>
          <div className="inspiration-group">
            <div className="inspiration-item">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2024/11/nha-xinh-khai-truong-dien-mao-moi-tai-thao-dien-1200x800.jpg"
                alt="Ảnh 11"
              />
              <h3>Premi Seven khai trương diện mạo mới tại Thảo Điền</h3>
              <p>
                Premi Seven Thảo Điền đã khoác lên mình một diện mạo hoàn toàn mới,
                đánh dấu bước chuyển mình đầy cảm hứng của thương hiệu trong hành
                trình nâng tầm không gian sống Việt.
              </p>
            </div>
            <div className="inspiration-item">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2021/11/thecollection5.jpg"
                alt="Ảnh 12"
              />
              <h3>Premi Seven thay đổi qua các giai đoạn</h3>
              <p>
                Cảm xúc của khách hàng, gợi mở sự tinh tế và phong cách sống mới.
                Đối với mỗi thương hiệu, logo luôn đóng một vai trò quan trọng trong
                việc tạo ấn tượng và gợi nhắc cho khách hàng về thương hiệu.
              </p>
            </div>
          </div>
        </div>
        <div className="inspiration-dots">
          <span className="dot active" data-index={0} />
          <span className="dot" data-index={1} />
          <span className="dot" data-index={2} />
          <span className="dot" data-index={3} />
        </div>
      </section>
    </>
  );
}

export default App;
