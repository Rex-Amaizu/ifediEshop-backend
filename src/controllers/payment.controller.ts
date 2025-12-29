import { Request, Response } from "express";
import { PaymentService } from "../services/payment.service";

const paymentService = new PaymentService();

export class PaymentController {
  static async initialize(req: Request, res: Response) {
    try {
      const { email, amount, metadata } = req.body;
      const data = await paymentService.initialize(email, amount, metadata);
      res.json({ message: "Payment initialized", data });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async verify(req: Request, res: Response) {
    try {
      const { reference } = req.params;
      const data = await paymentService.verify(reference);
      res.json({ message: "Verification complete", data });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
