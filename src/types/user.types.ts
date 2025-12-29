import { Document, Types } from "mongoose";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

// Cart Items
export interface ICartItem {
  _id: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  selectedColor: string | null;
  selectedSize: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type CartItemInput = {
  product: Types.ObjectId;
  quantity: number;
  selectedColor: string | null;
  selectedSize: string | null;
};

export interface IAddress {
  _id?: Types.ObjectId;
  id?: string;
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

  addresses: Types.DocumentArray<IAddress>;
  wishlist: Types.ObjectId[]; // optional

  notifications: INotification[]; // auto default empty
  userCart: ICartItem[]; // cart items
  orders: Types.DocumentArray<IOrder> | IOrder[];

  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type PopulatedProduct = {
  _id: string;
  name: string;
  price: number;
  images: string[];
  colors?: string[];
  sizes?: string[];
};

// -------------------- ORDERS --------------------
export interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  price: number; // store price at time of purchase
  selectedColor?: string | null;
  selectedSize?: string | null;
}

export interface IOrder {
  _id?: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  createdAt?: Date;
}
