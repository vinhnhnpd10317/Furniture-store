import React, { useEffect, useState } from 'react';
import { getArticles, deleteArticle, type Article } from '../../api/ArticleApi';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEdit, FaTrash } from "react-icons/fa";

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
      <style>{`
        html, body {
          max-width: 100%;
          overflow-x: hidden;
        }

        .article-list-wrapper {
          width: 100%;
          overflow-x: hidden;
        }

        .table td {
          word-break: break-word;
        }

        @media (max-width: 992px) {
          .hide-on-md {
            display: none;
          }
        }

        @media (max-width: 576px) {
          .desktop-table {
            display: none;
          }
          .mobile-card {
            display: block;
          }
        }

        @media (min-width: 577px) {
          .mobile-card {
            display: none;
          }
        }
      `}</style>

      <div className="article-list-wrapper">
        <div className="container-fluid py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>Danh sách bài viết</h3>
            <button
              className="btn btn-success"
              onClick={() => navigate("/admin/article/add")}
            >
              ➕ Thêm bài viết
            </button>
          </div>

          {/* Bảng cho desktop & tablet */}
          <div className="table-responsive desktop-table">
            <table className="table table-bordered align-middle shadow-sm table-hover">
              <thead className="table-light text-center">
                <tr>
                  <th className="py-3" style={{ minWidth: 150 }}>Tiêu đề</th>
                  <th className="hide-on-md py-3" style={{ minWidth: 100 }}>Ảnh</th>
                  <th className="hide-on-md py-3" style={{ minWidth: 250 }}>Nội dung</th>
                  <th className="py-3" style={{ minWidth: 150 }}>Ngày đăng</th>
                  <th className="py-3" style={{ minWidth: 130 }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td>{article.tieu_de}</td>
                    <td className="hide-on-md text-center">
                      <img
                        src={`/img/imgproduct/${article.hinh_anh}`}
                        alt="Ảnh"
                        className="img-thumbnail rounded"
                        style={{ width: "100%", maxWidth: "150px", height: "auto", objectFit: "cover" }}
                      />
                    </td>
                    <td className="hide-on-md" style={{ maxWidth: "250px" }}>
                      {article.noi_dung.length > 50
                        ? `${article.noi_dung.slice(0, 150)}...`
                        : article.noi_dung}
                    </td>
                    <td className="text-center">{new Date(article.ngay_dang).toLocaleString()}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                          onClick={() => navigate(`/admin/article/edit/${article.id}`)}
                        >
                          <FaEdit /> Sửa
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                          onClick={() => handleDelete(article.id)}
                        >
                          <FaTrash /> Xoá
                        </button>
                      </div>
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

          {/* Card layout cho mobile */}
          <div className="mobile-card">
            {articles.length === 0 && (
              <div className="text-center py-3">Không có bài viết nào</div>
            )}
            {articles.map((article) => (
              <div key={article.id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{article.tieu_de}</h5>
                  <p className="card-text">
                    <small className="text-muted">Ngày đăng: {new Date(article.ngay_dang).toLocaleString()}</small>
                  </p>
                  <img
                    src={`/img/imgproduct/${article.hinh_anh}`}
                    alt="Ảnh"
                    className="img-fluid mb-2"
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                  <p className="card-text">{article.noi_dung}</p>
                  <div className="d-flex justify-content-end">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleList;
