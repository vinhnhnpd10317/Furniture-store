// Controllers/CheckOutController.js
import db from '../db.js';

export const createOrderWithDetails = (req, res) => {
    const {
        nguoi_dung_id,
        ngay_dat,
        tong_tien,
        phuong_thuc_thanh_toan,
        trang_thai,
        ghi_chu,
        chi_tiet_don_hang
    } = req.body;

    if (!Array.isArray(chi_tiet_don_hang) || chi_tiet_don_hang.length === 0) {
        return res.status(400).json({ error: 'Thiếu chi tiết đơn hàng' });
    }

    // 1. Thêm đơn hàng
    const insertOrderQuery = `
        INSERT INTO don_hang
        (nguoi_dung_id, ngay_dat, tong_tien, phuong_thuc_thanh_toan, trang_thai, ghi_chu)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const orderValues = [
        nguoi_dung_id,
        ngay_dat,
        tong_tien,
        phuong_thuc_thanh_toan,
        trang_thai,
        ghi_chu || ''
    ];

    db.query(insertOrderQuery, orderValues, (err, result) => {
        if (err) {
            console.error('❌ Lỗi tạo đơn hàng:', err);
            return res.status(500).json({ error: 'Không thể tạo đơn hàng', details: err });
        }

        const don_hang_id = result.insertId;

        // 2. Thêm chi tiết đơn hàng
        const chiTietQuery = `
            INSERT INTO chi_tiet_don_hang (don_hang_id, san_pham_id, so_luong, don_gia)
            VALUES ?
        `;

        const chiTietValues = chi_tiet_don_hang.map((item) => [
            don_hang_id,
            item.san_pham_id,
            item.so_luong,
            item.don_gia
        ]);

        db.query(chiTietQuery, [chiTietValues], (err2) => {
            if (err2) {
                console.error('❌ Lỗi khi thêm chi tiết đơn hàng:', err2);
                return res.status(500).json({ error: 'Lỗi khi thêm chi tiết đơn hàng', details: err2 });
            }

            res.json({ don_hang_id });
        });
    });
};
