import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, type Article } from "../../api/ArticleApi";

const InspirationDetail3 = () => {
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
      <img
        src={`/img/imgproduct/${article.hinh_anh}`}
        alt={article.tieu_de}
        className="img-fluid w-100 mb-4"
        style={{ maxHeight: "500px", objectFit: "cover" }}
      />

      <div className="container py-4">
        <Link to="/inspiration" className="btn btn-outline-secondary mb-4">
          ← Quay lại
        </Link>

        <h1 className="text-uppercase text-success mb-3">{article.tieu_de}</h1>
        <p className="text-muted mb-4">
          Ngày đăng: {new Date(article.ngay_dang).toLocaleDateString()}
        </p>
        <div className="lead" style={{ whiteSpace: "pre-line" }}>
          {article.noi_dung}
        </div>
      </div>
    </div>
  );
};

export default InspirationDetail3;
