import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  createCategoryFn,
  createOrderFn,
  createSpplierFn,
  createStoreFn,
  deleteCategoryFn,
  deleteProductsFn,
  deleteSpplierFn,
  deleteStoreFn,
  getAllStoreFn,
  getCategoryFn,
  getInventoryFn,
  getOrderDetailsFn,
  getOrderFn,
  getProductsFn,
  getSpplierFn,
  getStoreByIdFn,
  postProductsFn,
  selectStoreFn,
  updateCategoryFn,
  updateProductsFn,
  updateSpplierFn,
  updateStoreFn,
  type AddProductInput,
  type AddProductState,
  type newStoreData,
  type OrderPayload,
  type supplierState,
} from "../../services/inventoryService";
import { toast } from "react-toastify";
interface Store {
  selected: boolean;
  _id: string;
  owner: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
interface Store {
  selected: boolean;
  _id: string;
  owner: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
interface Categories {
  _id: string;
  name: string;
  description: string;
}
export interface Supplier {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  store: string;
  createdAt: string;
}

export interface ProductInOrder {
  _id: string;
  name: string;
  sku: string;
  costPrice: number;
}

export interface OrderItem {
  product: ProductInOrder;
  quantity: number;
  unitCost: number;
}

export interface PurchaseOrder {
  _id: string;
  status: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

// Interface for the Product object nested inside an item
interface Product {
  _id: string;
  name: string;
  sku: string;
  costPrice: number;
}

// Interface for a single item in the purchase order
interface OrderItemDetails {
  product: Product;
  quantity: number;
  unitCost: number;
}

// Interface for the core Purchase Order data structure
export interface PurchaseOrderDetails {
  _id: string;
  store: string;
  supplier: Supplier;
  status: "placed" | "shipped" | "delivered" | "cancelled"; // Assuming possible statuses
  items: OrderItemDetails[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Interface for the top-level response returned by the thunk (res.data)
interface FetchOrderDetailsResponse {
  PurchaseOrderDetails: PurchaseOrderDetails;
}

// for Inventory ts
export interface ProductDetails {
  _id: string;
  name: string;
  sku: string;
  sellPrice: number;
}

export interface InventoryItems {
  _id: string;
  product: ProductDetails | null;
  store: string;
  quantity: number;
  reorderLevel: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
interface inventoryState {
  stores: Store[];
  supplier: Supplier[];
  categories: Categories[];
  product: AddProductState[];
  purchaseOrders: PurchaseOrder[];
  inventory: InventoryItems[];
  orderDetails: FetchOrderDetailsResponse | null;
  loading: boolean;
  error: string | null;
  store: string | null;
}

const initialState: inventoryState = {
  stores: [],
  categories: [],
  supplier: [],
  product: [],
  purchaseOrders: [],
  inventory: [],
  store: null,
  orderDetails: null,
  loading: false,
  error: null,
};

export const fetchStoreById = createAsyncThunk(
  "store/fetchById",
  async (storeId: string) => {
    const res= await getStoreByIdFn(storeId);
    // console.log("res in thunk",res)
    return res.name;

  }
);

export const fetchAllStoreThunk = createAsyncThunk(
  "stores/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllStoreFn();
      // console.log("res", response.data.stores);
      return response.data.stores;
    } catch (error: any) {
      return rejectWithValue(error.resposne.data || "Failed to fetch stores");
    }
  }
);
export const createStoreThunk = createAsyncThunk(
  "store/create",
  async (payload: newStoreData, { rejectWithValue }) => {
    try {
      const response = await createStoreFn(payload);
      toast.success("New Store Regsitered Successfully!");
      return response.data;
    } catch (err: any) {
      toast.error(err.response?.data);
      return rejectWithValue(err.response?.data || "Failed to create store");
    }
  }
);

export const updateStoreThunk = createAsyncThunk(
  "store/update",
  async (
    { storeId, payload }: { storeId: string; payload: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateStoreFn(payload, storeId);
      toast.success("Store updated successfully!");
      return response.data;
    } catch (err: any) {
      toast.error(err.response?.data);
      return rejectWithValue(err.response?.data || "Failed to update store");
    }
  }
);

export const deleteStoreThunk = createAsyncThunk(
  "stores/deleteStore",
  async (storeId: string, { rejectWithValue }) => {
    try {
      const deletedId = await deleteStoreFn(storeId); // returns storeId
      toast.success("Deleted successfully!");
      return deletedId; // return storeId to reducer
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Delete failed!");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const selectStoreThunk = createAsyncThunk(
  "store/select",
  async (storeId: string, { rejectWithValue }) => {
    try {
      const switchStore = await selectStoreFn(storeId);
      return switchStore.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong!!");
      return rejectWithValue(err.response?.data);
    }
  }
);

// for Categories
export const getAllCategoriesThunk = createAsyncThunk(
  "fetch/categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategoryFn();
      // console.log("response", response?.data?.categories);
      return response?.data?.categories;
    } catch (error: any) {
      return rejectWithValue(error.resposne.data || "Failed to fetch stores");
    }
  }
);
export const createCategoryThunk = createAsyncThunk(
  "create/category",
  async (payload: { name: string }, { rejectWithValue }) => {
    try {
      const res = await createCategoryFn(payload);
      toast.success("Category added successful!!");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error?.res?.error || "Failed to create category");
    }
  }
);
export const updateCategoryThunk = createAsyncThunk(
  "update/category",
  async (
    { categoryId, payload }: { categoryId: string; payload: { name: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateCategoryFn(categoryId, payload);
      toast.success("category updated successfully!");
      return response.data;
    } catch (err: any) {
      toast.error(err.response?.data);
      return rejectWithValue(err.response?.data || "Failed to update category");
    }
  }
);
export const deleteCategoryThunk = createAsyncThunk(
  "delete/category",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const deletedId = await deleteCategoryFn(categoryId); // returns storeId
      toast.success("Deleted successfully!");
      return deletedId; // return storeId to reducer
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Delete failed!");
      return rejectWithValue(error.response?.data);
    }
  }
);

// for Suppliers
export const createSupplierThunk = createAsyncThunk(
  "supplier/create",
  async (payload: supplierState, { rejectWithValue }) => {
    try {
      const response = await createSpplierFn(payload);
      toast.success("Supplier added successful!!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data);
      return rejectWithValue(
        error?.response?.data || "Failed to create supplier"
      );
    }
  }
);
export const getSupplierThunk = createAsyncThunk(
  "supplier/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSpplierFn();
      // console.log("res111", response.data?.suppliers);
      return response.data?.suppliers;
    } catch (error: any) {
      return rejectWithValue(error.resposne.data || "Failed to fetch stores");
    }
  }
);
export const updateSupplierThunk = createAsyncThunk(
  "supplier/update",
  async (
    { supplierId, payload }: { supplierId: string; payload: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateSpplierFn(supplierId, payload);
      toast.success("Store updated successfully!");
      return response.data;
    } catch (err: any) {
      toast.error(err.response?.data);
      return rejectWithValue(err.response?.data || "Failed to update store");
    }
  }
);

export const deleteSupplierThunk = createAsyncThunk(
  "supplier/delete",
  async (supplierId: string, { rejectWithValue }) => {
    try {
      const deletedId = await deleteSpplierFn(supplierId);
      toast.success("Deleted successfully!");
      return deletedId; // return storeId to reducer
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Delete failed!");
      return rejectWithValue(error.response?.data);
    }
  }
);
// for Products
export const postProductsThunk = createAsyncThunk(
  "products/post",
  async (payload: AddProductInput, { rejectWithValue }) => {
    try {
      const response = await postProductsFn(payload);
      // console.log("response",response.data)
      toast.success("New Products Added Successful!");
      return response.data;
    } catch (err: any) {
      toast.error(err.response?.data);
      return rejectWithValue(
        err.response?.data || "Failed to create products!"
      );
    }
  }
);

export const getProductsThunk = createAsyncThunk(
  "product/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProductsFn();
      // console.log("response",response.data)
      return response.data?.products;
    } catch (error: any) {
      toast.error(error.resposne.data || "Failed to fetch");
      return rejectWithValue(error.resposne.data || "Failed to fetch stores");
    }
  }
);
export const deleteProductsThunk = createAsyncThunk(
  "product/delete",
  async (prodId: string, { rejectWithValue }) => {
    try {
      const response = await deleteProductsFn(prodId);
      toast.success("Deleted successfully!");
      return response;
    } catch (error: any) {
      toast.error(error.resposne.data || "Failed to delete Products");
      return rejectWithValue(
        error.resposne.data || "Failed to delete Products"
      );
    }
  }
);

