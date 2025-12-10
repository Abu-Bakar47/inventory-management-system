import { Router } from "express";
import { requireStore } from "../middlewares/store.middleware";
import { createCategory, deleteCategory, getCategory, listCategories, updateCategory } from "../controllers/category.controller";
import { auth } from "../middlewares/auth.middleware";

console.log("inside category.routes.ts");

const router = Router();
router.use(auth(), requireStore);
router.post("/", createCategory);
router.get("/", listCategories);
router.get("/:id", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
export default router;