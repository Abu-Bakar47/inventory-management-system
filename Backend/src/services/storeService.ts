// import Store from "../models/Store";

// export const createStore = async (
//   userId: string,
//   address:string,
//   name?: string,
//   manager?:string,
//   mobile?: string,
//   photo?: string,
  
// ) => {
//   const existingStore = await Store.findOne({
//     $or: [{ userId }, { name }],
//   });

//   if (existingStore) throw new Error('Store already registered');  

//   return await Store.create({
//     userId,
//     name,
//     address,
//     manager,
//     mobile,
//     photo,
//   });
// };

import Store, { IStore } from "../models/Store";
import { logAction } from "./auditLogService";

export const createStore = async (
  userId: string,
  address: string,
  name?: string,
  manager?: string,
  mobile?: string,
  photo?: string,
) => {
  if (!address) throw new Error('Address is required');
  
  // Check existing store for user
  // const existingUserStore = await Store.findOne({ userId });
  // if (existingUserStore) throw new Error('User already has a store');

  // Check store name uniqueness
  if (name) {
    const existingNameStore = await Store.findOne({ name });
    if (existingNameStore) throw new Error('Store name already registered');
  }

  const store = await Store.create({
    owner:userId,
    name,
    address,
    manager,
    mobile,
    photo,
    status: 'pending',
  });

  // Add audit log
  await logAction(userId, 'store_create', `Store created: ${name || 'Unnamed store'}`);

  return store;
};

export function listStores(ownerId: string) {
  console.log("ownerId inside listStores service", ownerId)
  console.log("result",Store.find({ userId: ownerId }).sort({ createdAt: -1 }))
  return Store.find({ owner: ownerId }).sort({ createdAt: -1 });
}

export function getStore(ownerId: string, id: string) {
  return Store.findOne({ _id: id, owner: ownerId });
}

// Update store details
export function updateStore(ownerId: string, id: string, updateData: Partial<IStore>) {
  return Store.findOneAndUpdate(
    { _id: id, owner: ownerId },
    { $set: updateData },
    { new: true }
  );
}

export function removeStore(ownerId: string, id: string) {
  return Store.findOneAndDelete({ _id: id, owner: ownerId });
}

export function listAllStores(){
  return Store.find({})
}

export const selectStore = async (ownerId: string, storeId: string): Promise<IStore | null> => {
  // Deselect all stores of the owner
  await Store.updateMany({ owner: ownerId }, { $set: { selected: false } });

  // Select the given store
  return await Store.findOneAndUpdate(
    { _id: storeId, owner: ownerId },
    { $set: { selected: true } },
    { new: true }
  );
};

/**
 * Get the currently selected store for an owner
 */
export const getSelectedStore = async (ownerId: string): Promise<IStore | null> => {
  return await Store.findOne({ owner: ownerId, selected: true });
};