import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { requireStore } from "../middlewares/store.middleware";
import { createPO, deletePO, getPO, listPO, receivePO } from "../controllers/order.controller";

const router = Router();
router.use(auth(), requireStore);
router.post("/", createPO);
router.get("/", listPO);
router.get("/:id", getPO);
router.post("/:id/receive", receivePO);
// router.put("/:id", updatePO);  
router.delete("/:id", deletePO);
export default router;