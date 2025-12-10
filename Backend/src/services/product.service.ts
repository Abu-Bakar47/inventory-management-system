// import Product from "../models/Product";
// import Inventory from "../models/Inventory";

// export const ProductService = {
//   async create(store: string, data: {
//     name: string; sku: string; barcode?: string; category: string; supplier?: string;
//     costPrice: number; sellPrice: number; taxRate?: number; reorderLevel?: number; active?: boolean;
//   }) {
//     const product = await Product.create({ ...data, store });
//     await Inventory.create({ product: product._id, store, quantity: 0 });
//     return product;
//   },
//   list(store: string, q?: string) {
//     const filter: any = { store };
//     if (q) filter.$or = [ { name: new RegExp(q, "i") }, { sku: new RegExp(q, "i") } ];
//     return Product.find(filter).populate("category supplier").sort({ createdAt: -1 });
//   },
//   get(store: string, id: string) {
//     return Product.findOne({ _id: id, store }).populate("category supplier");
//   },
//   update(store: string, id: string, data: Partial<any>) {
//     return Product.findOneAndUpdate({ _id: id, store }, data, { new: true });
//   },
//   remove(store: string, id: string) {
//     return Product.findOneAndDelete({ _id: id, store });
//   }
// };

import mongoose from "mongoose";
import Product from "../models/Product";
import Inventory from "../models/Inventory";

export const ProductService = {
  // Create product + inventory atomically
  async create(store: string, data: {
    name: string;
    sku?: string;
    productModel?: string;
    brand: string;
    barcode?: string;
    category: string;
    supplier?: string;
    costPrice: number;
    sellPrice: number;
    taxRate?: number;
    unit: string;
    reorderLevel?: number;
    active?: boolean;
  }) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // 1️⃣ Create product
      const product = new Product({ ...data, store });
      await product.save({ session });

      // 2️⃣ Create inventory
      const inventory = new Inventory({
        product: product._id,
        store,
        quantity: 0,
      });
      await inventory.save({ session });

      // 3️⃣ Commit transaction
      await session.commitTransaction();
      session.endSession();

      return product; // return product with _id
    } catch (err) {
      // Rollback on error
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  },

  // List products
  list(store: string, q?: string) {
    const filter: any = { store };
    if (q)
      filter.$or = [
        { name: new RegExp(q, "i") },
        { sku: new RegExp(q, "i") },
      ];
    return Product.find(filter)
      .populate("category supplier")
      .sort({ createdAt: -1 });
  },

  // Get single product
  get(store: string, id: string) {
    return Product.findOne({ _id: id, store }).populate("category supplier");
  },

  // Update product
  update(store: string, id: string, data: Partial<any>) {
    return Product.findOneAndUpdate({ _id: id, store }, data, { new: true });
  },

  // Delete product
  remove(store: string, id: string) {
    return Product.findOneAndDelete({ _id: id, store });
  },
};
