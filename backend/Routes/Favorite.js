import express from 'express';
import {
  getAllFavorites,
  getFavoritesByUser,
  addFavorite,
  removeFavorite
} from '../Controllers/FavoriteController.js';

const router = express.Router();

router.get('/', getAllFavorites);
router.get('/:nguoi_dung_id', getFavoritesByUser);
router.post('/', addFavorite);
router.delete('/', removeFavorite);

export default router;
