import React, { useEffect, useState } from 'react';
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  type Article,
  initialArticleForm,
} from '../../api/ArticleApi';

const AdminArticle = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [formData, setFormData] = useState(initialArticleForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    const data = await getArticles();
    setArticles(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedDate = new Date(formData.ngay_dang)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');

      const payload = { ...formData, ngay_dang: formattedDate };

      if (editingId !== null) {
        await updateArticle(editingId, payload);
         alert('✅ Cập nhật bài viết thành công!');
      } else {
        await createArticle(payload);
         alert('✅ Thêm bài viết thành công!');
      }

      setFormData(initialArticleForm);
      setEditingId(null);
      loadArticles();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert('Lỗi khi lưu bài viết!');
    }
  };

  const handleEdit = (article: Article) => {
        setEditingId(article.id);
        setFormData({
          tieu_de: article.tieu_de,
          noi_dung: article.noi_dung,
          hinh_anh: article.hinh_anh,
          ngay_dang: article.ngay_dang
            ? new Date(article.ngay_dang).toISOString().slice(0, 16)
            : '',
        });
      };


  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc muốn xoá bài viết này?')) {
      await deleteArticle(id);
      loadArticles();
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Quản lý bài viết</h2>

      <form onSubmit={handleSubmit} className="border p-4 mb-5 rounded shadow-sm bg-light">
        <h5>{editingId !== null ? '✏️ Chỉnh sửa bài viết' : '➕ Thêm bài viết mới'}</h5>
        <input
          type="text"
          name="tieu_de"
          placeholder="Tiêu đề"
          className="form-control mb-2"
          value={formData.tieu_de}
          onChange={handleChange}
          required
        />
        <textarea
          name="noi_dung"
          placeholder="Nội dung"
          className="form-control mb-2"
          rows={4}
          value={formData.noi_dung}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="hinh_anh"
          placeholder="Link hình ảnh"
          className="form-control mb-2"
          value={formData.hinh_anh}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="ngay_dang"
          placeholder="Ngày đăng"
          className="form-control mb-2"
          value={formData.ngay_dang}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary me-2">
          {editingId !== null ? 'Cập nhật' : 'Thêm'}
        </button>
        {editingId !== null && (
          <button type="button" className="btn btn-secondary" onClick={() => {
            setFormData(initialArticleForm);
            setEditingId(null);
          }}>
            Huỷ
          </button>
        )}
      </form>

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
              <td>{article.tieu_de}</td>
              <td>
                <img src={article.hinh_anh} alt="Ảnh" width={100} />
              </td>
              <td>{article.noi_dung}</td>
              <td>{new Date(article.ngay_dang).toLocaleString()}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(article)}>
                  Sửa
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(article.id)}>
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminArticle;
