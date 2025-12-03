import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

const categoryService = new CategoryService();

export class CategoryController {
  static async add(req: Request, res: Response) {
    try {
      const cat = await categoryService.addCategory(req.body.name);
      res.status(201).json(cat);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    res.json(await categoryService.getAll());
  }

  static async getSingle(req: Request, res: Response) {
    try {
      res.json(await categoryService.getSingle(req.params.id));
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updatedCat = await categoryService.update(
        req.params.id,
        req.body.name
      );
      res
        .status(201)
        .json({ message: "Category Updated Successfully", data: updatedCat });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deletedCat = await categoryService.delete(req.params.id);
      res.status(201).json({
        message: "Category Deleted Successfully",
        data: deletedCat,
      });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
