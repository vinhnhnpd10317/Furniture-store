import express from "express";
import { getOrderDetailById, cancelOrder } from "../Controllers/OrderDetailController.js";

const router = express.Router();

// Lấy chi tiết đơn hàng theo ID
router.get("/:id", getOrderDetailById);

// Hủy đơn hàng
router.put("/orders/:id/cancel", cancelOrder);

export default router;
