import express from 'express';
import {
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    changePassword,
    addCustomer,
    login,
    googleLogin
} from '../Controllers/CustomerController.js';

const router = express.Router();

router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);
router.post('/:id/change-password', changePassword);
router.post('/', addCustomer);
router.post('/login', login);
router.post('/google-login', googleLogin);

export default router;
