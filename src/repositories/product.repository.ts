import Product from "../models/product/product.model";

export class ProductRepository {
  create(data: any) {
    return Product.create(data);
  }

  findAll() {
    return Product.find().populate("category");
  }

  findByIdField(name: string) {
    return Product.findOne({ name });
  }

  findSingle(id: string) {
    return Product.findById(id).populate("category");
  }

  update(id: string, data: any) {
    return Product.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return Product.findByIdAndDelete(id);
  }
}
