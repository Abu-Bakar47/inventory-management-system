import { Schema, model, Document, Types } from "mongoose";

export type InventoryTxnType = "in" | "out" | "adjust";

export interface IInventoryTxn extends Document {
  store: Types.ObjectId;
  product: Types.ObjectId;
  type: InventoryTxnType;
  quantity: number; // positive number
  unitCost?: number; // for IN
  reason?: string;
  ref?: string; // order id / sale id
  createdBy?: Types.ObjectId; // User
}

const InventoryTxnSchema = new Schema<IInventoryTxn>(
  {
    store: { type: Schema.Types.ObjectId, ref: "Store", required: true, index: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    type: { type: String, enum: ["in", "out", "adjust"], required: true },
    quantity: { type: Number, required: true, min: 0 },
    unitCost: { type: Number },
    reason: { type: String },
    ref: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default model<IInventoryTxn>("InventoryTxn", InventoryTxnSchema);