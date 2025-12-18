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
    if (productExists)
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

    // 5️⃣ Build category array (🔥 IMPORTANT PART)
    const categoryPayload = [
      {
        id: categoryExists._id,
        name: categoryExists.name,
      },
    ];

    // 6️⃣ Replace category ID with category object array
    const payload = {
      ...data,
      category: categoryPayload,
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
    const productExists = await productRepo.findProductById(id);
    if (!productExists) throw new Error("Product not found");

    const payload: any = { ...data };
    let imageUrls: string[] = [];

    if (data.category) {
      const categoryExists = await categoryRepo.findById(data.category);
      if (!categoryExists) throw new Error("Category does not exist");
      const categoryPayload = [
        {
          id: categoryExists._id,
          name: categoryExists.name,
        },
      ];
      payload.category = categoryPayload;
    }

    if (data.colors) {
      payload.colors = tryJsonParse(data.colors);
    }
    if (data.sizes) {
      payload.sizes = tryJsonParse(data.sizes);
    }
    if (data.name) {
      payload.name = tryJsonParse(data.name);
    }
    if (data.subCategory) {
      payload.subCategory = tryJsonParse(data.subCategory);
    }
    if (data.price) {
      payload.price = tryJsonParse(data.price);
    }
    if (data.gender) {
      payload.gender = tryJsonParse(data.gender);
    }

    if (data.stock) {
      const incoming = JSON.parse(data.stock);
      payload.stock = {
        total: Math.max(0, incoming.total ?? productExists.stock.total),
        sold: Math.max(0, incoming.sold ?? productExists.stock.sold),
        damaged: Math.max(0, incoming.damaged ?? productExists.stock.damaged),
        returned: Math.max(
          0,
          incoming.returned ?? productExists.stock.returned
        ),
        amountSold: Math.max(
          0,
          incoming.amountSold ?? productExists.stock.amountSold
        ),
      };
    }

    return productRepo.update(id, payload);
  }

  delete(id: string) {
    const deleteProd = productRepo.delete(id);
    if (!deleteProd) throw new Error("Product not deleted!");
    return deleteProd;
  }
}
