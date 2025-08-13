import express from "express";
import { getStatisticSum } from "../Controllers/StatisticSumController.js";

const router = express.Router();

// GET tổng số liệu
router.get("/", getStatisticSum);

export default router;
