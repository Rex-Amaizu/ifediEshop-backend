import { Document } from "mongoose";

export interface VideoDocument extends Document {
  type: string;
  src: string;
  id: string;
  asset_id: string;
  etag: string;
  createdAt: Date;
  updatedAt: Date;
}
