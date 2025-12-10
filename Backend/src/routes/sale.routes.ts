import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { requireStore } from "../middlewares/store.middleware.js";
import { createSale, getSale, listSales } from "../controllers/sale.controller.js";

const router = Router();
router.use(auth(), requireStore);
router.post("/", createSale);
router.get("/", listSales);
router.get("/:id", getSale);
export default router;