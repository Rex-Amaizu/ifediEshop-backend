import { Schema, model, Types } from "mongoose";

const OrderItemSchema = new Schema(
  {
    product: { type: Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
  },
  { _id: false }
);

const ShippingAddressSchema = new Schema(
  {
    fullName: String,
    phoneNumber: String,
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },

    items: {
      type: [OrderItemSchema],
      required: true,
    },

    shippingAddress: {
      type: ShippingAddressSchema,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["paystack", "fincra"], // ✅ UPDATED ENUM
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    subtotal: Number,
    shippingFee: Number,
    totalAmount: Number,
  },
  { timestamps: true }
);

export const Order = model("Order", OrderSchema);
