import { Schema, model, Document, Types } from "mongoose";

export interface IPurchaseOrderItem {
  product: Types.ObjectId;
  quantity: number;
  unitCost: number;
}

export interface IPurchaseOrder extends Document {
  store: Types.ObjectId;
  supplier: Types.ObjectId;
  status: "draft" | "placed" | "received" | "cancelled";
  items: IPurchaseOrderItem[];
  subtotal: number;
  tax?: number;
  total: number;
}

const PurchaseOrderItemSchema = new Schema<IPurchaseOrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitCost: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const PurchaseOrderSchema = new Schema<IPurchaseOrder>(
  {
    store: { type: Schema.Types.ObjectId, ref: "Store", required: true, index: true },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
    status: { type: String, enum: ["draft", "placed", "received", "cancelled"], default: "draft" },
    items: { type: [PurchaseOrderItemSchema], default: [] },
    subtotal: { type: Number, required: true, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

export default model<IPurchaseOrder>("PurchaseOrder", PurchaseOrderSchema);