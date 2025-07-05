// Routes/Favorite.js
import express from 'express';
import connection from '../db.js';

const router = express.Router();

// GET tất cả yêu thích (cho admin)
router.get('/', (req, res) => {
  const sql = `
    SELECT yt.*, sp.ten_san_pham, sp.hinh_anh_dai_dien
    FROM yeu_thich yt
    JOIN san_pham sp ON yt.san_pham_id = sp.id
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Lỗi khi truy vấn yêu thích:', err);
      return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu yêu thích' });
    }
    res.json(results);
  });
});

router.get('/:nguoi_dung_id', (req, res) => {
  const { nguoi_dung_id } = req.params;
  const sql = `
    SELECT yt.*, sp.ten_san_pham, sp.hinh_anh_dai_dien, sp.gia
    FROM yeu_thich yt
    JOIN san_pham sp ON yt.san_pham_id = sp.id
    WHERE yt.nguoi_dung_id = ?
  `;
  connection.query(sql, [nguoi_dung_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu yêu thích' });
    res.json(results);
  });
});


// Thêm vào yêu thích
router.post('/', (req, res) => {
  const { nguoi_dung_id, san_pham_id } = req.body;
  if (!nguoi_dung_id || !san_pham_id) {
    return res.status(400).json({ error: 'Thiếu thông tin yêu cầu' });
  }

  const checkSql = 'SELECT * FROM yeu_thich WHERE nguoi_dung_id = ? AND san_pham_id = ?';
  connection.query(checkSql, [nguoi_dung_id, san_pham_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi kiểm tra yêu thích' });

    if (results.length > 0) {
      return res.status(409).json({ error: 'Đã tồn tại yêu thích' }); // tránh lỗi 500 do trùng UNIQUE
    }

    const insertSql = 'INSERT INTO yeu_thich (nguoi_dung_id, san_pham_id) VALUES (?, ?)';
    connection.query(insertSql, [nguoi_dung_id, san_pham_id], (err2, result) => {
      if (err2) return res.status(500).json({ error: 'Lỗi thêm yêu thích' });
      res.json({ message: 'Đã thêm vào yêu thích' });
    });
  });
});

export default router;
