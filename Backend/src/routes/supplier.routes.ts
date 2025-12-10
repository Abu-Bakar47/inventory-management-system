import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { requireStore } from "../middlewares/store.middleware";
import { createSupplier, deleteSupplier, getSupplier, listSuppliers, updateSupplier } from "../controllers/supplier.controller";

const router = Router();
router.use(auth(), requireStore);
router.post("/", createSupplier);
router.get("/", listSuppliers);
router.get("/:id", getSupplier);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);
export default router;
