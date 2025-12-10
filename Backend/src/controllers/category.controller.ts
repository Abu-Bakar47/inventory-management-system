import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CategoryService } from "../services/category.service";

interface StoreRequest extends Request {
  storeId?: string;
}

export const createCategory = async (req: StoreRequest, res: Response) => {
  const category = await CategoryService.create(req.storeId! as string, req.body);
  res.status(StatusCodes.CREATED).json({ category });
};

export const listCategories = async (req: StoreRequest, res: Response) => {
  const categories = await CategoryService.list(req.storeId! as string);
  console.log("Categories:", categories);
  console.log("Store ID:", req.storeId);
  res.json({ categories });
};

export const getCategory = async (req: StoreRequest, res: Response) => {
  const cat = await CategoryService.get(req.storeId! as string, req.params.id);
  if (!cat) return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
  res.json({ category: cat });
};

export const updateCategory = async (req: StoreRequest, res: Response) => {
  const cat = await CategoryService.update(req.storeId! as string, req.params.id, req.body);
  if (!cat) return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
  res.json({ category: cat });
};

export const deleteCategory = async (req: StoreRequest, res: Response) => {
  const cat = await CategoryService.remove(req.storeId! as string, req.params.id);
  if (!cat) return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
  res.json({ message: "Deleted", category: cat });
};