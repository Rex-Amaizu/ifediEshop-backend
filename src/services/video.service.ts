import cloudinary from "../utils/cloudinary";
import { VideoRepository } from "../repositories/video.repository";

const videoRepo = new VideoRepository();

export class VideoService {
  async addVideo(file: any, type: string) {
    if (!file) throw new Error("No video file uploaded");

    const upload = await cloudinary.uploader.upload(file.path, {
      resource_type: "video",
      use_filename: true,
      unique_filename: true,
    });

    // Check for duplicate using etag
    const exists = await videoRepo.findByEtag(upload.etag);
    if (exists) {
      await cloudinary.uploader.destroy(upload.public_id, {
        resource_type: "video",
      });
      throw new Error("This video already exists");
    }

    return videoRepo.create({
      type,
      src: upload.secure_url,
      id: upload.public_id,
      etag: upload.etag,
      asset_id: upload.asset_id,
    });
  }

  getAllVideos() {
    return videoRepo.findAll();
  }

  async updateVideo(id: string, type: string) {
    const video = await videoRepo.findByIdField(id); // see repo method below
    if (!video) throw new Error("Video not found");
    return videoRepo.update(video._id, { type });
  }

  async deleteVideo(id: string) {
    // Find document using the 'id' field, which stores Cloudinary public_id
    const video = await videoRepo.findByIdField(id); // see repo method below
    if (!video) throw new Error("Video not found");

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(video.id, { resource_type: "video" });

    // Delete from MongoDB
    return videoRepo.delete(video._id); // delete using MongoDB _id
  }
}
