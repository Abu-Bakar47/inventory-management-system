import express from 'express';
import { deviceGuard } from '../middlewares/auth';
import * as paymentController from '../controllers/paymentController';
import { paymentValidation } from '../validations/paymentValidation';
import { auth } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(auth());


// Public route to get available plans
router.get('/plans', paymentController.getPlans);

// Protected payment submission route
router.post(
  '/submit',
  // deviceGuard,
  paymentValidation,
  paymentController.submitPayment
);

export default router;