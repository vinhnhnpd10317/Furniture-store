import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, type Article } from "../../api/ArticleApi";

const InspirationDetail2: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const data = await getArticleById(Number(id));
          setArticle(data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!article) return <div className="container py-5">Loading...</div>;

  return (
    <div className="container-fluid px-0">
      <div className="container py-4">
        <Link to="/inspiration" className="btn btn-outline-secondary mb-4">
          ← Quay lại
        </Link>

        <h1 className="text-uppercase text-success mb-3">{article.tieu_de}</h1>

        <p className="text-muted mb-4">
          Ngày đăng: {new Date(article.ngay_dang).toLocaleDateString()}
        </p>

        <img
          src={`/img/imgproduct/${article.hinh_anh}`}
          alt={article.tieu_de}
          className="img-fluid w-100 mb-4"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />

        <div className="lead" style={{ whiteSpace: "pre-line" }}>
          {article.noi_dung}
        </div>
      </div>

      <section className="container my-5">
        <div className="row g-4 align-items-center">
          {/* ảnh trái */}
          <div className="col-12 col-md-4">
            <img
              src="/img/imginspiration/huy1.webp"
              alt="Bộ chậu cây màu sắc"
              className="img-fluid w-100"
            />
          </div>

          {/* nội dung giữa */}
          <div className="col-12 col-md-4" style={{ textAlign: "center"}}>
            <h3 className="fw-bold mb-5" style={{ fontSize: "25px" }}>
              Thích trang trí màu sắc đậm? Cứ thoải mái thể hiện cá tính!
            </h3>
            <p className="text-muted mb-0" style={{ textAlign: "justify", maxWidth: "80%", marginLeft: "auto", marginRight: "auto" }}>
              Bạn là người yêu thích sự phá cách và muốn ngôi nhà mình thật sự nổi
              bật? Đừng ngần ngại chọn lựa những món hàng trang trí màu sắc rực
              rỡ! Từ những món đồ đều khéo ấn tượng cho đến những vật dụng trang
              trí ngộ nghĩnh, tất cả đều có thể truyền tải cá tính và nét quyến rũ
              riêng vào từng ngóc ngách. Chúng sẽ cùng nhau tạo nên một không gian
              sống động, tràn đầy năng lượng, thể hiện rõ phong cách độc đáo của
              bạn. Hãy để ngôi nhà bạn thật sự bùng nổ với sắc màu!
            </p>
          </div>

          {/* ảnh phải */}
          <div className="col-12 col-md-4">
            <img
              src="/img/imginspiration/huy2.webp"
              alt="Kệ sách trang trí"
              className="img-fluid w-100"
            />
          </div>
        </div>
      </section>

      <section className="container my-5">
        <div className="row g-4 align-items-center">
          {/* ảnh lớn bên trái */}
          <div className="col-12 col-md-6">
            <img
              src="/img/imginspiration/huy3.jpg"
              alt="Ghế armchair hoa văn và cây xanh"
              className="img-fluid w-100"
            />
          </div>

          {/* nội dung bên phải */}
          <div className="col-12 col-md-6">
            <h3 className="fw-bold mb-3">
              Ghế Armchair ấn tượng, tăng cường thư giãn, quên mọi âu lo
            </h3>
            <p className="text-muted" style={{ textAlign: "justify" }}>
              Muốn “thay áo” cho phòng khách? Một chiếc ghế sofa rực rỡ chính là
              câu trả lời! Dù là màu xanh ngọc lục bảo, cam cháy nổi bật hay
              vàng mật tựa rơm rạ, những gam màu tươi sáng này sẽ mang đến sự ấm
              áp, năng lượng giúp ngôi nhà bạn trở nên tươi mới và hấp dẫn hơn
              bao giờ hết. Bạn có thể kết hợp chúng với nhiều món đồ trang trí
              đa dạng, tự do sáng tạo.
            </p>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <div className="row">
          <div className="col-12">
            <h4 className="fw-bold mb-3">
              Thay đổi những khoảng trống đơn điệu
            </h4>

            <p className="text-muted" style={{ textAlign: "justify" }}>
              Đã đến lúc thổi hồn vào từng góc nhỏ trong ngôi nhà thân quen.
              Dù là một kiệt tác nghệ thuật trừu tượng hay
              <strong> những chiếc khay, khung ảnh trang trí </strong>
              đều sẽ biến đổi những bức tường trống, những chiếc tủ kệ đơn giản.
            </p>
          </div>

          <div className="col-12">
            <img
              src="/img/imginspiration/huy4.webp"
              alt="Trang trí nội thất"
              className="img-fluid w-100 mt-3"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default InspirationDetail2;
