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

// POST - Thêm bình luận mới 

router.post('/', (req, res) => {
   console.log("🟢 Nhận POST /comments:", req.body); // THÊM LOG
  const { nguoi_dung_id, san_pham_id, noi_dung } = req.body;

  if (!nguoi_dung_id || !san_pham_id || !noi_dung) {
    return res.status(400).json({ message: 'Thiếu dữ liệu bắt buộc' });
  }

  const sql = `
    INSERT INTO binh_luan (nguoi_dung_id, san_pham_id, noi_dung, ngay_binh_luan)
    VALUES (?, ?, ?, NOW())
  `;

  db.query(sql, [nguoi_dung_id, san_pham_id, noi_dung], (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi thêm bình luận:", err);
      return res.status(500).json({ message: "Lỗi server khi thêm bình luận" });
    }

    res.status(201).json({ message: "Đã thêm bình luận thành công" });
  });
});

// GET - Lấy danh sách bình luận, có thể lọc theo sản phẩm
router.get('/', (req, res) => {
  const sanPhamId = req.query.san_pham_id;

  let sql = `
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
  `;

  const params = [];

  if (sanPhamId) {
    sql += ` WHERE bl.san_pham_id = ?`;
    params.push(sanPhamId);
  }

  sql += ` ORDER BY bl.ngay_binh_luan DESC`;

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi truy vấn bình luận:", err);
      return res.status(500).json({ message: "Lỗi server khi lấy bình luận" });
    }
    res.json(result);
  });
});
// PUT - Cập nhật bình luận theo ID (chỉ nội dung)
router.put('/:id', (req, res) => {
  const { noi_dung } = req.body;
  if (!noi_dung) {
    return res.status(400).json({ message: 'Nội dung bình luận không được để trống' });
  }

  const sql = "UPDATE binh_luan SET noi_dung = ? WHERE id = ?";
  db.query(sql, [noi_dung, req.params.id], (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi cập nhật:", err);
      return res.status(500).json({ message: "Lỗi server khi cập nhật bình luận" });
    }
    res.json({ message: "Đã cập nhật bình luận thành công" });
  });
});

export default router;