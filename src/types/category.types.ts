import { Document } from "mongoose";

export interface CategoryDoc extends Document {
  name: string;
}
