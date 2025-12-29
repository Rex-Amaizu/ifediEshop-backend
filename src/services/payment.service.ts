import axios from "axios";
import { PaymentRepository } from "../repositories/payment.repositories";

const payRepo = new PaymentRepository();

export class PaymentService {
  async initialize(email: string, amount: number, metadata: any = {}) {
    const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;
    const FRONTEND_URL = process.env.FRONTEND_URL!;

    // return console.log("sec", PAYSTACK_SECRET);

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100,
        callback_url: `${FRONTEND_URL}/checkout/pay/success/`,
        metadata,
      },
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } }
    );

    // Save initial payment
    await payRepo.create({
      email,
      amount,
      status: "pending",
      reference: response.data.data.reference,
      metadata,
    });

    return response.data.data;
  }

  async verify(reference: string) {
    const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;

    const existingPayment = await payRepo.findByReference(reference);

    if (!existingPayment) {
      throw new Error("Payment reference not found");
    }

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } }
    );

    const status = response.data.data.status; // success | failed

    await payRepo.updateStatus(reference, status);

    return response.data.data;
  }
}
