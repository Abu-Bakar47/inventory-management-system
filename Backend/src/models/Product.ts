import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  brand: string;
  sku?: string;
  productModel?: string;
  barcode?: string;
  category: Types.ObjectId;
  supplier?: Types.ObjectId;
  costPrice: number;
  sellPrice: number;
  taxRate?: number; // percent
  unit: string;
  reorderLevel?: number;
  store: Types.ObjectId;
  active: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    productModel: { type: String },
    sku: { type: String },
    barcode: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category", required:true },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier" },
    costPrice: { type: Number, required: true, min: 0 },
    sellPrice: { type: Number, required: true, min: 0 },
    taxRate: { type: Number, default: 0 },
    unit: { type: String, required: true },
    reorderLevel: { type: Number, default: 0 },
    store: { type: Schema.Types.ObjectId, ref: "Store", required: true, index: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

ProductSchema.index({ sku: 1, store: 1 }, { unique: true });

export default model<IProduct>("Product", ProductSchema);