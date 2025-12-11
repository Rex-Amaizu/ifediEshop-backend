import { UserRepository } from "../repositories/user.repository";
import { TokenRepository } from "../repositories/token.repository";
import { hashPassword, comparePassword } from "../utils/password";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import jwt from "jsonwebtoken";

export const AuthService = {
  register: async (data: any) => {
    const exists = await UserRepository.findByEmail(data.email);
    if (exists) throw new Error("Email already exists");

    data.password = await hashPassword(data.password);
    return UserRepository.create(data);
  },

  login: async (email: string, password: string) => {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const match = await comparePassword(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id });

    await TokenRepository.create({
      user: user._id,
      token: refreshToken,
      lastActivityAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken, user };
  },

  logout: async (userId: string) => {
    await TokenRepository.deleteByUser(userId);
  },

  refresh: async (refreshToken: string) => {
    const tokenDoc = await TokenRepository.findToken(refreshToken);
    if (!tokenDoc) throw new Error("Invalid refresh token");

    const decoded: any = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    );

    const newAccessToken = generateAccessToken({ id: decoded.id });

    return { accessToken: newAccessToken };
  },
};
