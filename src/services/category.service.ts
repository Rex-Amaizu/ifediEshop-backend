import { CategoryRepository } from "../repositories/category.repository";

const categoryRepo = new CategoryRepository();

export class CategoryService {
  async addCategory(data: any) {
    const category = await categoryRepo.findByIdField(data.name); // see repo method below
    if (category) throw new Error("Category Already exists!");
    return categoryRepo.create(data);
  }

  getAll() {
    return categoryRepo.findAll();
  }

  async getSingle(id: string) {
    const category = await categoryRepo.findById(id); // see repo method below
    if (!category) throw new Error("Category not found!");
    return categoryRepo.findById(id);
  }

  async update(id: string, name: string) {
    const category = await categoryRepo.findById(id); // see repo method below
    if (!category) throw new Error("Category not found!");
    return categoryRepo.update(id, { name });
  }

  async delete(id: string) {
    const category = await categoryRepo.findById(id); // see repo method below
    if (!category) throw new Error("Category not found!");
    return categoryRepo.delete(id);
  }
}
