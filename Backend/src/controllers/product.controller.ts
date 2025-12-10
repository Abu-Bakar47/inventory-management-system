import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { StatusCodes } from "http-status-codes";

interface StoreRequest extends Request {
  storeId?: string;
}

export const createProduct = async (req: StoreRequest, res: Response) => {
  const p = await ProductService.create(req.storeId as string, req.body);
  res.status(StatusCodes.CREATED).json({ product: p });
};
export const listProducts = async (req: StoreRequest, res: Response) => {
  const p = await ProductService.list(req.storeId as string, req.query.q as string | undefined);
  res.json({ products: p });
};
export const getProduct = async (req: StoreRequest, res: Response) => {
  const p = await ProductService.get(req.storeId as string, req.params.id);
  if (!p) return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
  res.json({ product: p });
};
export const updateProduct = async (req: StoreRequest, res: Response) => {
  const p = await ProductService.update(req.storeId as string, req.params.id, req.body);
  if (!p) return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
  res.json({ product: p });
};
export const deleteProduct = async (req: StoreRequest, res: Response) => {
  const p = await ProductService.remove(req.storeId as string, req.params.id);
  res.json({ message: "Deleted", product: p });
};