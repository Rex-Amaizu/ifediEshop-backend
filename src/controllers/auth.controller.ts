import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

export const AuthController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({ message: "Registered Successfully", user });
    } catch (err) {
      next(err);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json({
        message: "Login successful",
        ...result, // contains accessToken, refreshToken, user
      });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new Error("Refresh token is required");
      }

      await AuthService.logout(refreshToken);
      res.json({ message: "Logged out" });
    } catch (err) {
      next(err);
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;

      const newToken = await AuthService.refresh(refreshToken);

      res.json({ accessToken: newToken });
    } catch (err) {
      next(err);
    }
  },
};
