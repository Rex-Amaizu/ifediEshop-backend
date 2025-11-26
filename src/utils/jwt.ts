import jwt, { SignOptions } from "jsonwebtoken";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET as string, {
    expiresIn: process.env.REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
  });
};
