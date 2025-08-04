import express from "express";
import db from "../db.js";
import { promisify } from "util";

const router = express.Router();

// Chuyển db.query thành hàm Promise để dùng await
const query = promisify(db.query).bind(db);

/* ========= 1. Thống kê theo ngày / tuần / tháng / quý / năm ========= */
router.get("/", async (req, res) => {
  try {
    const { type } = req.query;

    /* ----- Xác định GROUP BY & Label ----- */
    let groupBy  = "DATE(ngay_dat)";
    let labelSel = "DATE(ngay_dat) AS label";

    switch (type) {
      case "week":
        groupBy  = "YEARWEEK(ngay_dat,1)";
        labelSel = "CONCAT('Tuần ', YEARWEEK(ngay_dat,1)) AS label";
        break;
      case "month":
        groupBy  = "YEAR(ngay_dat), MONTH(ngay_dat)";
        labelSel = "CONCAT('Tháng ', MONTH(ngay_dat), '/', YEAR(ngay_dat)) AS label";
        break;
      case "quarter":
        groupBy  = "YEAR(ngay_dat), QUARTER(ngay_dat)";
        labelSel = "CONCAT('Q', QUARTER(ngay_dat), ' ', YEAR(ngay_dat)) AS label";
        break;
      case "year":
        groupBy  = "YEAR(ngay_dat)";
        labelSel = "YEAR(ngay_dat) AS label";
        break;
    }

    /* ----- Truy vấn ----- */
    const sql = `
      SELECT ${labelSel},
             SUM(tong_tien) AS doanh_thu
      FROM   don_hang
      WHERE  trang_thai = 'da_giao'
      GROUP  BY ${groupBy}
      ORDER  BY MIN(ngay_dat) ASC
    `;
    const rows = await query(sql);
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi thống kê:", err);
    res.status(500).json({ error: "Lỗi khi truy vấn thống kê." });
  }
});

/* ========= 2. Thống kê theo khoảng ngày tuỳ chọn ========= */
router.get("/custom", async (req, res) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) {
      return res.status(400).json({ error: "Thiếu 'from' hoặc 'to'." });
    }

    const sql = `
      SELECT DATE(ngay_dat) AS label,
             SUM(tong_tien) AS doanh_thu
      FROM   don_hang
      WHERE  trang_thai = 'da_giao'
        AND  DATE(ngay_dat) BETWEEN ? AND ?
      GROUP  BY DATE(ngay_dat)
      ORDER  BY DATE(ngay_dat) ASC
    `;
    const rows = await query(sql, [from, to]);
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi thống kê custom:", err);
    res.status(500).json({ error: "Lỗi khi truy vấn thống kê theo khoảng ngày." });
  }
});

export default router;
