import { Schema, model, Document, Types } from "mongoose";
import { AddressSchema } from "./subschemas/address.schema";
import { CartItemSchema } from "./subschemas/cart.schema";
import { NotificationSchema } from "./subschemas/notification.schema";
import { IUser, Role } from "../types/user.types";

const UserSchema = new Schema<IUser>(
  {
    // REQUIRED AT SIGNUP
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.USER },

    // OPTIONAL INFO
    phoneNumber: { type: String },

    isVerified: { type: Boolean, default: false },

    // ADDRESSES
    addresses: {
      type: [AddressSchema],
      default: [],
    },

    // USER CART
    userCart: {
      type: [CartItemSchema],
      default: [],
    },

    // WISHLIST
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],

    // NOTIFICATIONS
    notifications: {
      type: [NotificationSchema],
      default: [],
    },

    lastLogin: { type: Date },
  },
  {
    timestamps: true, // adds createdAt, updatedAt automatically
  }
);

export const User = model<IUser>("User", UserSchema);
