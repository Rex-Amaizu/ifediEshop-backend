import { Request, Response } from "express";
import { VideoService } from "../services/video.service";

const videoService = new VideoService();

export class VideoController {
  static async addVideo(req: Request, res: Response) {
    try {
      const result = await videoService.addVideo(req.file, req.body.type);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getAllVideos(req: Request, res: Response) {
    const videos = await videoService.getAllVideos();
    res.json(videos);
  }

  static async updateVideo(req: Request, res: Response) {
    try {
      const updated = await videoService.updateVideo(
        req.params.id,
        req.body.type
      );
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async deleteVideo(req: Request, res: Response) {
    try {
      await videoService.deleteVideo(req.params.id);
      res.json({ message: "Deleted" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
