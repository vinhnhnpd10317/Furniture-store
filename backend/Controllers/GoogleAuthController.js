import db from '../db.js';

export const googleCallback = (req, res) => {
  console.log("GOOGLE USER:", req.user);

  const { displayName, emails } = req.user;
  const email = emails[0].value;

  const checkUserSql = 'SELECT * FROM nguoi_dung WHERE email = ?';
  db.query(checkUserSql, [email], (err, results) => {
    if (err) {
      console.error("Lỗi kiểm tra user:", err);
      return res.status(500).send("Lỗi máy chủ");
    }

    if (results.length === 0) {
      // Chưa có user → thêm mới
      const insertSql = `
        INSERT INTO nguoi_dung (ho_ten, email, mat_khau, so_dien_thoai, dia_chi, vai_tro, ngay_tao)
        VALUES (?, ?, '', '', '', 'user', NOW())
      `;
      db.query(insertSql, [displayName, email], (err) => {
        if (err) {
          console.error("Lỗi thêm user Google:", err);
          return res.status(500).send("Lỗi máy chủ");
        }
        res.redirect(`http://localhost:3000/login-success?email=${email}`);
      });
    } else {
      // Đã tồn tại user → redirect luôn
      res.redirect(`http://localhost:3000/login-success?email=${email}`);
    }
  });
};
