import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { upload } from "../middlewares/upload.midlleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.array("images", 10),
  ProductController.add
);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getSingle);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.array("images", 10),
  ProductController.update
);
router.put("/:id/deduct-stock", ProductController.deductStock);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  ProductController.delete
);

export default router;
