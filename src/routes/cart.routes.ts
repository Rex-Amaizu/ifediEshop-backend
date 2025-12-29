import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, CartController.getCart);
router.post("/", authMiddleware, CartController.addToCart);
router.put("/:productId", authMiddleware, CartController.updateQuantity);
router.delete("/:productId", authMiddleware, CartController.removeFromCart);
router.delete("/", authMiddleware, CartController.clearCart);

export default router;
