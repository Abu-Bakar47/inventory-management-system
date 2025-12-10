import { Schema, model, Document, Types } from "mongoose";

export interface ISaleItem {
  product: Types.ObjectId;
  quantity: number;
  price: number; // sell price at time of sale
  discount?: number; // absolute per line
  tax?: number; // absolute per line
}

export interface ISale extends Document {
  store: Types.ObjectId;
  customerName?: string;
  items: ISaleItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: "cash" | "card" | "upi" | "other";
  status: "completed" | "refunded";
}

const SaleItemSchema = new Schema<ISaleItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 }
  },
  { _id: false }
);

const SaleSchema = new Schema<ISale>(
  {
    store: { type: Schema.Types.ObjectId, ref: "Store", required: true, index: true },
    customerName: { type: String },
    items: { type: [SaleItemSchema], default: [] },
    subtotal: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },
    paymentMethod: { type: String, enum: ["cash", "card", "upi", "other"], required: true },
    status: { type: String, enum: ["completed", "refunded"], default: "completed" }
  },
  { timestamps: true }
);

export default model<ISale>("Sale", SaleSchema);