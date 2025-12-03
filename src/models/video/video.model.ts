import mongoose, { Schema, Document } from "mongoose";
import { VideoDocument } from "../../types/video.types";

const videoSchema = new Schema<VideoDocument>(
  {
    type: { type: String, required: true },
    src: { type: String, required: true },
    id: { type: String, required: true },
    etag: { type: String, required: true, unique: true }, // fingerprint
    asset_id: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("PromoVideo", videoSchema);
