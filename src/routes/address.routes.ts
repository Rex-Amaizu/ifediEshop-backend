import { Router } from "express";
import { AddressController } from "../controllers/address.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Add new user address
router.post("/", authMiddleware, AddressController.addNew);

// Get all addresses of logged-in user
router.get("/", authMiddleware, AddressController.getAll);

// Update an address
router.put("/:addressId", authMiddleware, AddressController.update);

// Delete an address
router.delete("/:addressId", authMiddleware, AddressController.delete);

export default router;
