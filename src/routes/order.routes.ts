import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, OrderController.add);
router.get("/", authMiddleware, OrderController.fetch);
router.delete("/:orderId", authMiddleware, OrderController.deleteOne);
router.delete("/", authMiddleware, OrderController.deleteAll);

export default router;
