// =============================
// File: src/controllers/store.controller.ts
// =============================
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as storeService from "../services/storeService";


export const createStoreController = async (req: Request, res: Response) => {
  const { name, address } = req.body;
  const store = await storeService.createStore(req.user!.id, address, name);
  res.status(StatusCodes.CREATED).json({ store });
};

export const getMyStores = async (req: Request, res: Response) => {
  console.log("user inside getMyStores controller", req.user)
  const stores = await storeService.listStores(req.user!.id);
  console.log("stores inside getMyStores controller", stores)
  res.json({ stores });
};

export const getMyStore = async (req: Request, res: Response) => {
  console.log("user inside getMyStore controller", req.user)
  console.log("id inside getMyStore controller", req.params.id)
  const store = await storeService.getStore(req.user!.id, req.params.id);
  if (!store) return res.status(StatusCodes.NOT_FOUND).json({ message: "Store not found" });
  res.json({ store });
};

export const deleteMyStore = async (req: Request, res: Response) => {
  const store = await storeService.removeStore(req.user!.id, req.params.id);
  if (!store) return res.status(StatusCodes.NOT_FOUND).json({ message: "Store not found" });
  res.json({ message: "Deleted", store });
};

// For Admin

export const getAllStores = async (req:Request, res:Response) => {
  if(req.user?.role !== "admin"){
    res.json({message:"Not authorized"})
  }
  const allStores = await storeService.listAllStores()
  res.json({allStores})
}

export const selectStore = async (req: Request, res: Response) => {
  try {
    const storeId  = req.params.id;
    const ownerId = req.user!.id; // assuming you store user id in req.user

    const store = await storeService.selectStore(ownerId, storeId);

    if (!store) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Store not found" });
    }

    return res.status(StatusCodes.OK).json({
      message: "Store selected successfully",
      store,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error selecting store", error });
  }
};

export const getSelectedStore = async (req: Request, res: Response) => {
  try {
    const ownerId = req.user!.id; // assuming you store user id in req.user

    const store = await storeService.getSelectedStore(ownerId);

    if (!store) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "No store selected" });
    }

    return res.status(StatusCodes.OK).json(store);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error fetching selected store", error });
  }
};

export const updateStore = async (req: Request, res: Response) => {
  try {
    const ownerId = req.user!.id;
    const storeId = req.params.id;
    const updateData = req.body;
    const updatedStore = await storeService.updateStore(ownerId, storeId, updateData);
    if (!updatedStore) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Store not found" });
    }
    return res.status(StatusCodes.OK).json({ message: "Store updated successfully", store: updatedStore });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error updating store", error });
  } 
};