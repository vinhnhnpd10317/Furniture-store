import express from 'express';
const router = express.Router();
import db from '../db.js';

// lấy danh sách khách hàng
router.get('/', (req, res ) =>{
    db.query('SELECT * FROM nguoi_dung', (err, results)=>{
        if(err) return res.status(500).json({error: err});
        res.json(results);
    })
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