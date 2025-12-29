import { Schema } from "mongoose";
import { IOrder, IOrderItem } from "../../../types/user.types";

export const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  selectedColor: { type: String, default: null },
  selectedSize: { type: String, default: null },
});

export const OrderSchema = new Schema<IOrder>({
  items: { type: [OrderItemSchema], required: true },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});
