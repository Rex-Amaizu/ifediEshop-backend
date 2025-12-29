import mongoose, { Schema } from "mongoose";

export interface PaymentDoc {
  email: string;
  amount: number;
  reference: string;
  status: "pending" | "success" | "failed";
  metadata?: Record<string, any>;
}

const paymentSchema = new Schema<PaymentDoc>(
  {
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    reference: { type: String, required: true, unique: true },
    status: { type: String, default: "pending" },
    metadata: { type: Object },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
