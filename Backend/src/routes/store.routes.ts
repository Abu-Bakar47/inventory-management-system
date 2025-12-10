import { Router } from "express";
import { createStoreController, deleteMyStore, getAllStores, getMyStore, getMyStores, getSelectedStore, selectStore, updateStore } from "../controllers/store.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();
router.use(auth());
router.post("/", createStoreController);
router.get("/all", getAllStores) // for admin
router.get("/", getMyStores);
router.get("/selected", getSelectedStore); // get currently selected store
router.post("/select/:id", selectStore); // select a store
router.get("/:id", getMyStore);      
router.put("/:id", updateStore)
router.delete("/:id", deleteMyStore); 

export default router;