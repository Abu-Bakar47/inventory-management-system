// src/types/order.ts (or wherever you keep your types)

interface Product {
  _id: string;
  name: string;
  sku: string;
  costPrice: number;
}

interface OrderItem {
  product: Product;
  quantity: number;
  unitCost: number;
}

interface Supplier {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Define the PurchaseOrder interface based on your API response structure
export interface PurchaseOrder {
  _id: string;
  store: string;
  supplier: Supplier;
  status: 'placed' | 'confirmed' | 'shipped' | 'delivered' | string; // Use string for extensibility
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Define the API response structure to match the console log (containing the array)
export interface PurchaseOrderApiResponse {
    purchaseOrders: PurchaseOrder[];
}