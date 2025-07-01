import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, type Article } from "../../api/ArticleApi";

const InspirationDetail4 = () => {
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
    <div className="container py-4">
      <Link to="/inspiration" className="btn btn-outline-secondary mb-3">
        ← Quay lại
      </Link>

      {/* Tiêu đề và ngày đăng */}
      <h1 className="text-uppercase text-success mb-2">{article.tieu_de}</h1>
      <p className="text-muted mb-4">
        Ngày đăng: {new Date(article.ngay_dang).toLocaleDateString()}
      </p>

      {/* Ảnh chính của bài viết */}
      <img
        src={`/img/imgproduct/${article.hinh_anh}`}
        alt={article.tieu_de}
        className="img-fluid d-block mx-auto rounded shadow mb-4"
        style={{ maxHeight: "420px", objectFit: "cover", width: "100%" }}
      />

      {/* Nội dung bài viết */}
      <div className="lead mb-5" style={{ whiteSpace: "pre-line" }}>
        {article.noi_dung}
      </div>

      {/* Danh sách các mẫu sofa */}
      {[
        {
          title: "1. Sofa da Opal – Thiết kế hiện đại, sang trọng",
          desc: "Với khung gỗ chắc chắn, chân kim loại và lớp bọc da bò tự nhiên mềm mịn, Opal mang lại sự thoải mái tối đa. Các gam màu thời thượng như xám, cognac giúp nâng tầm không gian phòng khách.",
          img: "https://nhaxinh.com/wp-content/uploads/2025/03/Sofa-da-Opal.jpg",
        },
        {
          title: "2. Sofa da Jazz – Cá tính & phong cách Retro",
          desc: "Lấy cảm hứng từ Retro & Vintage, sofa Jazz nổi bật với tông cognac cổ điển. Đây là lựa chọn lý tưởng cho phòng khách nghệ thuật, sáng tạo.",
          img: "https://nhaxinh.com/wp-content/uploads/2025/03/Sofa-da-Jazz.jpg",
        },
        {
          title: "3. Sofa Metro – Thanh lịch & linh hoạt",
          desc: "Thiết kế tối giản, viền sắc sảo và khả năng hòa hợp với mọi phong cách – Metro mang đến sự thanh thoát, tiện nghi và hài hòa cho không gian sống.",
          img: "https://nhaxinh.com/wp-content/uploads/2025/03/Sofa-Metro.jpg",
        },
        {
          title: "4. Sofa Valente – Tinh tế và đẳng cấp",
          desc: "Với đường nét thanh thoát, chân kim loại mạ sang trọng và da cao cấp, Valente không chỉ đẹp mà còn dễ bảo trì. Phù hợp với mọi không gian sống tinh tế.",
          img: "https://nhaxinh.com/wp-content/uploads/2025/03/Sofa-Valente.jpg",
        },
        {
          title: "5. Sofa Combo – Hiện đại và tiện nghi",
          desc: "Kiểu dáng gọn gàng, đệm ngồi êm ái, chân kim loại ánh kim – Sofa Combo là lựa chọn hoàn hảo cho người yêu sự hiện đại và tối giản. Chất liệu da tự nhiên và khung gỗ beech giúp sản phẩm bền đẹp theo thời gian.",
          img: "https://nhaxinh.com/wp-content/uploads/2025/03/Sofa-Combo.jpg",
        },
      ].map((item, index) => (
        <div key={index} className="mb-5 text-center">
          <h5 className="mb-2 fw-bold">{item.title}</h5>
          <p className="mb-3">{item.desc}</p>
          <img
            src={item.img}
            alt={item.title}
            className="img-fluid rounded shadow"
            style={{
              maxHeight: "550px", // ẢNH CAO HƠN
              objectFit: "cover",
              width: "100%",
            }}
          />
        </div>
      ))}

      {/* Kết luận */}
      <div className="mt-5 p-4 bg-light rounded shadow-sm text-center">
        <h4 className="mb-3 text-primary">
          ✨ Định hình phong cách sống đẳng cấp với sofa da Nhà Xinh
        </h4>
        <p className="lead">
          Mỗi mẫu sofa tại Nhà Xinh không chỉ là sản phẩm nội thất, mà còn là
          tuyên ngôn cho phong cách sống hiện đại, cá tính. Dù bạn yêu thích
          phong cách tối giản, retro hay thanh lịch – đều có lựa chọn phù hợp
          cho tổ ấm của bạn.
        </p>
        <img
          src="https://noithatkenli.vn/wp-content/uploads/2020/10/0-10-mau-ghe-sofa-cho-khong-gian-nho-hep.jpg"
          alt="Không gian sống đẳng cấp"
          className="img-fluid rounded shadow mt-3"
          style={{ maxHeight: "450px", objectFit: "cover", width: "100%" }}
        />
        <p className="mt-4">
          👉 Khám phá thêm nhiều{" "}
          <Link to="/products" className="text-success fw-bold">
            mẫu sofa mới nhất
          </Link>{" "}
          tại <span className="fw-bold">G7 Prime</span> ngay hôm nay!
        </p>
      </div>
    </div>
  );
};

export default InspirationDetail4;
