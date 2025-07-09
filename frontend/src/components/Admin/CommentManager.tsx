import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type BinhLuan = {
  id: number;
  noi_dung: string;
  ngay_binh_luan: string;
  ten_nguoi_dung: string;
  ten_san_pham: string;
  san_pham_anh: string;
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString('vi-VN');
};

const CommentManager: React.FC = () => {
  const [comments, setComments] = useState<BinhLuan[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/comments')
      .then(res => res.json())
      .then(data => {
        console.log("✔️ Dữ liệu trả về:", data);
        setComments(data);
      })
      .catch(err => console.error('❌ Lỗi khi load bình luận:', err));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">📝 Quản lý bình luận</h2>

      <div className="row gy-4">
        {comments.map((comment) => (
          <div key={comment.id} className="col-12">
            <div className="card shadow-sm comment-card p-3">
              <div className="row g-3 align-items-center">
                <div className="col-md-2 text-center">
                  <img
                    src={`/img/imgproduct/${comment.san_pham_anh}`}
                    alt="Sản phẩm"
                    className="img-fluid rounded shadow-sm product-image"
                  />
                </div>
                <div className="col-md-10">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">{comment.ten_nguoi_dung}</h5>
                    <small className="text-muted">{formatDate(comment.ngay_binh_luan)}</small>
                  </div>
                  <p className="mb-1 text-secondary"><em>Bình luận về:</em> {comment.ten_san_pham}</p>
                  <p className="mb-3 white-space-pre-line">{comment.noi_dung}</p>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-danger btn-sm">
                      🗑️ Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .comment-card { transition: box-shadow 0.3s; }
        .comment-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .white-space-pre-line { white-space: pre-line; }
        .product-image { max-height: 100px; object-fit: cover; }
      `}</style>
    </div>
  );
};

export default CommentManager;
