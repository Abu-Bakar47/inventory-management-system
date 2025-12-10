import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { requireStore } from "../middlewares/store.middleware";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from "../controllers/product.controller";

const router = Router();
router.use(auth(), requireStore);
router.post("/", createProduct);
router.get("/", listProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
export default router;
