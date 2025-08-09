import express from "express";
const router = express.Router();
import db from "../db.js";

// GET chi tiết đơn hàng theo ID
router.get('/:id', (req, res) => {
    const orderId = req.params.id; // Lấy id đơn hàng từ URL

    // Câu truy vấn lấy thông tin đơn hàng và người dùng đã đặt
    const query = `
        SELECT 
            dh.id,                 -- ID đơn hàng
            dh.ngay_dat,          -- Ngày đặt hàng
            dh.trang_thai,        -- Trạng thái đơn hàng
            dh.tong_tien,         -- Tổng tiền đơn hàng
            dh.ghi_chu,           -- Ghi chú
            nd.ho_ten,            -- Họ tên người đặt
            nd.email,             -- Email người đặt
            nd.so_dien_thoai,     -- Số điện thoại người đặt
            nd.dia_chi            -- Địa chỉ người đặt
        FROM don_hang dh
        JOIN nguoi_dung nd ON dh.nguoi_dung_id = nd.id -- Liên kết với bảng người dùng
        WHERE dh.id = ?                                -- Điều kiện lọc theo id đơn hàng
    `;

    // Thực thi truy vấn đầu tiên để lấy thông tin đơn hàng
    db.query(query, [orderId], (err, orderResult) => {
        if (err) {
            console.error("❌ Lỗi lấy đơn hàng:", err);
            return res.status(500).json({ message: "Lỗi server" }); // Trả về lỗi nếu có
        }

        // Kiểm tra nếu không tìm thấy đơn hàng
        if (orderResult.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }

        const order = orderResult[0]; // Lấy thông tin đơn hàng duy nhất

        // Truy vấn chi tiết sản phẩm trong đơn hàng
        const detailQuery = `
    SELECT 
        ct.*, 
        sp.ten_san_pham, 
        sp.hinh_anh_dai_dien AS hinh_anh
    FROM chi_tiet_don_hang ct
    JOIN san_pham sp ON ct.san_pham_id = sp.id
    WHERE ct.don_hang_id = ?
`;

        // Thực thi truy vấn chi tiết đơn hàng
        db.query(detailQuery, [orderId], (err, detailResult) => {
            if (err) {
                console.error("❌ Lỗi lấy chi tiết đơn hàng:", err);
                return res.status(500).json({ message: "Lỗi server" });
            }

            // Trả về kết quả gồm:
            // - Thông tin đơn hàng
            // - Mảng chi tiết sản phẩm
            res.json({
                ...order,
                chi_tiet: detailResult
            });
        });
    });
});

// Huỷ đơn hàng nếu trạng thái là "cho_xu_ly"
router.put('/orders/:id/cancel', (req, res) => {
    const { id } = req.params;

    const checkSql = `SELECT trang_thai FROM don_hang WHERE id = ?`;
    db.query(checkSql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Lỗi truy vấn' });

        if (result.length === 0)
        return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });

        const currentStatus = result[0].trang_thai;
        if (currentStatus !== 'cho_xu_ly') {
        return res.status(400).json({ error: 'Đơn hàng không thể huỷ' });
        }

        const updateSql = `UPDATE don_hang SET trang_thai = 'da_huy' WHERE id = ?`;
        db.query(updateSql, [id], (err2) => {
        if (err2) return res.status(500).json({ error: 'Không thể cập nhật trạng thái' });
        res.json({ message: 'Huỷ đơn hàng thành công' });
        });
    });
});

export default router;
