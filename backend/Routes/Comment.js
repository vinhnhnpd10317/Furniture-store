// routes/Comment.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET - Lấy danh sách bình luận kèm tên người dùng và tên sản phẩm
router.get('/', (req, res) => {
  const sql = `
    SELECT 
      bl.id, 
      bl.noi_dung, 
      bl.ngay_binh_luan, 
      nd.ho_ten AS ten_nguoi_dung,
      sp.ten_san_pham,
      sp.hinh_anh_dai_dien AS san_pham_anh
    FROM binh_luan bl
    JOIN nguoi_dung nd ON bl.nguoi_dung_id = nd.id
    JOIN san_pham sp ON bl.san_pham_id = sp.id
    ORDER BY bl.ngay_binh_luan DESC
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi truy vấn bình luận:", err);
      return res.status(500).json({ message: "Lỗi server khi lấy bình luận" });
    }
    res.json(result);
  });
});

// DELETE - Xoá bình luận theo ID
router.delete('/:id', (req, res) => {
  const sql = "DELETE FROM binh_luan WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi xóa:", err);
      return res.status(500).json({ message: "Lỗi khi xóa bình luận" });
    }
    res.json({ message: "Đã xóa bình luận thành công" });
  });
});

export default router;
