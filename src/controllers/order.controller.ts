import { Request, Response } from "express";
import { OrderService } from "../services/order.service";

const orderService = new OrderService();

export class OrderController {
  static async add(req: Request, res: Response) {
    try {
      const order = await orderService.addUserOrder(req.user.id, req.body);

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order,
      });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async fetch(req: Request, res: Response) {
    try {
      const orders = await orderService.fetchUserOrders(req.user.id);

      res.json({
        success: true,
        message: "Orders fetched successfully",
        data: orders,
      });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async deleteOne(req: Request, res: Response) {
    try {
      await orderService.deleteSpecificUserOrder(
        req.user.id,
        req.params.orderId
      );

      res.json({
        success: true,
        message: "Order deleted successfully",
      });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async deleteAll(req: Request, res: Response) {
    try {
      await orderService.deleteAllUserOrders(req.user.id);

      res.json({
        success: true,
        message: "All orders deleted successfully",
      });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}
