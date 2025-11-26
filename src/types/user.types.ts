import { Document, Types } from "mongoose";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

// Cart Items
export interface ICartItem {
  product: Types.ObjectId;
  quantity: number;
  addedAt?: Date;
}

// Addresses
export interface IAddress {
  fullName: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  isDefault?: boolean;
}

// Notifications
export interface INotification {
  message: string;
  type: "order" | "promo" | "system";
  read: boolean;
  createdAt: Date;
}

// FULL USER INTERFACE
export interface IUser extends Document {
  name: string; // required at signup
  email: string; // required at signup
  password: string; // required at signup
  role: Role; // required (default=user)

  phoneNumber?: string; // optional
  isVerified: boolean; // auto false

  addresses: IAddress[]; // optional
  wishlist: Types.ObjectId[]; // optional

  notifications: INotification[]; // auto default empty
  userCart: ICartItem[]; // cart items

  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
