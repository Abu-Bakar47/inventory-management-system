import Supplier from "../models/Supplier";

export const SupplierService = {
  create(store: string, data: { name: string; email?: string; phone?: string; address?: string }) {
    return Supplier.create({ ...data, store });
  },
  list(store: string) {
    return Supplier.find({ store }).sort({ createdAt: -1 });
  },
  get(store: string, id: string) {
    return Supplier.findOne({ _id: id, store });
  },
  update(store: string, id: string, data: Partial<{ name: string; email: string; phone: string; address: string }>) {
    return Supplier.findOneAndUpdate({ _id: id, store }, data, { new: true });
  },
  remove(store: string, id: string) {
    return Supplier.findOneAndDelete({ _id: id, store });
  }
};