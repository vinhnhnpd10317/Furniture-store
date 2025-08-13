import express from "express";
import {
    getProducts,
    getLatestProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getRelatedProducts,
    updateStockStatus
} from "../Controllers/ProductController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/latest", getLatestProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/related/:id", getRelatedProducts);
router.put("/:id/trang-thai-kho", updateStockStatus);

export default router;