export const updateProductsThunk = createAsyncThunk(
  "product/update",
  async (
    { productId, payload }: { productId: string; payload: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateProductsFn(productId, payload);
      toast.success("Products updated successfully!");
      return response.data;
    } catch (err: any) {
      toast.error(err.response?.data);
      return rejectWithValue(err.response?.data || "Failed to update Products");
    }
  }
);
// for Order
export const placeOrderThunk = createAsyncThunk(
  "order/placeOrder",
  async (orderData: OrderPayload, { rejectWithValue }) => {
    try {
      const response = await createOrderFn(orderData);
      toast.success("Your order has been placed successful!");
      return response.data;
    } catch (error: any) {
      toast.error("Something went wrong!");
      return rejectWithValue(
        error.response?.data?.message || "Failed to place order"
      );
    }
  }
);
// getOrderFn
export const fetchOrdersThunk = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getOrderFn();
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// export const fetchOrdersDetailsThunk = createAsyncThunk(
//   "orders/fetchOrdersDetails",
//   async (supplierId:string, { rejectWithValue }) => {
//     try {
//       const res = await getOrderDetailsFn(supplierId);
//       // console.log("res111",res.data)
//       return res.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
//     }
//   }
// );
export const fetchOrdersDetailsThunk = createAsyncThunk<
  FetchOrderDetailsResponse, // 1. Return type (Success)
  string, // 2. Argument type (supplierId)
  { rejectValue: string } // 3. Thunk API options (rejectValue type)
