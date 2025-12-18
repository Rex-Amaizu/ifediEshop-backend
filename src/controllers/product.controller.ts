import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

const productService = new ProductService();

export class ProductController {
  static async add(req: Request, res: Response) {
    try {
      const p = await productService.addProduct(
        req.body,
        req.files as Express.Multer.File[]
      );
      res
        .status(201)
        .json({ message: "Product created successfully!", data: p });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      res.json(await productService.getAll());
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getSingle(req: Request, res: Response) {
    try {
      res.json(await productService.getSingle(req.params.id));
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const p = await productService.update(
        req.params.id,
        req.body,
        req.files as Express.Multer.File[]
      );
      res.json({ message: "Product updated successfuly!", data: p });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deleteProduct = await productService.delete(req.params.id);
      res.json({
        message: "Product deleted successfully",
        data: deleteProduct,
      });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
