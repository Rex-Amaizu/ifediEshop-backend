import PromoVideo from "../models/video/video.model";

export class VideoRepository {
  create(data: any) {
    return PromoVideo.create(data);
  }

  findByEtag(etag: string) {
    return PromoVideo.findOne({ etag });
  }

  findAll() {
    return PromoVideo.find();
  }

  findById(id: string) {
    return PromoVideo.findById(id);
  }

  // NEW: find document by 'id' field (Cloudinary public_id)
  findByIdField(id: string) {
    return PromoVideo.findOne({ id });
  }

  update(id: string, data: any) {
    return PromoVideo.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return PromoVideo.findByIdAndDelete(id);
  }
}