>(
  "orders/fetchOrdersDetails",
  async (supplierId: string, { rejectWithValue }) => {
    try {
      // Assuming getOrderDetailsFn returns a promise that resolves to { data: FetchOrderDetailsResponse }
      const res = await getOrderDetailsFn(supplierId);
      return res.data; // The returned data should be of type FetchOrderDetailsResponse
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order details"
      );
    }
  }
);

// For Inventory
export const getInventoryThunk = createAsyncThunk(
  "inventory/fetchInventory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getInventoryFn();
      // console.log("response", response?.data?.categories);
      return response?.data?.inventory;
    } catch (error: any) {
      return rejectWithValue(error.resposne.data || "Failed to fetch stores");
    }
  }
);


const inventrySlice = createSlice({
  name: "invet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // for Stores
      .addCase(fetchAllStoreThunk.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchAllStoreThunk.fulfilled, (state, action) => {
        // console.log("payload", action.payload);
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchAllStoreThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createStoreThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStoreThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.stores.push(action.payload);
      })
      .addCase(createStoreThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateStoreThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStoreThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const idx = state.stores.findIndex((s) => s._id === action.payload.id);
        if (idx !== -1) {
          state.stores[idx] = action.payload; // Replace the updated store in the array
        }
      })
      .addCase(updateStoreThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteStoreThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStoreThunk.fulfilled, (state, action) => {
        // console.log("delete", state.stores);
        state.stores = state.stores.filter(
          (store) => store._id !== action.payload
        );
      })
      .addCase(deleteStoreThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(selectStoreThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectStoreThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // Mark selected store locally
        state.stores = state.stores.map((store) =>
          store._id === action.payload._id
            ? { ...store, selected: true }
            : { ...store, selected: false }
        );
      })
      .addCase(selectStoreThunk.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload as string;
      })
      // for Categories
      .addCase(getAllCategoriesThunk.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getAllCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCategoryThunk.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories.push(action.payload);
      })
      .addCase(createCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const idx = state.categories.findIndex(
          (s) => s._id === action.payload.id
        );
        if (idx !== -1) {
          state.categories[idx] = action.payload; // Replace the updated store in the array
        }
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        // console.log("delete", state.stores);
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload
        );
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createSupplierThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSupplierThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.supplier = [...state.supplier, action.payload];
      })
      .addCase(createSupplierThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getSupplierThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSupplierThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.supplier = action.payload;
      })
      .addCase(getSupplierThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Supplier
      .addCase(updateSupplierThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSupplierThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const idx = state.supplier.findIndex(
          (s) => s._id === action.payload.id
        );
        if (idx !== -1) {
          state.supplier[idx] = action.payload;
        }
      })
      .addCase(updateSupplierThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteSupplierThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSupplierThunk.fulfilled, (state, action) => {
        // console.log("delete", state.stores);
        state.supplier = state.supplier.filter(
          (suplier) => suplier._id !== action.payload
        );
      })
      .addCase(deleteSupplierThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.product = action.payload;
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductsThunk.fulfilled, (state, action) => {
        state.product = state.product.filter(
          (prod) => prod._id !== action.payload
        );
      })
      .addCase(deleteProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(postProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.product = [...state.product, action.payload];
      })
      .addCase(postProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const idx = state.product.findIndex((s) => s._id === action.payload.id);
        if (idx !== -1) {
          state.product[idx] = action.payload;
        }
      })
      .addCase(updateProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(placeOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrderThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(placeOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.purchaseOrders = action.payload;
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // for Order details
      .addCase(fetchOrdersDetailsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrdersDetailsThunk.fulfilled,
        (state, action: PayloadAction<FetchOrderDetailsResponse>) => {
          state.loading = false;
          // CORRECTED: Assign the single payload object, not trying to assign to an array
          state.orderDetails = action.payload;
        }
      )
      .addCase(fetchOrdersDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.orderDetails = null; // Clear details on failure
      })
      // for Inventory
      .addCase(getInventoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInventoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.inventory = action.payload;
      })
      .addCase(getInventoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
       .addCase(fetchStoreById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStoreById.fulfilled, (state, action) => {
        console.log("store by id payload", action.payload);
        state.loading = false;
        state.store = action.payload;
      });
  },
});

export default inventrySlice.reducer;
