import mongoose, { Schema } from "mongoose";
import { CategoryDoc } from "../types/category.types";

const categorySchema = new Schema<CategoryDoc>(
  {
    name: { type: String, required: true },
    creator: { type: String, required: true },
  },

  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
