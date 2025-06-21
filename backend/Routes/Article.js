// backend/routes/article.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// 📰 Lấy tất cả bài viết
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM bai_viet ORDER BY ngay_dang DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Thêm bài viết
router.post('/', (req, res) => {
  const { tieu_de, noi_dung, hinh_anh, ngay_dang } = req.body;
  const sql = 'INSERT INTO bai_viet (tieu_de, noi_dung, hinh_anh, ngay_dang) VALUES (?, ?, ?, ?)';
  db.query(sql, [tieu_de, noi_dung, hinh_anh, ngay_dang], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Thêm bài viết thành công', id: result.insertId });
  });
});

// Sửa bài viết
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { tieu_de, noi_dung, hinh_anh, ngay_dang } = req.body;
  const sql = 'UPDATE bai_viet SET tieu_de=?, noi_dung=?, hinh_anh=?, ngay_dang=? WHERE id=?';
  db.query(sql, [tieu_de, noi_dung, hinh_anh, ngay_dang, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Cập nhật bài viết thành công' });
  });
});


// ❌ Xoá bài viết
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM bai_viet WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Xoá bài viết thành công' });
  });
});

export default router;
