// Routes/cart.js
import express from 'express';
import {
  getCartByUser,
  addToCart,
  updateCartItem,
  deleteCartItem,
  getAllCartsAdmin,
  deleteCartAdmin
} from '../Controllers/CartController.js';

const router = express.Router();

// người dùng
router.get('/:userId', getCartByUser);
router.post('/', addToCart);
router.put('/:id', updateCartItem);
router.delete('/:id', deleteCartItem);

// admin
router.get('/cart', getAllCartsAdmin);
router.delete('/admin/:cartId', deleteCartAdmin);

export default router;
