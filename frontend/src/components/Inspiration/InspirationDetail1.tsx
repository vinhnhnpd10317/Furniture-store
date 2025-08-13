import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, type Article } from "../../api/ArticleApi";

const InspirationDetail1 = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      if (id) {
        console.log("Fetching article with ID:", id);
        const data = await getArticleById(Number(id));
        console.log("Fetched article:", data);
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
    <div className="container py-5">
      <Link to="/inspiration" className="btn btn-outline-secondary mb-4">
        ← Quay lại
      </Link>

      <h1 className="mb-3 text-uppercase text-success">{article.tieu_de}</h1>
      <p className="text-muted mb-4">
        Ngày đăng: {new Date(article.ngay_dang).toLocaleDateString()}
      </p>

      <img
        src={`/img/imgproduct/${article.hinh_anh}`}
        alt={article.tieu_de}
        className="img-fluid mb-5 rounded shadow w-100"
        style={{ maxHeight: "550px", objectFit: "cover" }}
      />

      <div style={{ whiteSpace: "pre-line" }} className="lead mb-5">
        {article.noi_dung}
      </div>

      {/* Nội dung bổ sung chia 2 cột trên màn hình lớn */}
      <div className="row g-5">
        <div className="col-md-6">
          <h4>🌿 Không gian sống đầy cảm hứng</h4>
          <p>
            Căn phòng được bài trí với ánh sáng tự nhiên, kết hợp nội thất gỗ trầm tạo cảm giác ấm cúng...
          </p>
          <img
            src="https://github.com/Lightwar25/memberImg/blob/main/1t5-1.png?raw=true"
            alt="Không gian nội thất"
            className="img-fluid rounded shadow"
            style={{ height: "450px", objectFit: "cover", width: "100%" }}
          />
        </div>

        <div className="col-md-6">
          <h4>🛋️ Phối màu tinh tế</h4>
          <p>
            Sự kết hợp giữa các tông màu pastel và chất liệu mộc mạc mang lại cảm giác dễ chịu cho người dùng.
          </p>
          <img
            src="https://github.com/Lightwar25/memberImg/blob/main/1t5-2.png?raw=true"
            alt="Phối màu"
            className="img-fluid rounded shadow"
            style={{ height: "450px", objectFit: "cover", width: "100%" }}
          />
        </div>
      </div>
      <div className="mt-5 p-4 bg-light rounded shadow-sm text-center">
        <h4 className="mb-3 text-primary">✨ Biến tổ ấm thành nơi bạn yêu mỗi ngày</h4>
        <p className="lead">
          Một không gian sống đẹp không cần quá xa hoa, chỉ cần đủ tinh tế và mang dấu ấn cá nhân.
          Hãy để mỗi góc nhỏ trong nhà là một mảnh ghép của câu chuyện bạn muốn kể.
        </p>
        <img
          src="https://github.com/Lightwar25/memberImg/blob/main/1t5-3.png?raw=true"
          alt="Không gian truyền cảm hứng"
          className="img-fluid rounded shadow mt-3"
          style={{ maxHeight: "470px", objectFit: "cover", width: "100%" }}
        />
        <p className="mt-4">
          👉 Đừng ngần ngại khám phá thêm nhiều <Link to="/products" className="text-success fw-bold">sản phẩm nội thất</Link> và ý tưởng trang trí tại <span className="fw-bold">Premi Seven</span>!
        </p>
      </div>
    </div>
  );
};

export default InspirationDetail1;
