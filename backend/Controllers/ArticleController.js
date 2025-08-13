// Controllers/ArticleController.js
import db from '../db.js';

// 📰 Lấy tất cả bài viết và tìm kiếm
export const getAllArticles = (req, res) => {
  const search = req.query.search?.toString().trim();

  let sql = 'SELECT * FROM bai_viet';
  const values = [];

  if (search) {
    sql += ' WHERE tieu_de LIKE ?';
    values.push(`%${search}%`);
  }

  sql += ' ORDER BY ngay_dang DESC';

  db.query(sql, values, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// 🧾 Lấy chi tiết bài viết theo ID
export const getArticleById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM bai_viet WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ error: 'Không tìm thấy bài viết' });
    res.json(results[0]);
  });
};

// ➕ Thêm bài viết
export const createArticle = (req, res) => {
  const { tieu_de, noi_dung, hinh_anh, ngay_dang } = req.body;
  const sql = 'INSERT INTO bai_viet (tieu_de, noi_dung, hinh_anh, ngay_dang) VALUES (?, ?, ?, ?)';
  db.query(sql, [tieu_de, noi_dung, hinh_anh, ngay_dang], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Thêm bài viết thành công', id: result.insertId });
  });
};

// ✏️ Sửa bài viết
export const updateArticle = (req, res) => {
  const { id } = req.params;
  const { tieu_de, noi_dung, hinh_anh, ngay_dang } = req.body;
  const sql = 'UPDATE bai_viet SET tieu_de=?, noi_dung=?, hinh_anh=?, ngay_dang=? WHERE id=?';
  db.query(sql, [tieu_de, noi_dung, hinh_anh, ngay_dang, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Cập nhật bài viết thành công' });
  });
};

// ❌ Xoá bài viết
export const deleteArticle = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM bai_viet WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Xoá bài viết thành công' });
  });
};
