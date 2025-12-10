import { Schema, model, Document, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  store: Types.ObjectId;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    store: { type: Schema.Types.ObjectId, ref: "Store", required: true, index: true }
  },
  { timestamps: true }
);

CategorySchema.index({ name: 1, store: 1 }, { unique: true });

export default model<ICategory>("Category", CategorySchema);