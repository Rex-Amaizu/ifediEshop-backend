import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

router.post("/", authMiddleware, adminMiddleware, CategoryController.add);
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getSingle);
router.put("/:id", authMiddleware, adminMiddleware, CategoryController.update);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  CategoryController.delete
);

export default router;
