import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Store from "../models/Store";

interface StoreRequest extends Request {
  storeId?: string;
}

// Require X-Store-Id header and check ownership
export async function requireStore(req: StoreRequest, res: Response, next: NextFunction) {
  const storeId = (req.headers["x-store-id"] as string) || (req.query.storeId as string) || (req.params.storeId as string);
  if (!storeId) return res.status(StatusCodes.BAD_REQUEST).json({ message: "X-Store-Id header is required" });
  if (!req.user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });

  const store = await Store.findOne({ _id: storeId, owner: req.user.id }) as (typeof Store & { _id: string });
  if (!store) return res.status(StatusCodes.FORBIDDEN).json({ message: "Store not found or not owned by user" });

  req.storeId = store?._id?.toString();
  next();
}