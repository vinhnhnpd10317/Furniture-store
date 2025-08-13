// Routes/Article.js
import express from 'express';
import multer from 'multer';
import path from 'path';

import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} from '../Controllers/ArticleController.js';

const router = express.Router();

// Multer upload config (nếu cần upload hình ảnh cho bài viết)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/articles'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.post('/', createArticle); // nếu cần upload ảnh: upload.single('hinh_anh')
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

export default router;
