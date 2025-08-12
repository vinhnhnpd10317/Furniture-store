import React, { useState } from "react";
import type { BinhLuan } from "../../api/Comment";
import { deleteComment, updateComment } from "../../api/Comment";

interface CommentSectionProps {
  commentList: BinhLuan[];
  commentContent: string;
  setCommentContent: (value: string) => void;
  handleSendComment: () => void;
  currentUserId: number;
  refreshComments: () => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  commentList,
  commentContent,
  setCommentContent,
  handleSendComment,
  currentUserId,
  refreshComments
}) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa bình luận này?")) {
      await deleteComment(id);
      refreshComments();
    }
  };

  const handleEditSave = async () => {
    if (!editContent.trim()) {
      alert("Nội dung bình luận không được để trống");
      return;
    }
    await updateComment(editId!, editContent);
    setEditId(null);
    refreshComments();
  };

  return (
    <div className="mt-5">
      <h5 className="fw-bold mb-4">Bình luận</h5>

      {/* Danh sách bình luận */}
      <div className="mb-4">
        {commentList.map((cmt, idx) => (
          <div
            key={idx}
            className="d-flex align-items-start gap-3 p-3 mb-3 rounded shadow-sm position-relative"
          >
            {/* Icon user thay vì avatar ảnh */}
            <i className="bi bi-person-circle fs-1 text-secondary"></i>

            <div className="flex-grow-1">
              <h6 className="mb-1 fw-semibold">{cmt.ten_nguoi_dung}</h6>

              {editId === cmt.id ? (
                <>
                  <textarea
                    className="form-control mb-2"
                    rows={2}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={handleEditSave}
                  >
                    Lưu
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditId(null)}
                  >
                    Hủy
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-1">{cmt.noi_dung}</p>
                  <small className="text-muted">
                    {new Date(cmt.ngay_binh_luan).toLocaleString()}
                  </small>
                </>
              )}
            </div>

            {/* Nút Sửa/Xóa nếu là bình luận của mình */}
            {currentUserId && currentUserId === cmt.nguoi_dung_id && editId !== cmt.id && (
              <div className="position-absolute" style={{ right: "10px", bottom: "10px" }}>
<button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditId(cmt.id);
                    setEditContent(cmt.noi_dung);
                  }}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(cmt.id)}
                >
                  Xóa
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Form gửi bình luận */}
      {localStorage.getItem("user") ? (
        <div className="d-flex align-items-start gap-3">
          {/* Icon user ở form nhập */}
          <i className="bi bi-person-circle fs-1 text-secondary"></i>

          <div className="flex-grow-1">
            <textarea
              className="form-control"
              placeholder="Nhập bình luận của bạn..."
              rows={3}
              style={{ resize: "none" }}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            ></textarea>
            <div className="d-flex justify-content-end mt-2">
              <button
                className="btn btn-dark btn-sm"
                onClick={handleSendComment}
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning">
          Vui lòng <a href="/login">đăng nhập</a> để bình luận.
        </div>
      )}
    </div>
  );
};

export default CommentSection;