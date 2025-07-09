import express from 'express';
const router = express.Router();
import db from '../db.js';

// Lấy tất cả đơn hàng và tim kiếm đơn hàng
router.get('/', (req, res) => {
    const search = req.query.search?.toString().trim();

    let sql = 'SELECT * FROM don_hang';
    const values = [];

    if (search) {
        sql += ' WHERE nguoi_dung_id LIKE ? OR id LIKE ?';
        const likeSearch = `%${search}%`;
        values.push(likeSearch, likeSearch);
    }

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});


// Lấy đơn hàng theo ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM don_hang WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        res.json(results[0]);
    });
});

// Tạo đơn hàng mới
router.post('/', (req, res) => {
    const { nguoi_dung_id, ngay_dat, tong_tien, phuong_thuc_thanh_toan, trang_thai } = req.body;
    const sql = `INSERT INTO don_hang 
                (nguoi_dung_id, ngay_dat, tong_tien, phuong_thuc_thanh_toan, trang_thai) 
                VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [nguoi_dung_id, ngay_dat, tong_tien, phuong_thuc_thanh_toan, trang_thai], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Thêm đơn hàng thành công', id: result.insertId });
    });
});

// Cập nhật trạng thái đơn hàng
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { trang_thai } = req.body;
    db.query('UPDATE don_hang SET trang_thai = ? WHERE id = ?', [trang_thai, id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Cập nhật trạng thái thành công' });
    });
});

// Xóa đơn hàng
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM don_hang WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Xóa đơn hàng thành công' });
    });
});

export default router;
