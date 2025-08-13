import db from '../db.js';
import bcrypt from 'bcrypt';

export const getAllCustomers = (req, res) => {
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
};

export const getCustomerById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM nguoi_dung WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        res.json(results[0]);
    });
};

export const updateCustomer = (req, res) => {
    const { id } = req.params;
    const { ho_ten, email, mat_khau, so_dien_thoai, dia_chi, vai_tro } = req.body;
    db.query(
        'UPDATE nguoi_dung SET ho_ten = ?, email = ?, mat_khau = ?, so_dien_thoai = ?, dia_chi = ?, vai_tro = ? WHERE id = ?',
        [ho_ten, email, mat_khau, so_dien_thoai, dia_chi, vai_tro, id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Cập nhật thành công!' });
        }
    );
};

export const deleteCustomer = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM nguoi_dung WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Xoá người dùng thành công!' });
    });
};

export const changePassword = (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    db.query('SELECT * FROM nguoi_dung WHERE id = ?', [id], async (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

        const user = results[0];

        if (user.is_google_user || !user.mat_khau) {
            const hashedNewPassword = await bcrypt.hash(newPassword, 12);
            db.query(
                'UPDATE nguoi_dung SET mat_khau = ?, is_google_user = ? WHERE id = ?',
                [hashedNewPassword, false, id],
                (updateErr) => {
                    if (updateErr) return res.status(500).json({ error: updateErr });
                    res.json({ message: 'Đổi mật khẩu thành công' });
                }
            );
        } else {
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
        }
    });
};

export const addCustomer = async (req, res) => {
    const { ho_ten, email, mat_khau, so_dien_thoai, dia_chi, vai_tro } = req.body;
    try {
        db.query('SELECT * FROM nguoi_dung WHERE email = ?', [email], async (err, results) => {
            if (err) return res.status(500).json({ error: 'Lỗi truy vấn CSDL' });
            if (results.length > 0) {
                return res.status(400).json({ message: 'Email đã được sử dụng' });
            }

            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(mat_khau, saltRounds);

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
};

export const login = (req, res) => {
    const { email, mat_khau } = req.body;
    db.query('SELECT * FROM nguoi_dung WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Lỗi truy vấn CSDL' });
        if (results.length === 0) {
            return res.status(401).json({ message: 'Email không tồn tại' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }

        delete user.mat_khau;
        res.json(user);
    });
};

export const googleLogin = (req, res) => {
    const { name, email } = req.body;

    const checkUserSql = 'SELECT * FROM nguoi_dung WHERE email = ?';
    db.query(checkUserSql, [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Lỗi máy chủ" });

        if (results.length === 0) {
            const insertSql = `
                INSERT INTO nguoi_dung (ho_ten, email, mat_khau, so_dien_thoai, dia_chi, vai_tro, ngay_tao, is_google_user)
                VALUES (?, ?, '', '', '', 'khach_hang', NOW(), ?)
            `;
            db.query(insertSql, [name, email, true], (err) => {
                if (err) return res.status(500).json({ message: "Lỗi máy chủ" });

                db.query('SELECT * FROM nguoi_dung WHERE email = ?', [email], (err, newUser) => {
                    if (err) return res.status(500).json({ message: "Lỗi máy chủ sau khi thêm" });
                    const user = newUser[0];
                    delete user.mat_khau;
                    res.json(user);
                });
            });
        } else {
            const user = results[0];
            delete user.mat_khau;
            res.json(user);
        }
    });
};
