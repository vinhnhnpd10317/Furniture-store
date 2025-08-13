import db from "../db.js";
import { promisify } from "util";

const query = promisify(db.query).bind(db);

// 1. Thống kê số lượng hàng bán được theo ngày, tuần, tháng, quý, năm
export const getProductStatistics = async (req, res) => {
  const { type, from, to } = req.query;
  let groupByClause = "";
  let dateFilter = "";

  try {
    if (from && to) {
      dateFilter = `WHERE dh.ngay_dat BETWEEN '${from}' AND '${to}'`;
    }

    switch (type) {
      case "day":
        groupByClause = "DATE(dh.ngay_dat)";
        break;
      case "week":
        groupByClause = "YEAR(dh.ngay_dat), WEEK(dh.ngay_dat)";
        break;
      case "month":
        groupByClause = "YEAR(dh.ngay_dat), MONTH(dh.ngay_dat)";
        break;
      case "quarter":
        groupByClause = "YEAR(dh.ngay_dat), QUARTER(dh.ngay_dat)";
        break;
      case "year":
        groupByClause = "YEAR(dh.ngay_dat)";
        break;
      default:
        return res.status(400).json({ error: "Type không hợp lệ" });
    }

    const sql = `
      SELECT 
        ${groupByClause} AS thoi_gian,
        SUM(ct.so_luong) AS tong_so_luong_ban
      FROM chi_tiet_don_hang ct
      JOIN don_hang dh ON ct.don_hang_id = dh.id
      ${dateFilter}
      GROUP BY ${groupByClause}
      ORDER BY dh.ngay_dat ASC
    `;

    const result = await query(sql);
    res.json(result);
  } catch (err) {
    console.error("Lỗi thống kê:", err);
    res.status(500).json({ error: "Lỗi khi thống kê dữ liệu." });
  }
};

// 2. Thống kê theo khoảng ngày tùy chọn
export const getProductStatisticsByRange = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: "Thiếu ngày bắt đầu hoặc kết thúc." });
    }

    const sql = `
      SELECT DATE(dh.ngay_dat) AS date, SUM(ctdh.so_luong) AS total_quantity
      FROM don_hang dh
      JOIN chi_tiet_don_hang ctdh ON dh.id = ctdh.don_hang_id
      WHERE dh.ngay_dat BETWEEN ? AND ?
      GROUP BY DATE(dh.ngay_dat)
      ORDER BY DATE(dh.ngay_dat)
    `;

    const data = await query(sql, [from, to]);

    res.json(data);
  } catch (error) {
    console.error("Lỗi truy vấn thống kê theo khoảng ngày:", error);
    res.status(500).json({ error: "Lỗi truy vấn thống kê." });
  }
};

// 3. Thống kê sản phẩm bán chạy nhất trong ngày, tuần, tháng, quý, năm
export const getBestSellingProducts = async (req, res) => {
  try {
    const { type } = req.query;
    let startDate;

    const today = new Date();
    switch (type) {
      case "day":
        startDate = new Date(today.setHours(0, 0, 0, 0));
        break;
      case "week":
        const firstDayOfWeek = today.getDate() - today.getDay();
        startDate = new Date(today.setDate(firstDayOfWeek));
        startDate.setHours(0, 0, 0, 0);
        break;
      case "month":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case "quarter":
        const quarter = Math.floor(today.getMonth() / 3);
        startDate = new Date(today.getFullYear(), quarter * 3, 1);
        break;
      case "year":
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      default:
        return res.status(400).json({ error: "Invalid type" });
    }

    const sql = `
      SELECT 
        ct.san_pham_id,
        sp.ten_san_pham,
        SUM(ct.so_luong) AS tong_ban
      FROM chi_tiet_don_hang ct
      JOIN don_hang dh ON ct.don_hang_id = dh.id
      JOIN san_pham sp ON ct.san_pham_id = sp.id
      WHERE dh.ngay_dat >= ?
      GROUP BY ct.san_pham_id
      ORDER BY tong_ban DESC
      LIMIT 3
    `;
    const data = await query(sql, [startDate]);

    res.json(data);
  } catch (error) {
    console.error("Lỗi thống kê sản phẩm bán chạy:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
