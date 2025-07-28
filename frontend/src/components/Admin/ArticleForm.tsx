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
  const [errors, setErrors] = useState({
    tieu_de: '',
    noi_dung: '',
    hinh_anh: '',
    ngay_dang: '',
  });

  useEffect(() => {
    if (isEdit) {
      (async () => {
        const article = await getArticleById(Number(id));
        setFormData({
          tieu_de: article.tieu_de,
          noi_dung: article.noi_dung,
          hinh_anh: article.hinh_anh,
          ngay_dang: article.ngay_dang
            ? new Date(article.ngay_dang).toISOString().slice(0, 16)
            : '',
        });
      })();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error when user types
  };

  const validateForm = () => {
    const newErrors = {
      tieu_de: '',
      noi_dung: '',
      hinh_anh: '',
      ngay_dang: '',
    };
    let isValid = true;

    // Validate tiêu đề (Tên danh mục)
    if (!formData.tieu_de.trim()) {
      newErrors.tieu_de = 'Tên danh mục không được để trống';
      isValid = false;
    } else if (formData.tieu_de.trim().length < 3) {
      newErrors.tieu_de = 'Tên danh mục phải có ít nhất 3 ký tự';
      isValid = false;
    }

    // Validate nội dung
    if (!formData.noi_dung.trim()) {
      newErrors.noi_dung = 'Nội dung không được để trống';
      isValid = false;
    } else if (formData.noi_dung.trim().length < 10) {
      newErrors.noi_dung = 'Nội dung phải có ít nhất 10 ký tự';
      isValid = false;
    }

    // Validate hình ảnh
    if (!formData.hinh_anh) {
      newErrors.hinh_anh = 'Vui lòng chọn hình ảnh';
      isValid = false;
    }

    // Validate ngày đăng
    if (!formData.ngay_dang) {
      newErrors.ngay_dang = 'Vui lòng chọn ngày đăng';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formattedDate = new Date(formData.ngay_dang)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
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

        {/* Tiêu đề */}
        <input
          type="text"
          name="tieu_de"
          className="form-control mb-1"
          placeholder="Tiêu đề"
          value={formData.tieu_de}
          onChange={handleChange}
        />
        {errors.tieu_de && <div className="text-danger mb-2">{errors.tieu_de}</div>}

        {/* Nội dung */}
        <textarea
          name="noi_dung"
          className="form-control mb-1"
          placeholder="Nội dung"
          rows={4}
          value={formData.noi_dung}
          onChange={handleChange}
        />
        {errors.noi_dung && <div className="text-danger mb-2">{errors.noi_dung}</div>}

        {/* Hình ảnh */}
        <select
          name="hinh_anh"
          className="form-control mb-1"
          value={formData.hinh_anh}
          onChange={handleChange}
        >
          <option value="">-- Chọn ảnh từ /img/imgproduct --</option>
          {imageOptions.map((img) => (
            <option key={img} value={img}>{img}</option>
          ))}
        </select>
        {errors.hinh_anh && <div className="text-danger mb-2">{errors.hinh_anh}</div>}

        {/* Ngày đăng */}
        <input
          type="datetime-local"
          name="ngay_dang"
          className="form-control mb-1"
          value={formData.ngay_dang}
          onChange={handleChange}
        />
        {errors.ngay_dang && <div className="text-danger mb-3">{errors.ngay_dang}</div>}

        {/* Buttons */}
        <button className="btn btn-primary">{isEdit ? 'Cập nhật' : 'Thêm'}</button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/admin/article')}
        >
          Huỷ
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
