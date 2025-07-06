// routes/category.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// Lấy tất cả danh mục
router.get('/', (req, res) => {
    db.query('SELECT * FROM danh_muc', (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

// Thêm danh mục
router.post('/', (req, res) => {
    const { ten_danh_muc, mo_ta } = req.body;
    const now = new Date();
    const ngay_tao = now.toISOString().slice(0, 19).replace('T', ' ');

    const sql = 'INSERT INTO danh_muc (ten_danh_muc, mo_ta, ngay_tao) VALUES (?, ?, ?)';
    db.query(sql, [ten_danh_muc, mo_ta, ngay_tao], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId });
    });
});

// Cập nhật danh mục
router.put('/:id', (req, res) => {
    const { ten_danh_muc, mo_ta } = req.body;
    const sql = 'UPDATE danh_muc SET ten_danh_muc = ?, mo_ta = ? WHERE id = ?';
    db.query(sql, [ten_danh_muc, mo_ta, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.sendStatus(200);
    });
});

// Xoá danh mục
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM danh_muc WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.sendStatus(200);
    });
});

router.get('/', (req, res) => {
    const search = req.query.search?.toString().trim();

    let sql = 'SELECT * FROM danh_muc';
    const values = [];

    if (search) {
        sql += ' WHERE ten_danh_muc LIKE ? OR mo_ta LIKE ?';
        const likeSearch = `%${search}%`;
        values.push(likeSearch, likeSearch);
    }

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

export default router;
