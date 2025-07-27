import express from 'express';
const router = express.Router();
import db from '../db.js';

// Lấy danh sách người dùng và tìm kiếm
router.get("/", (req, res) => {
    const search = req.query.search?.toString().trim();

    let sql = "SELECT * FROM nguoi_dung";
    const values = [];

    if (search) {
        sql += " WHERE ho_ten LIKE ? OR email LIKE ? OR so_dien_thoai LIKE ?";
        const likeSearch = `%${search}%`;
        values.push(likeSearch, likeSearch, likeSearch);
    }

    db.query(sql, values, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// thêm mới khách hàng
router.post('/', (req, res)=>{
    const{ho_ten, email, mat_khau, so_dien_thoai, dia_chi, vai_tro} = req.body;
    db.query('INSERT INTO nguoi_dung (ho_ten, email, mat_khau, so_dien_thoai, dia_chi, vai_tro) VALUES (?, ?, ?, ?, ?, ?)', 
        [ho_ten, email, mat_khau, so_dien_thoai, dia_chi, vai_tro],
        (err, result)=>{
            if(err) return res.status(500).json({error: err});
            res.json({message: 'Thêm người dùng thành công', id: result.insertId});
        }
    );
});

// Lấy thông tin khách hàng theo ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM nguoi_dung WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        res.json(results[0]);
    });
});

// sửa khách hàng
router.put('/:id', (req, res)=>{
    const {id} = req.params;
    const {ho_ten, email, mat_khau, so_dien_thoai, dia_chi, vai_tro} = req.body;
    db.query('UPDATE nguoi_dung SET ho_ten = ?, email = ?, mat_khau = ?, so_dien_thoai = ?, dia_chi = ?, vai_tro = ? WHERE id = ?', 
        [ho_ten, email, mat_khau, so_dien_thoai, dia_chi, vai_tro, id],
        (err) =>{
            if(err) return res.status(500).json({error: err});
            res.json({message: 'Cập nhật thành công!'});
        }
    );
});

// xoá khách hàng
router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    db.query('DELETE FROM nguoi_dung WHERE id = ?', [id], 
        (err) =>{
            if(err) return res.status(500).json({error: err});
            res.json({message: 'Xoá người dùng thành công!'});
        });
});

export default router;