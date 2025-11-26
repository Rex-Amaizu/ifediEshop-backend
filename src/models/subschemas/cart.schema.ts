import { Schema } from "mongoose";
import { ICartItem } from "../../types/user.types";

export const CartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  addedAt: { type: Date, default: Date.now },
});
