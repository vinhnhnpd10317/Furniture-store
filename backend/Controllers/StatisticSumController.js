import db from "../db.js";
import { promisify } from "util";

const query = promisify(db.query).bind(db);

// Lấy tổng số liệu (đơn hàng, doanh thu, khách hàng, sản phẩm)
export const getStatisticSum = async (req, res) => {
  try {
    // 1. Tổng đơn hàng
    const [totalOrderRow] = await query(
      "SELECT COUNT(*) AS totalOrders FROM don_hang"
    );

    // 2. Tổng doanh thu
    const [totalRevenueRow] = await query(
      "SELECT SUM(tong_tien) AS totalRevenue FROM don_hang WHERE trang_thai = 'da_giao'"
    );

    // 3. Tổng khách hàng
    const [totalCustomerRow] = await query(
      "SELECT COUNT(*) AS totalCustomers FROM nguoi_dung WHERE vai_tro = 'khach_hang'"
    );

    // 4. Tổng sản phẩm
    const [totalProductRow] = await query(
      "SELECT COUNT(*) AS totalProducts FROM san_pham"
    );

    // Gửi phản hồi
    res.json({
      totalOrders: totalOrderRow.totalOrders || 0,
      totalRevenue: totalRevenueRow.totalRevenue || 0,
      totalCustomers: totalCustomerRow.totalCustomers || 0,
      totalProducts: totalProductRow.totalProducts || 0,
    });
  } catch (err) {
    console.error("Lỗi thống kê tổng:", err);
    res.status(500).json({ error: "Lỗi server khi lấy thống kê tổng" });
  }
};
