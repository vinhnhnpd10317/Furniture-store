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

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.get('/user/:id', getOrdersByUserId);
router.post('/', createOrder);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

export default router;
