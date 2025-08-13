import express from "express";
import { createPayment, callbackVnpay, ipnVnpay } from "../Controllers/VnpayController.js";

const router = express.Router();

// Tạo URL thanh toán
router.post("/create_payment", createPayment);

// Xử lý Return URL
router.get("/api/payment/callback-vnpay", callbackVnpay);

// Xử lý IPN
router.get("/vnpay_ipn", ipnVnpay);

export default router;
