import { Document, Types } from "mongoose";

export interface ProductDoc extends Document {
  name: string;
  category: Types.ObjectId;
  subCategory: string;
  price: number;
  gender: string;
  stock: {
    total: number;
    sold: number;
    damaged: number;
    returned: number;
    amountSold: Number;
  };
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  reviews: {
    userName: string;
    rating: number;
    review: string;
  }[];
}
