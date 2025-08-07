import React, { useEffect, useState } from 'react';
import { getArticles, deleteArticle, type Article } from '../../api/ArticleApi';
import { useNavigate, useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigate = useNavigate();
  const query = useQuery();
  const searchText = query.get("search")?.toLowerCase() || "";

  useEffect(() => {
    loadArticles(searchText);
  }, [searchText]);

  const loadArticles = async (search?: string) => {
    const data = await getArticles(search || undefined);
    setArticles(data);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc muốn xoá bài viết này?')) {
      await deleteArticle(id);
      loadArticles(searchText);
    }
  };

  return (
    <>
      {/* ✅ Thêm CSS để tránh tràn toàn trang */}
      <style>{`
        html, body {
          max-width: 100%;
          overflow-x: hidden;
        }

        .article-list-wrapper {
          width: 100%;
          overflow-x: hidden;
        }

        .container, .container-fluid {
          padding-left: 12px;
          padding-right: 12px;
        }

        td {
          word-break: break-word;
        }

        @media (max-width: 576px) {
          .btn {
            font-size: 14px;
            padding: 6px 10px;
          }

          h2 {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="article-list-wrapper">
        <div className="container my-4 px-2">
          <h2 className="mb-4 text-center">📋 Danh sách bài viết</h2>

          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-success"
              onClick={() => navigate("/admin/article/add")}
            >
              ➕ Thêm bài viết
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle shadow-sm">
              <thead className="table-light text-center">
                <tr>
                  <th style={{ minWidth: 150 }}>Tiêu đề</th>
                  <th style={{ minWidth: 100 }}>Ảnh</th>
                  <th style={{ minWidth: 250 }}>Nội dung</th>
                  <th style={{ minWidth: 150 }}>Ngày đăng</th>
                  <th style={{ minWidth: 130 }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td>{article.tieu_de}</td>
                    <td>
                      <div style={{ maxWidth: "100px", overflow: "hidden" }}>
                        <img
                          src={`/img/imgproduct/${article.hinh_anh}`}
                          alt="Ảnh"
                          className="img-fluid"
                          style={{ width: "100%", height: "auto", objectFit: "cover" }}
                        />
                      </div>
                    </td>
                    <td style={{ maxWidth: "250px", whiteSpace: "normal", wordWrap: "break-word" }}>
                      {article.noi_dung}
                    </td>
                    <td>{new Date(article.ngay_dang).toLocaleString()}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => navigate(`/admin/article/edit/${article.id}`)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(article.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
                {articles.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-3">
                      Không có bài viết nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleList;
