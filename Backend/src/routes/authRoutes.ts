// // src/routes/authRoutes.ts
// import express from 'express';
// import {
//   register,
//   login,
//   getPricing
// } from '../controllers/authController';
// import {
//   registerValidation,
//   loginValidation
// } from '../validations/authValidation';

// const router = express.Router();

// router.post('/register', registerValidation, register);
// router.post('/login', loginValidation, login);
// router.get('/pricing', getPricing);

// export default router;


import express from 'express';
import { 
  register, 
  login, 
  getPricing,
  requestPasswordReset,
  handlePasswordReset,
  confirmEmail,
  logout
} from '../controllers/authController';
import { body } from 'express-validator';

const router = express.Router();

// Registration
router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('mobile').isMobilePhone('any'),
  body('password').isLength({ min: 6 }),
  body('address').notEmpty(),
  body('storeName').optional()
], register);

// Login
router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], login);

// Logout
router.post('/logout', logout);

// Password reset
router.post('/forgot-password', [
  body('email').isEmail()
], requestPasswordReset);

router.post('/reset-password', [
  body('token').notEmpty(),
  body('newPassword').isLength({ min: 6 })
], handlePasswordReset);

// Email verification
router.get('/verify-email/:token', confirmEmail);

// Pricing plans
router.get('/pricing', getPricing);

export default router;