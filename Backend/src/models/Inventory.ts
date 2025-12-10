import { Schema, model, Document, Types } from "mongoose";

export interface IInventory extends Document {
  product: Types.ObjectId;
  store: Types.ObjectId;
  quantity: number; // current on-hand quantity
  reorderLevel: number;
  unitCost?: number;
  status?: string;
  lastRestockedAt?: Date;
  lastRestockedBy?: string;
}

const InventorySchema = new Schema<IInventory>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    store: { type: Schema.Types.ObjectId, ref: "Store", required: true, index: true },
    quantity: { type: Number, required: true, default: 0 },
    reorderLevel: { type: Number, required: true, default: 0 }, 
    unitCost: { type: Number },
    status: { type: String, enum: ["active", "inactive", "out-of-stock"], default: "active" },
    lastRestockedAt : { type: Date },
    lastRestockedBy: { type: String },
  },
  { timestamps: true }
);

InventorySchema.index({ product: 1, store: 1 }, { unique: true });

export default model<IInventory>("Inventory", InventorySchema);