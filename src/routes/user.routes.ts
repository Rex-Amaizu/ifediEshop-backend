import { Router } from "express";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/admin-only", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default router;
