import express from 'express';
import {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
  updateOrderStatus,
  deleteOrder
} from '../Controllers/OrderController.js';


const router = express.Router();

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


router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.get('/user/:id', getOrdersByUserId);
router.post('/', createOrder);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

export default router;
