import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { requireStore } from "../middlewares/store.middleware";
import { adjustInventory, getInventorySummary, getLowStock, getOutOfStock, listInventory } from "../controllers/inventory.controller";

const router = Router();

// Apply auth and store middleware to all routes
router.use(auth(), requireStore);

// Basic inventory operations
router.get("/", listInventory);
router.post("/adjust", adjustInventory);

// Alerts and monitoring
router.get("/low-stock", getLowStock);
router.get("/out-of-stock", getOutOfStock);
router.get("/summary", getInventorySummary);

// Reorder settings
// router.patch("/:productId/reorder-settings", updateReorderSettings);

// Reservation management (for orders)
// router.post("/reserve", reserveInventory);
// router.post("/release", releaseInventory);

export default router;