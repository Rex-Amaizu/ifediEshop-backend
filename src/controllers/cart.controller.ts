import { Request, Response } from "express";
import { CartService } from "../services/cart.services";

const cartService = new CartService();

export class CartController {
  static async getCart(req: Request, res: Response) {
    try {
      const cart = await cartService.getCart(req.user.id);
      res.json({
        message: "Cart fetched successfully",
        data: cart,
      });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async addToCart(req: Request, res: Response) {
    try {
      const cart = await cartService.addToCart(
        req.user.id,
        req.body.productId,
        req.body.quantity,
        req.body.color,
        req.body.size
      );
      res.status(201).json({ message: "Item added to cart", data: cart });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateQuantity(req: Request, res: Response) {
    try {
      const cart = await cartService.updateQuantity(
        req.user.id,
        req.params.productId,
        req.body.quantity
      );
      res.json({ message: "Cart updated", data: cart });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async removeFromCart(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const { color, size } = req.body; // pass color and size in the request body

      const cart = await cartService.removeFromCart(
        req.user.id,
        productId,
        color ?? null,
        size ?? null
      );

      res.json({ message: "Item removed from cart", data: cart });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async clearCart(req: Request, res: Response) {
    try {
      const data = await cartService.clearCart(req.user.id);
      res.json({
        message: "Cart cleared",
        data,
      });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
