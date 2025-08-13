import db from "../db.js";

// Lấy danh sách sản phẩm và tìm kiếm
export const getProducts = (req, res) => {
    const { categoryId, search, minPrice, maxPrice } = req.query;
    let sql = 'SELECT * FROM san_pham';
    const values = [];
    const conditions = [];

    if (categoryId) {
        conditions.push('danh_muc_id = ?');
        values.push(categoryId);
    }
    if (minPrice) {
        conditions.push('gia >= ?');
        values.push(minPrice);
    }
    if (maxPrice) {
        conditions.push('gia <= ?');
        values.push(maxPrice);
    }
    if (search) {
        conditions.push('ten_san_pham LIKE ?');
        values.push(`%${search}%`);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' ORDER BY ngay_tao DESC';

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

// Lấy sản phẩm mới nhất
export const getLatestProducts = (req, res) => {
    const sql = 'SELECT * FROM san_pham ORDER BY ngay_tao DESC LIMIT 4';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi khi lấy sản phẩm mới nhất', err);
            return res.status(500).json({ error: "Lỗi server" });
        }
        res.json(result);
    });
};

// Thêm sản phẩm mới
export const createProduct = (req, res) => {
    const { ten_san_pham, vat_lieu, chat_lieu, mo_ta, gia, danh_muc_id, trang_thai_kho } = req.body;
    const hinh_anh_dai_dien = req.files?.['hinh_anh_dai_dien']?.[0]?.filename || '';
    const ds_hinh_anh_arr = req.files?.['ds_hinh_anh'] || [];
    const ds_hinh_anh = ds_hinh_anh_arr.map(file => file.filename).join(';');

    const now = new Date();
    const ngay_tao = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const query = `
        INSERT INTO san_pham 
        (ten_san_pham, vat_lieu, chat_lieu, mo_ta, gia, danh_muc_id, hinh_anh_dai_dien, ds_hinh_anh, ngay_tao, trang_thai_kho)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [ten_san_pham, vat_lieu, chat_lieu, mo_ta, gia, danh_muc_id, hinh_anh_dai_dien, ds_hinh_anh, ngay_tao, trang_thai_kho];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Lỗi query:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            id: result.insertId,
            ten_san_pham, vat_lieu, chat_lieu, mo_ta, gia, danh_muc_id,
            hinh_anh_dai_dien, ds_hinh_anh, ngay_tao
        });
    });
};

// Lấy sản phẩm theo ID
export const getProductById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM san_pham WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
        res.json(results[0]);
    });
};

// Cập nhật sản phẩm
export const updateProduct = (req, res) => {
    const { id } = req.params;
    const { ten_san_pham, vat_lieu, chat_lieu, mo_ta, gia, danh_muc_id, trang_thai_kho } = req.body;
    const hinh_anh_dai_dien = req.files?.['hinh_anh_dai_dien']?.[0]?.filename || null;
    const ds_hinh_anh_arr = req.files?.['ds_hinh_anh'] || [];
    const ds_hinh_anh = ds_hinh_anh_arr.map(file => file.filename).join(';');

    let query = `
        UPDATE san_pham SET 
        ten_san_pham = ?, vat_lieu = ?, chat_lieu = ?, mo_ta = ?, gia = ?, danh_muc_id = ?
    `;
    const values = [ten_san_pham, vat_lieu, chat_lieu, mo_ta, gia, danh_muc_id];

    if (hinh_anh_dai_dien) {
        query += `, hinh_anh_dai_dien = ?`;
        values.push(hinh_anh_dai_dien);
    }
    if (ds_hinh_anh) {
        query += `, ds_hinh_anh = ?`;
        values.push(ds_hinh_anh);
    }
    if (trang_thai_kho) {
        query += `, trang_thai_kho = ?`;
        values.push(trang_thai_kho);
    }

    query += ` WHERE id = ?`;
    values.push(id);

    db.query(query, values, (err) => {
        if (err) {
            console.error('Lỗi khi cập nhật sản phẩm:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Cập nhật sản phẩm thành công' });
    });
};

// Xóa sản phẩm
export const deleteProduct = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM san_pham WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error("Lỗi khi xoá sản phẩm:", err);
            return res.status(500).json({ error: "Lỗi server" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
        }
        res.json({ message: "Xoá sản phẩm thành công" });
    });
};

// Sản phẩm liên quan
export const getRelatedProducts = (req, res) => {
    const productId = parseInt(req.params.id);
    const { categoryId } = req.query;
    if (!categoryId) return res.status(400).json({ error: "Thiếu categoryId" });

    const sql = `
        SELECT * FROM san_pham 
        WHERE danh_muc_id = ? AND id != ?
        ORDER BY ngay_tao DESC 
        LIMIT 4
    `;
    db.query(sql, [categoryId, productId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

// Cập nhật trạng thái kho
export const updateStockStatus = (req, res) => {
    const { id } = req.params;
    const { trang_thai_kho } = req.body;
    const allowed = ['con_hang', 'het_hang'];
    if (!allowed.includes(trang_thai_kho)) {
        return res.status(400).json({ error: 'Trạng thái kho không hợp lệ' });
    }

    const query = `UPDATE san_pham SET trang_thai_kho = ? WHERE id = ?`;
    db.query(query, [trang_thai_kho, id], (err) => {
        if (err) {
            console.error('Lỗi khi cập nhật trạng thái kho:', err);
            return res.status(500).json({ error: 'Lỗi máy chủ' });
        }
        res.json({ message: 'Đã cập nhật trạng thái kho thành công' });
    });
};
