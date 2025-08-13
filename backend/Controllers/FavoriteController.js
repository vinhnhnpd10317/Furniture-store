import connection from '../db.js';

// Lấy tất cả yêu thích (admin)
export const getAllFavorites = (req, res) => {
  const sql = `
    SELECT yt.*, sp.ten_san_pham, sp.hinh_anh_dai_dien
    FROM yeu_thich yt
    JOIN san_pham sp ON yt.san_pham_id = sp.id
  `;
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu yêu thích' });
    res.json(results);
  });
};

// Lấy yêu thích theo người dùng
export const getFavoritesByUser = (req, res) => {
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
};

// Thêm vào yêu thích
export const addFavorite = (req, res) => {
  const { nguoi_dung_id, san_pham_id } = req.body;
  if (!nguoi_dung_id || !san_pham_id) {
    return res.status(400).json({ error: 'Thiếu thông tin yêu cầu' });
  }

  const checkSql = 'SELECT * FROM yeu_thich WHERE nguoi_dung_id = ? AND san_pham_id = ?';
  connection.query(checkSql, [nguoi_dung_id, san_pham_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi kiểm tra yêu thích' });

    if (results.length > 0) {
      return res.status(409).json({ error: 'Đã tồn tại yêu thích' });
    }

    const insertSql = 'INSERT INTO yeu_thich (nguoi_dung_id, san_pham_id) VALUES (?, ?)';
    connection.query(insertSql, [nguoi_dung_id, san_pham_id], (err2) => {
      if (err2) return res.status(500).json({ error: 'Lỗi thêm yêu thích' });
      res.json({ message: 'Đã thêm vào yêu thích' });
    });
  });
};

// Xoá khỏi yêu thích
export const removeFavorite = (req, res) => {
  const { nguoi_dung_id, san_pham_id } = req.body;

  if (!nguoi_dung_id || !san_pham_id) {
    return res.status(400).json({ error: 'Thiếu thông tin cần xoá' });
  }

  const sqlDelete = 'DELETE FROM yeu_thich WHERE nguoi_dung_id = ? AND san_pham_id = ?';
  connection.query(sqlDelete, [nguoi_dung_id, san_pham_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi khi xoá yêu thích' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm để xoá' });
    }

    res.json({ message: 'Đã xoá khỏi yêu thích' });
  });
};
