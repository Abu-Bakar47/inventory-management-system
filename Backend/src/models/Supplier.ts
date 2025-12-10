import { Schema, model, Document, Types } from "mongoose";

export interface ISupplier extends Document {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  store: Types.ObjectId;
}

const SupplierSchema = new Schema<ISupplier>(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    store: { type: Schema.Types.ObjectId, ref: "Store", required: true, index: true }
  },
  { timestamps: true }
);

SupplierSchema.index({ name: 1, store: 1 }, { unique: true });

export default model<ISupplier>("Supplier", SupplierSchema);