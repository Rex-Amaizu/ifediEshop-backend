import { Router } from "express";
import multer from "multer";
import { VideoController } from "../controllers/video.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("video"),
  VideoController.addVideo
);
router.get("/", VideoController.getAllVideos);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  VideoController.updateVideo
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  VideoController.deleteVideo
);

export default router;
