import Inventory from "../models/Inventory";
import InventoryTxn from "../models/InventoryTxn";

export const InventoryService = {
  getByProduct(store: string, productId: string) {
    return Inventory.findOne({ store, product: productId });
  },
  list(store: string) {
    return Inventory.find({ store }).populate({ path: "product", select: "name sku sellPrice" });
  },
  // async adjust(opts: { store: string; product: string; delta: number; type: "in" | "out" | "adjust"; reason?: string; unitCost?: number; createdBy?: string; ref?: string; }) {
  //   const inv = await Inventory.findOneAndUpdate(
  //     { store: opts.store, product: opts.product },
  //     { $inc: { quantity: opts.delta } },
  //     { new: true, upsert: true }
  //   );
  //   await InventoryTxn.create({ store: opts.store, product: opts.product, type: opts.type, quantity: Math.abs(opts.delta), reason: opts.reason, unitCost: opts.unitCost, createdBy: opts.createdBy, ref: opts.ref });
  //   return inv;
  // },

  async adjust(opts: { 
    store: string; 
    product: string; 
    delta: number; 
    type: "in" | "out" | "adjust"; 
    reason?: string; 
    unitCost?: number; 
    createdBy?: string; 
    ref?: string; 
  }) {
    const updateData: any = { $inc: { quantity: opts.delta } };
    
    // Update restock info for "in" transactions
    if (opts.type === 'in') {
      updateData.lastRestockedAt = new Date();
      if (opts.createdBy) {
        updateData.lastRestockedBy = opts.createdBy;
      }
    }

    const inv = await Inventory.findOneAndUpdate(
      { store: opts.store, product: opts.product },
      updateData,
      { new: true, upsert: true }
    );

    await InventoryTxn.create({ 
      store: opts.store, 
      product: opts.product, 
      type: opts.type, 
      quantity: Math.abs(opts.delta), 
      reason: opts.reason, 
      unitCost: opts.unitCost, 
      createdBy: opts.createdBy, 
      ref: opts.ref 
    });

    return inv;
  },

  // Get low stock items
  async getLowStock(store: string) {
    return Inventory.find({ 
      store,
      status: 'active',
      $expr: { $lte: ['$quantity', '$reorderLevel'] }
    })
    .populate({ path: "product", select: "name sku" })
    .sort({ quantity: 1 });
  },

  // Get out of stock items
  async getOutOfStock(store: string) {
    return Inventory.find({ 
      store,
      quantity: 0 
    })
    .populate({ path: "product", select: "name sku" });
  },

    // Get inventory summary
  async getSummary(store: string) {
    const [total, lowStock, outOfStock, totalValue] = await Promise.all([
      Inventory.countDocuments({ store, status: 'active' }),
      Inventory.countDocuments({ 
        store, 
        status: 'active',
        $expr: { $lte: ['$quantity', '$reorderLevel'] }
      }),
      Inventory.countDocuments({ store, quantity: 0 }),
      Inventory.aggregate([
        { $match: { store } },
        { $lookup: { from: 'products', localField: 'product', foreignField: '_id', as: 'prod' } },
        { $unwind: '$prod' },
        { $group: { _id: null, total: { $sum: { $multiply: ['$quantity', '$prod.sellPrice'] } } } }
      ])
    ]);

    return {
      totalProducts: total,
      lowStockItems: lowStock,
      outOfStockItems: outOfStock,
      inventoryValue: totalValue[0]?.total || 0
    };
  },

  //   // Reserve quantity (for orders)
  // async reserve(store: string, productId: string, quantity: number) {
  //   const inv = await Inventory.findOne({ store, product: productId });
    
  //   if (!inv) {
  //     throw new Error('Product not found in inventory');
  //   }
    
  //   if (inv.quantity - inv.reservedQuantity < quantity) {
  //     throw new Error('Insufficient available quantity');
  //   }

  //   return Inventory.findOneAndUpdate(
  //     { store, product: productId },
  //     { $inc: { reservedQuantity: quantity } },
  //     { new: true }
  //   );
  // },

  // // Release reserved quantity
  // async releaseReservation(store: string, productId: string, quantity: number) {
  //   return Inventory.findOneAndUpdate(
  //     { store, product: productId },
  //     { $inc: { reservedQuantity: -quantity } },
  //     { new: true }
  //   );
  // },

  // // Update reorder settings
  // async updateReorderSettings(
  //   store: string, 
  //   productId: string, 
  //   settings: { 
  //     reorderLevel?: number; 
  //     reorderQuantity?: number;
  //     maxStockLevel?: number;
  //     location?: string;
  //   }
  // ) {
  //   return Inventory.findOneAndUpdate(
  //     { store, product: productId },
  //     { $set: settings },
  //     { new: true }
  //   );
  // },
};
