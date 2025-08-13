import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, type Article } from "../../api/ArticleApi";

const InspirationDetail5 = () => {
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
        </div><br />
        {/* Nội dung bổ sung chia 2 cột trên màn hình lớn */}
        <div className="row g-5">
          <div className="col-md-6">
            <h4>🌟 Valencia – bộ sản phẩm cho phòng khách sang trọng, thanh lịch</h4>
            <p>
              Lấy cảm hứng từ thành phố Valencia, miền Đông Nam Tây Ban Nha, nơi nổi tiếng với sự giao thoa độc đáo giữa kiến trúc hiện đại và cổ kính.
              Thiết kế của Valencia tập trung vào việc gợi lên cảm giác ấm áp và linh hoạt, đáp ứng nhu cầu của cuộc sống hiện đại trong khi vẫn tôn vinh những di sản văn hóa lâu đời.
            </p>
            <img
              src="https://github.com/Lightwar25/memberImg/blob/main/5t1-1.jpg?raw=true"
              alt="Đóng góp"
              className="img-fluid rounded shadow"
              style={{ height: "450px", objectFit: "cover", width: "100%" }}
            />
          </div>

          <div className="col-md-6">
            <h4>🌼 Valencia – bộ sản phẩm cho phòng khách sang trọng, thanh lịch</h4>
            <p>
              Lấy cảm hứng từ thành phố Valencia, miền Đông Nam Tây Ban Nha, nơi nổi tiếng với sự giao thoa độc đáo giữa kiến trúc hiện đại và cổ kính.
              Thiết kế của Valencia tập trung vào việc gợi lên cảm giác ấm áp và linh hoạt, đáp ứng nhu cầu của cuộc sống hiện đại trong khi vẫn tôn vinh những di sản văn hóa lâu đời. 
            </p>
            <img
              src="https://raw.githubusercontent.com/Lightwar25/memberImg/refs/heads/main/5t1-2.webp"
              alt="Tương lai"
              className="img-fluid rounded shadow"
              style={{ height: "450px", objectFit: "cover", width: "100%" }}
            />
          </div>
        </div>
        <div className="mt-5 p-4 bg-light rounded shadow-sm text-center">
          <h4 className="mb-3 text-primary">🌟 Napoli – tạo nên vẻ đẹp ấm cúng cho không gian phòng ăn</h4>
          <p className="lead">
            Napoli ra đời từ sự hòa quyện độc đáo giữa vẻ đẹp tự nhiên của các hình khối organic, sự tỉ mỉ trong từng chi tiết hoàn thiện và nguồn cảm hứng mạnh mẽ từ kiến trúc hiện đại.
            Ý tưởng thiết kế của Napoli tập trung vào việc tạo ra một sự cân bằng thị giác ấn tượng thông qua các hình khối mang tính kiến trúc. 
          </p>
          <img
            src="https://raw.githubusercontent.com/Lightwar25/memberImg/refs/heads/main/5t-3.webp"
            alt="Hành trình"
            className="img-fluid rounded shadow mt-3"
            style={{ maxHeight: "470px", objectFit: "cover", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default InspirationDetail5;