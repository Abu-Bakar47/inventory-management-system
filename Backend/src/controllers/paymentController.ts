import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Plan from '../models/Plan';
import Payment from '../models/Payment';
import User from '../models/User';

export const getPlans = async (req: Request, res: Response) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const submitPayment = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { planId, transactionId, screenshot, amount } = req.body;
    const userId = req.user?.id;

    // Check if plan exists
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    // Create payment record
    const payment = await Payment.create({
      user: userId,
      plan: planId,
      amount,
      transactionId,
      screenshot,
      status: 'pending'
    });

    // Update user's plan and payment status
    await User.findByIdAndUpdate(userId, {
      plan: planId,
      paymentStatus: 'completed'
    });

    res.status(201).json({ 
      message: 'Payment submitted for verification',
      payment
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};