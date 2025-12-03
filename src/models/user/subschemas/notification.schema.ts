import { Schema } from "mongoose";
import { INotification } from "../../../types/user.types";

export const NotificationSchema = new Schema<INotification>({
  message: { type: String, required: true },
  type: { type: String, enum: ["order", "promo", "system"], default: "system" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
