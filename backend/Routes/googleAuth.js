import express from 'express';
import passport from 'passport';
import db from '../db.js'; // ← Nhớ import kết nối DB nếu chưa

const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false
  }),
  async (req, res) => {
    console.log("GOOGLE USER:", req.user);

    const { displayName, emails } = req.user;
    const email = emails[0].value;

    try {
      // Kiểm tra xem user đã tồn tại trong DB chưa
      const checkUserSql = 'SELECT * FROM nguoi_dung WHERE email = ?';
      db.query(checkUserSql, [email], (err, results) => {
        if (err) {
          console.error("Lỗi kiểm tra user:", err);
          return res.status(500).send("Lỗi máy chủ");
        }

        if (results.length === 0) {
          // Nếu chưa có → thêm mới vào DB
          const insertSql = `
            INSERT INTO nguoi_dung (ho_ten, email, mat_khau, so_dien_thoai, dia_chi, vai_tro, ngay_tao)
            VALUES (?, ?, '', '', '', 'user', NOW())
          `;
          db.query(insertSql, [displayName, email], (err) => {
            if (err) {
              console.error("Lỗi thêm user Google:", err);
              return res.status(500).send("Lỗi máy chủ");
            }

            // Sau khi thêm xong → redirect về frontend
            res.redirect(`http://localhost:3000/login-success?email=${email}`);
          });
        } else {
          // Nếu đã tồn tại → redirect luôn
          res.redirect(`http://localhost:3000/login-success?email=${email}`);
        }
      });
    } catch (error) {
      console.error("Lỗi callback Google:", error);
      res.redirect('/');
    }
  }
);

export default router;
