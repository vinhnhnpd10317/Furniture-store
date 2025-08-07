import express from 'express';
import bcrypt from 'bcrypt';
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

// Đổi mật khẩu (kiểm tra mật khẩu hiện tại với bcrypt)
router.post('/:id/change-password', (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    db.query('SELECT * FROM nguoi_dung WHERE id = ?', [id], async (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

        const user = results[0];

        const isMatch = await bcrypt.compare(currentPassword, user.mat_khau);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mật khẩu hiện tại không đúng' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        db.query(
            'UPDATE nguoi_dung SET mat_khau = ? WHERE id = ?',
            [hashedNewPassword, id],
            (updateErr) => {
                if (updateErr) return res.status(500).json({ error: updateErr });
                res.json({ message: 'Đổi mật khẩu thành công' });
            }
        );
    });
});


// Thêm mới khách hàng (kiểm tra email, mã hóa mật khẩu với saltRounds = 12)
router.post('/', async (req, res) => {
    const { ho_ten, email, mat_khau, so_dien_thoai, dia_chi, vai_tro } = req.body;

    try {
        // Kiểm tra email đã tồn tại chưa
        db.query('SELECT * FROM nguoi_dung WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Lỗi truy vấn CSDL' });

        if (results.length > 0) {
            return res.status(400).json({ message: 'Email đã được sử dụng' });
        }

        // Mã hóa mật khẩu với saltRounds = 12
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(mat_khau, saltRounds);

        // Thêm người dùng vào DB
        db.query(
            'INSERT INTO nguoi_dung (ho_ten, email, mat_khau, so_dien_thoai, dia_chi, vai_tro, ngay_tao) VALUES (?, ?, ?, ?, ?, ?, NOW())',
            [ho_ten, email, hashedPassword, so_dien_thoai, dia_chi, vai_tro || 'khach_hang'],
            (insertErr, result) => {
            if (insertErr) return res.status(500).json({ error: insertErr });
            res.status(201).json({ message: 'Đăng ký thành công!', id: result.insertId });
            }
        );
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ', error });
    }
});

// Đăng nhập người dùng
router.post('/login', (req, res) => {
  const { email, mat_khau } = req.body;

  db.query('SELECT * FROM nguoi_dung WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi truy vấn CSDL' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Email không tồn tại' });
    }

    const user = results[0];

    // So sánh mật khẩu với mật khẩu đã mã hóa
    const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }

    // Xóa mật khẩu khỏi kết quả trả về
    delete user.mat_khau;

    res.json(user); // Gửi thông tin người dùng (trừ mật khẩu)
  });
});

router.post('/google-login', (req, res) => {
    const { id, name, email, picture } = req.body;

    const checkUserSql = 'SELECT * FROM nguoi_dung WHERE email = ?';
    db.query(checkUserSql, [email], (err, results) => {
        if (err) {
            console.error("Lỗi kiểm tra user:", err);
            return res.status(500).json({ message: "Lỗi máy chủ" });
        }

        if (results.length === 0) {
            // Nếu user chưa tồn tại → thêm mới
            const insertSql = `
                INSERT INTO nguoi_dung (ho_ten, email, mat_khau, so_dien_thoai, dia_chi, vai_tro, ngay_tao)
                VALUES (?, ?, '', '', '', 'khach_hang', NOW())
            `;
            db.query(insertSql, [name, email], (err, result) => {
                if (err) {
                    console.error("Lỗi thêm user Google:", err);
                    return res.status(500).json({ message: "Lỗi máy chủ" });
                }

                // Lấy thông tin user vừa thêm
                db.query('SELECT * FROM nguoi_dung WHERE email = ?', [email], (err, newUser) => {
                    if (err) return res.status(500).json({ message: "Lỗi máy chủ sau khi thêm" });
                    const user = newUser[0];
                    delete user.mat_khau; // Xóa mật khẩu khỏi response
                    res.json(user);
                });
            });
        } else {
            // User đã tồn tại → trả về thông tin
            const user = results[0];
            delete user.mat_khau; // Xóa mật khẩu khỏi response
            res.json(user);
        }
    });
});

export default router;