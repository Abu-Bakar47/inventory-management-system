import { axiosInstance } from "./axiosInterseptor"
export interface newStoreData{
    name:string,
    manager:string,
    address:string,
    mobile:number
}
export interface supplierState{
    name:string,
    email:string,
    phone:string,
    address:string
}

export interface AddProductInput {
  name: string;
  sku: string;
  brand: string;
  category: string; // only categoryId
  costPrice: number;
  sellPrice: number;
//   taxRate: number;
  unit: string;
}

export interface OrderPayload {
  supplier: string;
  status: string;
  items: { product: string; quantity: number }[];
  tax: number;
}
export interface StoreDetails {
  _id: string;
  name: string; // The property you are targeting
  // ... other fields
}

export interface AddProductState extends Omit<AddProductInput, "category"> {
  _id: string; // added by backend
  category: { _id: string; name: string }; // populated in response
}

export const getAllStoreFn = async() => {
    return axiosInstance.get("/store")
}
export const createStoreFn = (newStoreData:newStoreData) => {
    return axiosInstance.post("/store",newStoreData)
}
export const updateStoreFn = (newStoreData:newStoreData,storeId:string) => {
    return axiosInstance.put(`/store/${storeId}`,newStoreData)
}
export const deleteStoreFn = async (storeId: string) => {
  await axiosInstance.delete(`/store/${storeId}`);
  return storeId; 
};
export const selectStoreFn =(storeId:string) => {
    return axiosInstance.post(`/store/select/${storeId}`)
}
export const getStoreByIdFn = async (storeId: string) => {
  const response = await axiosInstance.get<StoreDetails>(`/store/${storeId}`);
  return response.data;
};

// for Categories
export const getCategoryFn = async() => {
    return axiosInstance.get("/category")
}
export const createCategoryFn = async(payload: { name: string }) => {
    return axiosInstance.post("/category",payload)
}
export const updateCategoryFn = async(categoryId:string,payload: { name: string }) => {
    return axiosInstance.put(`/category/${categoryId}`,payload)
}
export const deleteCategoryFn = async (categoryId: string) => {
  await axiosInstance.delete(`/category/${categoryId}`);
  return categoryId; // ✅ return ID only
};
// for Supplier
export const createSpplierFn = async(supplierDetails:supplierState) =>{
    return axiosInstance.post("/supplier",supplierDetails)
}
export const getSpplierFn = async() =>{
    return axiosInstance.get("/supplier")
}
export const updateSpplierFn = async(supplierId:string,payload:supplierState) =>{
    return axiosInstance.put(`/supplier/${supplierId}`,payload)
}
export const deleteSpplierFn = async(supplierId:string) =>{
    await axiosInstance.delete(`/supplier/${supplierId}`);
    return supplierId
}
// for Inventory Add Products
export const getProductsFn=async()=>{
    return axiosInstance.get("/product")
}
export const deleteProductsFn=async(prodId:string)=>{
    await axiosInstance.delete(`/product/${prodId}`)
    return prodId
}
export const postProductsFn=async(payload:AddProductInput) => {
    return axiosInstance.post("/product",payload)
}
export const updateProductsFn = async(productId:string,payload:AddProductInput) =>{
    return axiosInstance.put(`/product/${productId}`,payload)
}

// for Order
export const createOrderFn = async (orderData: OrderPayload) => {
  const response = await axiosInstance.post("/order", orderData);
  return response.data;
};
export const getOrderFn = async() => {
    return axiosInstance.get("/order")
}
export const getOrderDetailsFn = async(supplierId:string) => {
    const resposne= axiosInstance.get(`/order/${supplierId}`);
    return resposne;
}

// Inventory
export const getInventoryFn = async() => {
    return axiosInstance.get("/inventory")
}



