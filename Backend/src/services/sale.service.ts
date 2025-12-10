// =============================
// File: src/services/sale.service.ts
// =============================
import Sale from "../models/Sale";
import Product from "../models/Product";
import { InventoryService } from "./inventory.service.js";

export const SaleService = {
  async create(store: string, data: { customerName?: string; items: { product: string; quantity: number; price?: number }[]; paymentMethod: "cash" | "card" | "upi" | "other"; discount?: number; tax?: number; }, userId?: string) {
    // compute per item price if not provided (use current product sellPrice)
    const items = [] as { product: string; quantity: number; price: number; discount?: number; tax?: number }[];
    for (const it of data.items) {
      const p = await Product.findById(it.product);
      if (!p) throw new Error("Product not found");
      const price = typeof it.price === "number" ? it.price : p.sellPrice;
      items.push({ product: p._id.toString(), quantity: it.quantity, price });
    }
    const subtotal = items.reduce((s, it) => s + it.quantity * it.price, 0);
    const discount = data.discount || 0;
    const tax = data.tax || 0; // you could compute based on product.taxRate
    const total = subtotal - discount + tax;

    // Check inventory & deduct
    for (const it of items) {
      await InventoryService.adjust({ store, product: it.product, delta: -it.quantity, type: "out", reason: "SALE", createdBy: userId });
    }

    const sale = await Sale.create({ store, customerName: data.customerName, items, subtotal, discount, tax, total, paymentMethod: data.paymentMethod, status: "completed" });
    return sale;
  },
  list(store: string) {
    return Sale.find({ store }).populate("items.product").sort({ createdAt: -1 });
  },
  get(store: string, id: string) {
    return Sale.findOne({ _id: id, store }).populate("items.product");
  }
};