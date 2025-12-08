import mongoose, { Schema } from "mongoose";
import { ProductDoc } from "../../types/product.types";

const productSchema = new Schema<ProductDoc>(
  {
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory: String,
    price: Number,
    gender: String,

    stock: {
      total: Number,
      sold: Number,
      damaged: Number,
      returned: Number,
      amountSold: Number,
    },

    colors: [String],
    sizes: [String],
    images: [String],
    description: String,

    reviews: [
      {
        userName: String,
        rating: Number,
        review: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
