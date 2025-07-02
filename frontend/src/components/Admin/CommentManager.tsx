import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Kiểu dữ liệu theo bảng `binh_luan`, thêm `san_pham_anh`
type BinhLuan = {
  id: number;
  nguoi_dung_id: number;
  san_pham_anh: string;
  noi_dung: string;
  ngay_binh_luan: string;
};

const fakeComments: BinhLuan[] = [
  {
    id: 1,
    nguoi_dung_id: 12,
    san_pham_anh: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=600',
    noi_dung: 'Sản phẩm rất đẹp và chất lượng. Mình sẽ quay lại mua lần sau!',
    ngay_binh_luan: '2025-06-22T14:35:00',
  },
  {
    id: 2,
    nguoi_dung_id: 7,
    san_pham_anh: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=600',
    noi_dung: 'Giao hàng hơi chậm nhưng nhân viên hỗ trợ rất nhiệt tình.',
    ngay_binh_luan: '2025-06-21T09:15:00',
  },
];

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString('vi-VN');
};

const CommentManager: React.FC = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">📝 Quản lý bình luận</h2>

      <div className="row gy-4">
        {fakeComments.map((comment) => (
          <div key={comment.id} className="col-12">
            <div className="card shadow-sm comment-card p-3">
              <div className="row g-3 align-items-center">
                <div className="col-md-2 text-center">
                  <img
                    src={comment.san_pham_anh}
                    alt="Sản phẩm"
                    className="img-fluid rounded shadow-sm product-image"
                  />
                </div>
                <div className="col-md-10">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">Người dùng #{comment.nguoi_dung_id}</h5>
                    <small className="text-muted">{formatDate(comment.ngay_binh_luan)}</small>
                  </div>
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
        .comment-card {
          transition: box-shadow 0.3s;
        }
        .comment-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .white-space-pre-line {
          white-space: pre-line;
        }
        .product-image {
          max-height: 100px;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default CommentManager;
