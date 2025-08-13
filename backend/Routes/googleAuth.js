import express from 'express';
import passport from 'passport';
import { googleCallback } from '../Controllers/GoogleAuthController.js';

const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  googleCallback
);

export default router;
