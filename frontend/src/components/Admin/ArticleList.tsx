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
    <div className="container my-5">
      <h2 className="mb-4 text-center">Danh sách bài viết</h2>

      <div className="text-end mb-3">
        <button
          className="btn btn-success"
          onClick={() => navigate("/admin/article/add")}
        >
          ➕ Thêm bài viết
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Tiêu đề</th>
            <th>Ảnh</th>
            <th>Nội dung</th>
            <th>Ngày đăng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td style={{ maxWidth: '250px', wordWrap: 'break-word', whiteSpace: 'normal' }}>{article.tieu_de}</td>
              <td>
                <img
                  src={`/img/imgproduct/${article.hinh_anh}`}
                  alt="Ảnh"
                  width={100}
                />
              </td>
              <td className="text-truncate" style={{ maxWidth: 300 }}>
                {article.noi_dung}
              </td>
              <td>{new Date(article.ngay_dang).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/admin/article/edit/${article.id}`)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(article.id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
          {articles.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                Không có bài viết nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ArticleList;