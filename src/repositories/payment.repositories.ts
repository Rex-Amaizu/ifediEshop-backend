import Payment from "../models/payment.model";

export class PaymentRepository {
  create(data: any) {
    return Payment.create(data);
  }

  findByReference(ref: string) {
    return Payment.findOne({ reference: ref });
  }

  updateStatus(ref: string, status: string) {
    return Payment.findOneAndUpdate(
      { reference: ref },
      { status },
      { new: true }
    );
  }
}
