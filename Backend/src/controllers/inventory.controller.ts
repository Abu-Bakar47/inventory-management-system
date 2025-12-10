import { Request, Response } from "express";
import { InventoryService } from "../services/inventory.service";
import { StatusCodes } from "http-status-codes";

// interface StoreRequest extends Request {
//   storeId?: string;
// }

// export const listInventory = async (req: StoreRequest, res: Response) => {
//   const items = await InventoryService.list(req.storeId as string);
//   res.json({ inventory: items });
// };

// export const adjustInventory = async (req: StoreRequest, res: Response) => {
//   const { product, delta, reason } = req.body; // delta can be + or -
//   const inv = await InventoryService.adjust({ store: req.storeId as string, product, delta, type: "adjust", reason, createdBy: req.user!.id });
//   res.status(StatusCodes.OK).json({ inventory: inv });
// };



interface StoreRequest extends Request {
  storeId?: string;
}

export const listInventory = async (req: StoreRequest, res: Response) => {
  try {
    const items = await InventoryService.list(req.storeId as string);
    res.json({ inventory: items });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: 'Failed to fetch inventory' 
    });
  }
};

export const adjustInventory = async (req: StoreRequest, res: Response) => {
  try {
    const { product, delta, reason } = req.body;
    const inv = await InventoryService.adjust({ 
      store: req.storeId as string, 
      product, 
      delta, 
      type: "adjust", 
      reason, 
      createdBy: req.user!.id 
    });
    res.status(StatusCodes.OK).json({ inventory: inv });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ 
      error: error instanceof Error ? error.message : 'Failed to adjust inventory' 
    });
  }
};

export const getLowStock = async (req: StoreRequest, res: Response) => {
  try {
    const items = await InventoryService.getLowStock(req.storeId as string);
    res.json({ 
      count: items.length,
      items 
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: 'Failed to fetch low stock items' 
    });
  }
};

export const getOutOfStock = async (req: StoreRequest, res: Response) => {
  try {
    const items = await InventoryService.getOutOfStock(req.storeId as string);
    res.json({ 
      count: items.length,
      items 
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: 'Failed to fetch out of stock items' 
    });
  }
};

export const getInventorySummary = async (req: StoreRequest, res: Response) => {
  try {
    const summary = await InventoryService.getSummary(req.storeId as string);
    res.json(summary);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: 'Failed to fetch inventory summary' 
    });
  }
};

// export const updateReorderSettings = async (req: StoreRequest, res: Response) => {
//   try {
//     const { productId } = req.params;
//     const { reorderLevel, reorderQuantity, maxStockLevel, location } = req.body;
    
//     const inv = await InventoryService.updateReorderSettings(
//       req.storeId as string,
//       productId,
//       { reorderLevel, reorderQuantity, maxStockLevel, location }
//     );
    
//     res.json({ inventory: inv });
//   } catch (error) {
//     res.status(StatusCodes.BAD_REQUEST).json({ 
//       error: 'Failed to update reorder settings' 
//     });
//   }
// };

// export const reserveInventory = async (req: StoreRequest, res: Response) => {
//   try {
//     const { product, quantity } = req.body;
//     const inv = await InventoryService.reserve(
//       req.storeId as string,
//       product,
//       quantity
//     );
//     res.json({ inventory: inv });
//   } catch (error) {
//     res.status(StatusCodes.BAD_REQUEST).json({ 
//       error: error instanceof Error ? error.message : 'Failed to reserve inventory' 
//     });
//   }
// };

// export const releaseInventory = async (req: StoreRequest, res: Response) => {
//   try {
//     const { product, quantity } = req.body;
//     const inv = await InventoryService.releaseReservation(
//       req.storeId as string,
//       product,
//       quantity
//     );
//     res.json({ inventory: inv });
//   } catch (error) {
//     res.status(StatusCodes.BAD_REQUEST).json({ 
//       error: 'Failed to release inventory reservation' 
//     });
//   }
// };


