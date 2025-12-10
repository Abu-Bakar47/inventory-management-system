import Category from "../models/Category";

export const CategoryService = {
  create(store: string, data: { name: string; description?: string }) {
    return Category.create({ ...data, store });
  },
  list(store: string) {
    return Category.find({ store }).sort({ createdAt: -1 });
  },
  get(store: string, id: string) {
    return Category.findOne({ _id: id, store });
  },
  update(store: string, id: string, data: Partial<{ name: string; description: string }>) {
    return Category.findOneAndUpdate({ _id: id, store }, data, { new: true });
  },
  remove(store: string, id: string) {
    return Category.findOneAndDelete({ _id: id, store });
  }
};