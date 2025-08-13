import express from "express";
import { getOrderDetailById, cancelOrder } from "../Controllers/OrderDetailController.js";

const router = express.Router();

router.get("/:id", getOrderDetailById);
router.put("/orders/:id/cancel", cancelOrder);

export default router;
