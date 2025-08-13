// Controllers/CategoryController.js
import db from '../db.js';

// Lấy tất cả danh mục và tìm kiếm
export const getAllCategories = (req, res) => {
    const search = req.query.search?.toString().trim();
    let sql = 'SELECT * FROM danh_muc';
    const values = [];

    if (search) {
        sql += ' WHERE ten_danh_muc LIKE ? OR mo_ta LIKE ?';
        const likeSearch = `%${search}%`;
        values.push(likeSearch, likeSearch);
    }

    sql += ' ORDER BY ngay_tao DESC';

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

// Thêm danh mục
export const createCategory = (req, res) => {
    const { ten_danh_muc, mo_ta } = req.body;
    const now = new Date();
    const ngay_tao = now.toISOString().slice(0, 19).replace('T', ' ');

    const sql = 'INSERT INTO danh_muc (ten_danh_muc, mo_ta, ngay_tao) VALUES (?, ?, ?)';
    db.query(sql, [ten_danh_muc, mo_ta, ngay_tao], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId });
    });
};

// Cập nhật danh mục
export const updateCategory = (req, res) => {
    const { ten_danh_muc, mo_ta } = req.body;
    const sql = 'UPDATE danh_muc SET ten_danh_muc = ?, mo_ta = ? WHERE id = ?';
    db.query(sql, [ten_danh_muc, mo_ta, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.sendStatus(200);
    });
};

// Xoá danh mục
export const deleteCategory = (req, res) => {
    const sql = 'DELETE FROM danh_muc WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.sendStatus(200);
    });
};
