import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, type Article } from "../../api/ArticleApi";

const InspirationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await getArticleById(Number(id));
          setArticle(res);
        } catch (err) {
          console.error("Lỗi khi lấy bài viết:", err);
        }
      }
    };
    fetchData();
  }, [id]);

  if (!article) return <div className="container py-5">Đang tải...</div>;

  return (
    <div className="container py-5">
      <Link to="/inspiration" className="btn btn-outline-secondary mb-4">← Quay lại</Link>

      <div className="row">
        {/* Bố cục chia cột nếu muốn */}
        <div className="col-lg-8 mx-auto">
          {/* Ảnh lớn */}
          <img
            src={`/img/imgproduct/${article.hinh_anh}`}
            alt={article.tieu_de}
            className="img-fluid rounded mb-4"
            style={{ maxHeight: "450px", objectFit: "cover", width: "100%" }}
          />

          {/* Meta thông tin */}
          <p className="text-muted mb-1">
            <i className="bi bi-calendar-event"></i> {new Date(article.ngay_dang).toLocaleDateString()}
          </p>

          {/* Tiêu đề */}
          <h1 className="mb-4 text-uppercase fw-bold">{article.tieu_de}</h1>

          {/* Nội dung */}
          <div className="lead" style={{ whiteSpace: "pre-line" }}>
            {article.noi_dung}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspirationDetail;
