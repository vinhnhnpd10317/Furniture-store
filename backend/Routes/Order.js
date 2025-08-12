import express from 'express';
const router = express.Router();
import db from '../db.js';

// ==================== LẤY DANH SÁCH ĐƠN HÀNG (ADMIN) ====================
router.get('/', (req, res) => {
  const search = req.query.search?.toString().trim();
  let sql = 'SELECT * FROM don_hang';
  const values = [];

  if (search) {
    sql += ' WHERE nguoi_dung_id LIKE ? OR id LIKE ?';
    const likeSearch = `%${search}%`;
    values.push(likeSearch, likeSearch);
  }

  sql += ' ORDER BY ngay_dat DESC, id DESC';

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// ==================== LẤY ĐƠN HÀNG THEO ID ====================
router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ message: 'ID không hợp lệ' });

  db.query('SELECT * FROM don_hang WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    res.json(results[0]);
  });
});

// ==================== LẤY ĐƠN HÀNG THEO NGƯỜI DÙNG ====================
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  if (isNaN(userId)) return res.status(400).json({ message: 'ID không hợp lệ' });

  const sql = `
    SELECT DISTINCT id, ngay_dat, tong_tien, trang_thai
    FROM don_hang
    WHERE nguoi_dung_id = ?
    ORDER BY ngay_dat DESC, id DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Lỗi truy vấn DB", details: err });
    res.json(results);
  });
});

// ==================== TẠO ĐƠN HÀNG MỚI (KÈM THANH TOÁN) ====================
router.post('/', (req, res) => {
  const { nguoi_dung_id, ngay_dat, tong_tien, phuong_thuc_thanh_toan, trang_thai, ghi_chu } = req.body;

  const sqlDonHang = `
    INSERT INTO don_hang (nguoi_dung_id, ngay_dat, tong_tien, phuong_thuc_thanh_toan, trang_thai)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sqlDonHang, [nguoi_dung_id, ngay_dat, tong_tien, phuong_thuc_thanh_toan, trang_thai], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const donHangId = result.insertId;

    const sqlThanhToan = `
      INSERT INTO thanh_toan (don_hang_id, so_tien, phuong_thuc, ghi_chu)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sqlThanhToan, [donHangId, tong_tien, phuong_thuc_thanh_toan, ghi_chu || null], (err2) => {
      if (err2) return res.status(500).json({ error: err2 });

      res.status(201).json({
        message: 'Thêm đơn hàng và thanh toán thành công',
        id: donHangId
      });
    });
  });
});

// ==================== CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG ====================
router.put('/:id', (req, res) => {
  const { id } = req.params;
  let { trang_thai, trang_thai_thanh_toan } = req.body;

  const allowedStatuses = ["cho_xu_ly", "dang_xu_ly", "dang_van_chuyen", "da_giao", "da_huy"];

  if (!allowedStatuses.includes(trang_thai)) {
    return res.status(400).json({ message: 'Trạng thái không hợp lệ' });
  }

  // Nếu trạng thái là "đã giao" mà chưa truyền thanh toán => tự set
  if (trang_thai === "da_giao" && !trang_thai_thanh_toan) {
    trang_thai_thanh_toan = "da_thanh_toan";
  }

  db.query(
    'UPDATE don_hang SET trang_thai = ?, trang_thai_thanh_toan = ? WHERE id = ?',
    [trang_thai, trang_thai_thanh_toan || null, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Cập nhật trạng thái thành công' });
    }
  );
});

// ==================== XOÁ ĐƠN HÀNG ====================
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM don_hang WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Xóa đơn hàng thành công' });
  });
});

export default router;
