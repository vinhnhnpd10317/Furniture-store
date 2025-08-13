import express from "express";
import { getStatistics, getCustomStatistics } from "../Controllers/StatisticController.js";

const router = express.Router();

// GET thống kê theo loại (day/week/month/quarter/year)
router.get("/", getStatistics);

// GET thống kê theo khoảng ngày tùy chọn
router.get("/custom", getCustomStatistics);

export default router;
