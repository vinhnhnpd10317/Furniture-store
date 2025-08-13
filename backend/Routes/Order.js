// backend/Routes/Order.js
import express from 'express';
import {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
  updateOrderStatus,
  deleteOrder
} from '../Controllers/OrderController.js';

const router = express.Router();

// Routes
router.get('/', getAllOrders);             // Lấy tất cả đơn hàng
router.get('/:id', getOrderById);          // Lấy đơn hàng theo ID
router.get('/user/:id', getOrdersByUserId);// Lấy đơn hàng theo người dùng
router.post('/', createOrder);             // Tạo đơn hàng
router.put('/:id', updateOrderStatus);     // Cập nhật trạng thái
router.delete('/:id', deleteOrder);        // Xóa đơn hàng

export default router;
