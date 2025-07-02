import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { imageOptions } from '../../data/imgList';
import {
  createArticle,
  updateArticle,
  getArticleById,
  initialArticleForm,
} from '../../api/ArticleApi';

const ArticleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState(initialArticleForm);

  useEffect(() => {
    if (isEdit) {
      (async () => {
        const article = await getArticleById(Number(id));
        setFormData({
          tieu_de: article.tieu_de,
          noi_dung: article.noi_dung,
          hinh_anh: article.hinh_anh,
          ngay_dang: article.ngay_dang ? new Date(article.ngay_dang).toISOString().slice(0, 16) : '',
        });
      })();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = new Date(formData.ngay_dang).toISOString().slice(0, 19).replace('T', ' ');
    const payload = { ...formData, ngay_dang: formattedDate };

    if (isEdit) {
      await updateArticle(Number(id), payload);
      alert('✅ Cập nhật thành công');
    } else {
      await createArticle(payload);
      alert('✅ Thêm bài viết thành công');
    }

    navigate('/admin/article');
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">{isEdit ? '✏️ Chỉnh sửa' : '➕ Thêm bài viết'}</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light shadow-sm">
        <input
          type="text"
          name="tieu_de"
          className="form-control mb-2"
          placeholder="Tiêu đề"
          value={formData.tieu_de}
          onChange={handleChange}
          required
        />
        <textarea
          name="noi_dung"
          className="form-control mb-2"
          placeholder="Nội dung"
          rows={4}
          value={formData.noi_dung}
          onChange={handleChange}
          required
        />
        <select
          name="hinh_anh"
          className="form-control mb-2"
          value={formData.hinh_anh}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn ảnh từ /img/imgproduct --</option>
          {imageOptions.map((img) => (
            <option key={img} value={img}>{img}</option>
          ))}
        </select>
        <input
          type="datetime-local"
          name="ngay_dang"
          className="form-control mb-3"
          value={formData.ngay_dang}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary">{isEdit ? 'Cập nhật' : 'Thêm'}</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/admin/article')}>Huỷ</button>
      </form>
    </div>
  );
};

export default ArticleForm;
