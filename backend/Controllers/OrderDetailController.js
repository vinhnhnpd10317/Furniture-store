import db from "../db.js";

// Lấy chi tiết đơn hàng theo ID
export const getOrderDetailById = (req, res) => {
    const orderId = req.params.id;

    const query = `
        SELECT 
            dh.id,
            dh.ngay_dat,
            dh.trang_thai,
            dh.tong_tien,
            dh.phuong_thuc_thanh_toan,
            dh.ghi_chu,
            nd.ho_ten,
            nd.email,
            nd.so_dien_thoai,
            nd.dia_chi
        FROM don_hang dh
        JOIN nguoi_dung nd ON dh.nguoi_dung_id = nd.id
        WHERE dh.id = ?
    `;

    db.query(query, [orderId], (err, orderResult) => {
        if (err) {
            console.error("❌ Lỗi lấy đơn hàng:", err);
            return res.status(500).json({ message: "Lỗi server" });
        }

        if (orderResult.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }

        const order = orderResult[0];

        const detailQuery = `
            SELECT 
                ct.*, 
                sp.ten_san_pham, 
                sp.hinh_anh_dai_dien AS hinh_anh
            FROM chi_tiet_don_hang ct
            JOIN san_pham sp ON ct.san_pham_id = sp.id
            WHERE ct.don_hang_id = ?
        `;

        db.query(detailQuery, [orderId], (err, detailResult) => {
            if (err) {
                console.error("❌ Lỗi lấy chi tiết đơn hàng:", err);
                return res.status(500).json({ message: "Lỗi server" });
            }

            res.json({
                ...order,
                chi_tiet: detailResult
            });
        });
    });
};

// Hủy đơn hàng nếu trạng thái là "cho_xu_ly"
export const cancelOrder = (req, res) => {
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
};
