import { body } from 'express-validator';

export const paymentValidation = [
  body('planId')
    .isMongoId().withMessage('Invalid plan ID')
    .notEmpty().withMessage('Plan ID is required'),
  
  body('transactionId')
    .trim()
    .notEmpty().withMessage('Transaction ID is required')
    .isLength({ min: 5 }).withMessage('Transaction ID must be at least 5 characters'),
  
  body('screenshot')
    .trim()
    .notEmpty().withMessage('Screenshot URL is required')
    .isURL().withMessage('Invalid screenshot URL'),
  
  body('amount')
    .isFloat({ gt: 0 }).withMessage('Amount must be a positive number')
    .toFloat()
];