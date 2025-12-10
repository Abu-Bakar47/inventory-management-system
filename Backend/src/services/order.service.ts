// =============================
// File: src/services/order.service.ts (Purchase Orders)
// =============================
import Product from '@models/Product';
import PurchaseOrder from '../models/Order';
import { InventoryService } from './inventory.service';
import { Types } from 'mongoose';

// export const PurchaseOrderService = {
//   create(
//     store: string,
//     data: {
//       supplier: string;
//       items: { product: string; quantity: number; unitCost: number }[];
//       status?: 'draft' | 'placed';
//       tax?: number;
//     },
//   ) {
//     const subtotal = data.items.reduce((s, it) => s + it.quantity * it.unitCost, 0);
//     const tax = data.tax || 0; // tax could be computed per item if needed
//     const totalTax = tax * subtotal / 100;
//     const total = subtotal + totalTax;
//     return PurchaseOrder.create({
//       store,
//       supplier: data.supplier,
//       items: data.items,
//       status: data.status || 'draft',
//       subtotal,
//       tax,
//       total,
//     });
//   },

export const PurchaseOrderService = {
  // create(
  //   store: string,
  //   data: {
  //     supplier: string;
  //     items: { product: string; quantity: number; unitCost: number }[];
  //     status?: 'draft' | 'placed';
  //     tax?: number;
  //   },
  // ) {
  //   const subtotal = data.items.reduce((s, it) => s + it.quantity * it.unitCost, 0);
  //   const taxRate = data.tax || 0;

  //   // More explicit calculation (same result)
  //   const totalTax = (taxRate / 100) * subtotal;

  //   // Or alternatively: subtotal * (taxRate / 100)

  //   const total = subtotal + totalTax;

  //   // Optional: Round to 2 decimal places for currency
  //   const roundedSubtotal = Math.round(subtotal * 100) / 100;
  //   const roundedTotalTax = Math.round(totalTax * 100) / 100;
  //   const roundedTotal = Math.round(total * 100) / 100;

  //   return PurchaseOrder.create({
  //     store,
  //     supplier: data.supplier,
  //     items: data.items,
  //     status: data.status || 'draft',
  //     subtotal: roundedSubtotal,
  //     tax: taxRate,
  //     totalTax: roundedTotalTax,
  //     total: roundedTotal,
  //   });
  // },


  async create(
    store: string,
    data: {
      supplier: string;
      items: { 
        product: string; 
        quantity: number; 
        unitCost?: number;  // Optional: override if needed
      }[];
      status?: 'draft' | 'placed';
      tax?: number;
    },
  ) {
    // Fetch all products to get their cost prices
    console.log('Creating PO with data:', data);
    const productIds = data.items?.map(item => item.product);
    console.log('Product IDs:', productIds);
    const products = await Product.find({ 
      _id: { $in: productIds },
      store 
    });

    console.log('Fetched products:', products);
    
    // Create a map for quick lookup
    const productMap = new Map(
      products.map(p => [(p._id as Types.ObjectId).toHexString(), p])
    );

    console.log('Product Map:', productMap);
    
    // Calculate with product costPrice or override
    const enrichedItems = data.items.map(item => {
      const product = productMap.get(item.product);

      
      if (!product) {
        throw new Error(`Product ${item.product} not found`);
      }
      
      // Use provided unitCost or fallback to product's costPrice
      const unitCost = item.unitCost ?? product.costPrice;
      
      return {
        product: item.product,
        quantity: item.quantity,
        unitCost,  // Store the actual price used
        lineTotal: item.quantity * unitCost
      };
    });
    
    const subtotal = enrichedItems.reduce((s, it) => s + it.lineTotal, 0);
    const taxRate = data.tax || 0;
    const totalTax = (taxRate / 100) * subtotal;
    const total = subtotal + totalTax;
    
    // Round to 2 decimal places
    const roundedSubtotal = Math.round(subtotal * 100) / 100;
    const roundedTotal = Math.round(total * 100) / 100;
    
    return PurchaseOrder.create({
      store,
      supplier: data.supplier,
      items: enrichedItems,  // Store with actual unitCost used
      status: data.status || 'draft',
      subtotal: roundedSubtotal,
      tax: taxRate,
      total: roundedTotal,
    });
  },

  list(store: string) {
    return PurchaseOrder.find({ store })
      .populate('supplier', 'name email phone address')
      .populate(
        'items.product',
        'name sku costPrice tax', // Only return these three fields
      )
      .sort({ createdAt: -1 });
  },
  get(store: string, id: string) {
    return PurchaseOrder.findOne({ _id: id, store })
      .populate('supplier', 'name email phone address')
      .populate(
        'items.product',
        'name sku costPrice tax', // Only return these three fields
      );
  },
  async markReceived(store: string, id: string, userId?: string) {
    const po = await PurchaseOrder.findOne({ _id: id, store });
    if (!po) throw new Error('Purchase order not found');
    if (po.status === 'received') return po;
    for (const item of po.items) {
      await InventoryService.adjust({
        store,
        product: item.product.toString(),
        delta: item.quantity,
        type: 'in',
        unitCost: item.unitCost,
        reason: `PO:${String(po._id)}`,
        createdBy: userId,
        ref: String(po._id),
      });
    }
    po.status = 'received';
    await po.save();
    return po;
  },
  // update(store: string, id: string, data: Partial<any>) {
  //   return PurchaseOrder.findOneAndUpdate({ _id: id, store }, data, { new: true });
  // },
  remove(store: string, id: string) {
    return PurchaseOrder.findOneAndDelete({ _id: id, store });
  },
};
