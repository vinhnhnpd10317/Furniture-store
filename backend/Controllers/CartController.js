// Controllers/CartController.js
import db from '../db.js';

/* API NGƯỜI DÙNG*/

// Lấy giỏ hàng theo user
export const getCartByUser = (req, res) => {
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
};

// Thêm sản phẩm vào giỏ
export const addToCart = (req, res) => {
  const { nguoi_dung_id, san_pham_id, so_luong } = req.body;
  const checkSql = `SELECT * FROM gio_hang WHERE nguoi_dung_id = ? AND san_pham_id = ?`;

  db.query(checkSql, [nguoi_dung_id, san_pham_id], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length > 0) {
      const newQty = results[0].so_luong + so_luong;
      const updateSql = `UPDATE gio_hang SET so_luong = ? WHERE nguoi_dung_id = ? AND san_pham_id = ?`;
      db.query(updateSql, [newQty, nguoi_dung_id, san_pham_id], err => {
        if (err) return res.status(500).json({ error: err });
        return res.json({ message: 'Cập nhật số lượng thành công' });
      });
    } else {
      const insertSql = `INSERT INTO gio_hang (nguoi_dung_id, san_pham_id, so_luong) VALUES (?, ?, ?)`;
      db.query(insertSql, [nguoi_dung_id, san_pham_id, so_luong], err => {
        if (err) return res.status(500).json({ error: err });
        return res.json({ message: 'Thêm vào giỏ hàng thành công' });
      });
    }
  });
};

// Cập nhật số lượng
export const updateCartItem = (req, res) => {
  const { id } = req.params;
  const { so_luong } = req.body;
  const sql = `UPDATE gio_hang SET so_luong = ? WHERE id = ?`;
  db.query(sql, [so_luong, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Cập nhật giỏ hàng thành công' });
  });
};

// Xoá sản phẩm khỏi giỏ
export const deleteCartItem = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM gio_hang WHERE id = ?`;
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Xoá khỏi giỏ hàng thành công' });
  });
};


/*API ADMIN*/

// Lấy toàn bộ giỏ hàng của tất cả người dùng
export const getAllCartsAdmin = (req, res) => {
  const sql = `
    SELECT 
      gh.id AS gio_hang_id,
      gh.nguoi_dung_id,
      nd.ho_ten,
      sp.ten_san_pham,
      gh.so_luong,
      sp.gia,
      (gh.so_luong * sp.gia) AS thanh_tien
    FROM gio_hang gh
    JOIN nguoi_dung nd ON gh.nguoi_dung_id = nd.id
    JOIN san_pham sp ON gh.san_pham_id = sp.id
    ORDER BY gh.nguoi_dung_id ASC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy giỏ hàng admin:", err);
      return res.status(500).json({ message: 'Lỗi server' });
    }
    res.json(results);
  });
};

// Xoá mục giỏ hàng (admin)
export const deleteCartAdmin = (req, res) => {
  const { cartId } = req.params;
  const sql = `DELETE FROM gio_hang WHERE id = ?`;
  db.query(sql, [cartId], (err, result) => {
    if (err) {
      console.error("Lỗi khi xóa mục giỏ hàng:", err);
      return res.status(500).json({ message: 'Lỗi server' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy mục giỏ hàng' });
    }
    res.json({ message: 'Đã xoá mục giỏ hàng thành công' });
  });
};
