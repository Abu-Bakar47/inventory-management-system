// // src/models/Plan.ts
// import mongoose, { Document, Schema } from 'mongoose';

// export interface IPlan extends Document {
//   name: string;
//   price: number;
//   trialDays: number;
//   allowedStores: number;
//   features: string[];
// }

// const PlanSchema: Schema = new Schema({
//   name: { type: String, required: true, unique: true },
//   price: { type: Number, required: true },
//   trialDays: { type: Number, default: 0 },
//   allwoedStores: { type: Number, default: 0 },
//   features: [{ type: String }],
// });

// export default mongoose.model<IPlan>('Plan', PlanSchema);


import mongoose, { Document, Schema } from 'mongoose';

export interface IPlan extends Document {
  name: string;
  price: number;
  trialDays: number;
  allowedStores: number;
  features: string[];
}

const PlanSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true, min: 0 },
  trialDays: { type: Number, default: 0, min: 0 },
  allowedStores: { type: Number, default: 0, min: 0 }, // Fixed typo
  features: [{ type: String }],
});

export default mongoose.model<IPlan>('Plan', PlanSchema);