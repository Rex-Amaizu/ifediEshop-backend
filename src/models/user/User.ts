import { Schema, model } from "mongoose";
import { AddressSchema } from "./subschemas/address.schema";
import { CartItemSchema } from "./subschemas/cart.schema";
import { NotificationSchema } from "./subschemas/notification.schema";
import { OrderSchema } from "./subschemas/order.schema";
import { IUser, Role } from "../../types/user.types";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.USER },

    phoneNumber: { type: String },
    isVerified: { type: Boolean, default: false },

    addresses: { type: [AddressSchema], default: [] },
    userCart: { type: [CartItemSchema], default: [] },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    notifications: { type: [NotificationSchema], default: [] },

    // NEW FIELD
    orders: { type: [OrderSchema], default: [] },

    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
