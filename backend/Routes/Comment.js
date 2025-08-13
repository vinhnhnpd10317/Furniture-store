// Routes/Comment.js
import express from 'express';
import {
    getComments,
    createComment,
    deleteComment,
    updateComment
} from '../Controllers/CommentController.js';

const router = express.Router();

router.get('/', getComments);       // Lấy danh sách bình luận (có thể lọc theo sản phẩm)
router.post('/', createComment);    // Thêm bình luận
router.delete('/:id', deleteComment); // Xoá bình luận
router.put('/:id', updateComment);  // Cập nhật bình luận

export default router;
