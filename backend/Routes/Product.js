import express from 'express';
import db from '../db.js';

const router = express.Router();

// Lấy tất cả sản phẩm
// router.get('/', (req, res) => {
//     db.query('SELECT * FROM san_pham', (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json(result);
//     });
// });


// GET /products => tất cả sản phẩm hoặc theo danh mục
router.get('/', (req, res) => {
    const { categoryId } = req.query;

    let sql = 'SELECT * FROM san_pham';
    const params = [];

    if (categoryId) {
        sql += ' WHERE danh_muc_id = ?';
        params.push(categoryId);
    }

    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Thêm sản phẩm mới
router.post('/', (req, res) => {
    const { ten_san_pham, vat_lieu, chat_lieu, mo_ta, gia, danh_muc_id } = req.body;

    const hinh_anh_dai_dien = req.files?.['hinh_anh_dai_dien']?.[0]?.filename || '';

    const ds_hinh_anh_arr = req.files?.['ds_hinh_anh'] || [];
    const ds_hinh_anh = ds_hinh_anh_arr.map(file => file.filename).join(';'); // VD: "anh1.jpg;anh2.jpg"

    const now = new Date();
    const ngay_tao = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const query = `
        INSERT INTO san_pham 
        (ten_san_pham, vat_lieu, chat_lieu, mo_ta, gia, danh_muc_id, hinh_anh_dai_dien, ds_hinh_anh, ngay_tao)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [ten_san_pham, vat_lieu, chat_lieu, mo_ta, gia, danh_muc_id, hinh_anh_dai_dien, ds_hinh_anh, ngay_tao];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Lỗi query:', err);
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            id: result.insertId,
            ten_san_pham, vat_lieu, chat_lieu, mo_ta, gia, danh_muc_id,
            hinh_anh_dai_dien,
            ds_hinh_anh,
            ngay_tao
        });
    });
});

export default router;