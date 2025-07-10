// CommentManager.tsx
import React, { useEffect, useState } from 'react';
import { fetchComments, deleteComment, type BinhLuan } from '../../api/Comment';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommentManager: React.FC = () => {
  const [comments, setComments] = useState<BinhLuan[]>([]);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = () => {
    fetchComments()
      .then(data => setComments(data))
      .catch(err => console.error('❌ Lỗi khi load bình luận:', err));
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa bình luận này không?")) {
      try {
        await deleteComment(id);
        loadComments(); // Tải lại danh sách sau khi xóa
      } catch (error) {
        console.error("❌ Lỗi khi xóa bình luận:", error);
        alert("Không thể xóa bình luận");
      }
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('vi-VN');
  };

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
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(comment.id)}
                    >
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
