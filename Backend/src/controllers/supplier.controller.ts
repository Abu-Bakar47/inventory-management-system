import { Request, Response } from "express";
import { SupplierService } from "../services/supplier.service";
import { StatusCodes } from "http-status-codes";

interface StoreRequest extends Request {
  storeId?: string;
}

export const createSupplier = async (req: StoreRequest, res: Response) => {
  const s = await SupplierService.create(req.storeId as string, req.body);
  res.status(StatusCodes.CREATED).json({ supplier: s });
};
export const listSuppliers = async (req: StoreRequest, res: Response) => {
  const list = await SupplierService.list(req.storeId as string);
  res.json({ suppliers: list });
};
export const getSupplier = async (req: StoreRequest, res: Response) => {
  const s = await SupplierService.get(req.storeId as string, req.params.id);
  if (!s) return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
  res.json({ supplier: s });
};
export const updateSupplier = async (req: StoreRequest, res: Response) => {
  const s = await SupplierService.update(req.storeId as string, req.params.id, req.body);
  res.json({ supplier: s });
};
export const deleteSupplier = async (req: StoreRequest, res: Response) => {
  const s = await SupplierService.remove(req.storeId as string, req.params.id);
  res.json({ message: "Deleted", supplier: s });
};