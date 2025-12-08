import { ProductRepository } from "../repositories/product.repository";
import { CategoryRepository } from "../repositories/category.repository";
import { uploadBufferToCloudinary } from "../utils/cloudinary";

const productRepo = new ProductRepository();
const categoryRepo = new CategoryRepository();

function tryJsonParse(value: any) {
  if (!value) return value;

  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  return value;
}

export class ProductService {
  async addProduct(data: any, files: Express.Multer.File[]) {
    const categoryExists = await categoryRepo.findById(data.category);
    if (!categoryExists) throw new Error("Category does not exist");

    const productExists = await productRepo.findByIdField(data.name);
    if (!productExists)
      throw new Error(
        `This exact product name ${data.name} exist. Edit name and try again!`
      );

    // Parse JSON fields (Fix for Postman & frontend)
    data.colors = tryJsonParse(data.colors);
    data.sizes = tryJsonParse(data.sizes);
    data.reviews = tryJsonParse(data.reviews);
    data.stock = tryJsonParse(data.stock);

    // Upload images to cloudinary
    const imageUrls: string[] = [];
    for (const file of files) {
      const url = await uploadBufferToCloudinary(file.buffer, "products");
      imageUrls.push(url);
    }

    const payload = {
      ...data,
      images: imageUrls,
    };

    const createProduct = await productRepo.create(payload);

    if (!createProduct) throw new Error("Oops Something went wrong!");

    return createProduct;
  }

  getAll() {
    const products = productRepo.findAll();

    if (!products) throw new Error("Products not fetched!");
    return products;
  }

  getSingle(id: string) {
    const prod = productRepo.findSingle(id);
    if (!prod) throw new Error("Product not fetched");
    return prod;
  }

  async update(id: string, data: any, files: Express.Multer.File[]) {
    data.colors = tryJsonParse(data.colors);
    data.sizes = tryJsonParse(data.sizes);
    data.reviews = tryJsonParse(data.reviews);
    data.stock = tryJsonParse(data.stock);
    let imageUrls: string[] = [];

    // If new images are uploaded
    if (files?.length) {
      for (const file of files) {
        const url = await uploadBufferToCloudinary(file.buffer, "products");
        imageUrls.push(url);
      }

      data.images = imageUrls;
    }

    const confirmProduct = productRepo.update(id, data);
    if (!confirmProduct) throw new Error("Product does not exist!");
    return confirmProduct;
  }

  delete(id: string) {
    const deleteProd = productRepo.delete(id);
    if (!deleteProd) throw new Error("Product not deleted!");
    return deleteProd;
  }
}
