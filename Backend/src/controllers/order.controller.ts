import { Request, Response } from "express";
import { PurchaseOrderService } from "../services/order.service";
import { StatusCodes } from "http-status-codes";
interface StoreRequest extends Request {
  storeId?: string;
}

export const createPO = async (req: StoreRequest, res: Response) => {
  const po = await PurchaseOrderService.create(req.storeId as string, req.body);
  res.status(StatusCodes.CREATED).json({ purchaseOrder: po });
};
export const listPO = async (req: StoreRequest, res: Response) => {
  const list = await PurchaseOrderService.list(req.storeId as string);
  res.json({ purchaseOrders: list });
};
export const getPO = async (req: StoreRequest, res: Response) => {
  const po = await PurchaseOrderService.get(req.storeId as string, req.params.id);
  if (!po) return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
  res.json({ purchaseOrder: po });
};
export const receivePO = async (req: StoreRequest, res: Response) => {
  const po = await PurchaseOrderService.markReceived(req.storeId as string, req.params.id, req.user?.id);
  res.json({ purchaseOrder: po });
};
// export const updatePO = async (req: StoreRequest, res: Response) => {
//   const po = await PurchaseOrderService.update(req.storeId as string, req.params.id, req.body);
//   res.json({ purchaseOrder: po });
// };
export const deletePO = async (req: StoreRequest, res: Response) => {
  const po = await PurchaseOrderService.remove(req.storeId as string, req.params.id);
  res.json({ message: "Deleted", purchaseOrder: po });
};
