// routes/product.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// Lấy tất cả sản phẩm
router.get('/', (req, res) => {
    db.query('SELECT * FROM san_pham', (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

export default router;
