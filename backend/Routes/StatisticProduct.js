import express from "express";
import { 
  getProductStatistics, 
  getProductStatisticsByRange, 
  getBestSellingProducts 
} from "../Controllers/StatisticProductController.js";

const router = express.Router();

// GET thống kê số lượng hàng bán được
router.get("/", getProductStatistics);

// GET thống kê theo khoảng ngày
router.get("/by-range", getProductStatisticsByRange);

// GET sản phẩm bán chạy nhất
router.get("/best", getBestSellingProducts);

export default router;
