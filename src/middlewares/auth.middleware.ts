import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = auth.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
