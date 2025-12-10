import { Request, Response } from "express";
import { SaleService } from "../services/sale.service.js";
import { StatusCodes } from "http-status-codes";

export const createSale = async (req: Request, res: Response) => {
  const sale = await SaleService.create(req.storeId as string, req.body, req.user?.id);
  res.status(StatusCodes.CREATED).json({ sale });
};
export const listSales = async (req: Request, res: Response) => {
  const list = await SaleService.list(req.storeId as string);
  res.json({ sales: list });
};
export const getSale = async (req: Request, res: Response) => {
  const sale = await SaleService.get(req.storeId as string, req.params.id);
  if (!sale) return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
  res.json({ sale });
};