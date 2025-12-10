// src/validations/authValidation.ts
import { body } from 'express-validator';

export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('mobile').isLength({min:10}).withMessage('Mobile number must be at least 10 digits'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('acceptedTerms')
    .equals('true')
    .withMessage('You must accept terms and conditions')
];

export const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

export const paymentValidation = [
  body('planId').isMongoId().withMessage('Invalid plan ID'),
  body('transactionId').notEmpty().withMessage('Transaction ID required'),
  body('screenshot').isURL().withMessage('Valid screenshot URL required'),
  body('amount').isNumeric().withMessage('Amount must be a number')
];