// Routes/CheckOut.js
import express from 'express';
import { createOrderWithDetails } from '../Controllers/CheckOutController.js';

const router = express.Router();

router.post('/', createOrderWithDetails);

export default router;
