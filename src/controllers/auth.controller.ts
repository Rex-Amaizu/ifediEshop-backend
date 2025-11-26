import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

export const AuthController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({ message: "Registered", user });
    } catch (err) {
      next(err);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AuthService.logout(req.user.id);
      res.json({ message: "Logged out" });
    } catch (err) {
      next(err);
    }
  },
};
