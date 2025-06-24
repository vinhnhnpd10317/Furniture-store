// backend/routes/cart.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// Lấy giỏ hàng theo user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = `
    SELECT gh.id AS gio_hang_id, gh.san_pham_id, gh.so_luong, 
          sp.ten_san_pham, sp.gia, sp.hinh_anh_dai_dien,
          sp.vat_lieu, sp.chat_lieu
    FROM gio_hang gh 
    JOIN san_pham sp ON gh.san_pham_id = sp.id 
    WHERE gh.nguoi_dung_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Thêm sản phẩm vào giỏ
// cart.js - Thêm sản phẩm vào giỏ
router.post('/', (req, res) => {
  const { nguoi_dung_id, san_pham_id, so_luong } = req.body;
  const checkSql = `SELECT * FROM gio_hang WHERE nguoi_dung_id = ? AND san_pham_id = ?`;
  db.query(checkSql, [nguoi_dung_id, san_pham_id], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length > 0) {
      // ✅ Nếu sản phẩm đã có → cộng dồn số lượng
      const newQty = results[0].so_luong + so_luong;
      const updateSql = `UPDATE gio_hang SET so_luong = ? WHERE nguoi_dung_id = ? AND san_pham_id = ?`;
      db.query(updateSql, [newQty, nguoi_dung_id, san_pham_id], err => {
        if (err) return res.status(500).json({ error: err });
        return res.json({ message: 'Cập nhật số lượng thành công' });
      });
    } else {
      // ✅ Nếu chưa có → thêm mới
      const insertSql = `INSERT INTO gio_hang (nguoi_dung_id, san_pham_id, so_luong) VALUES (?, ?, ?)`;
      db.query(insertSql, [nguoi_dung_id, san_pham_id, so_luong], err => {
        if (err) return res.status(500).json({ error: err });
        return res.json({ message: 'Thêm vào giỏ hàng thành công' });
      });
    }
  });
});


// Cập nhật số lượng
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { so_luong } = req.body;
  const sql = `UPDATE gio_hang SET so_luong = ? WHERE id = ?`;
  db.query(sql, [so_luong, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Cập nhật giỏ hàng thành công' });
  });
});

// Xoá sản phẩm khỏi giỏ
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM gio_hang WHERE id = ?`;
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Xoá khỏi giỏ hàng thành công' });
  });
});

export default router;
