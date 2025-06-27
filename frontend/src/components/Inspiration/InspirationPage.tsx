import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InspirationHero from "./InspirationHero";
import { getArticles, type Article } from "../../api/ArticleApi";

const InspirationPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách bài viết:", err);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="container py-5">
      <InspirationHero />
      <h1 className="mb-4 text-center">Góc Cảm Hứng Nhà Xinh</h1>

      <div className="row g-4">
        {articles.map((article) => (
          <div className="col-12 col-md-6" key={article.id}>
            <Link to={`/inspiration/${article.id}`} className="card h-100 shadow-sm text-decoration-none text-dark">
              <img src={`/img/imgproduct/${article.hinh_anh}`} alt={article.tieu_de}
              style={{ height: '220px', objectFit: 'cover', width: '100%', borderRadius: '5px',}}
              className="mb-3"
            />
              <div className="card-body">
                <h5 className="card-title text-uppercase">
                  {article.tieu_de}
                </h5>
                <p className="card-text text-truncate">
                  {article.noi_dung.slice(0, 100)}...
                </p>
                <small className="text-muted">
                  Ngày đăng:{" "}
                  {new Date(article.ngay_dang).toLocaleDateString()}
                </small>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success">XEM TẤT CẢ</button>
      </div>
    </div>
  );
};

export default InspirationPage;
