import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import videoRoutes from "./routes/video.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import { errorHandler } from "./middlewares/error.middleware";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

app.use(errorHandler);
