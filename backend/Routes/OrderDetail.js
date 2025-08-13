import express from "express";

import { getOrderDetailById, cancelOrder } from "../Controllers/OrderDetailController.js";

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
            dh.phuong_thuc_thanh_toan,
            dh.trang_thai_thanh_toan,
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


const router = express.Router();

router.get("/:id", getOrderDetailById);
router.put("/orders/:id/cancel", cancelOrder);

export default router;
