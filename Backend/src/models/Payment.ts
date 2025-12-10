// src/models/Payment.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  user: mongoose.Types.ObjectId;
  plan: mongoose.Types.ObjectId;
  amount: number;
  transactionId: string;
  screenshot: string;
  status: 'pending' | 'verified';
}

const PaymentSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true },
  screenshot: { type: String, required: true },
  status: { type: String, enum: ['pending', 'verified'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model<IPayment>('Payment', PaymentSchema);