import Category from "../models/category.model";

export class CategoryRepository {
  create(data: any) {
    return Category.create(data);
  }
  findAll() {
    return Category.find();
  }
  findById(id: string) {
    return Category.findById(id);
  }

  findByIdField(name: string) {
    return Category.findOne({ name });
  }
  update(id: string, data: any) {
    return Category.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id: string) {
    return Category.findByIdAndDelete(id);
  }
}
