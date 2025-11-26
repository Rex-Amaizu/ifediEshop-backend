import { Token } from "../models/Token";

export const TokenRepository = {
  create: (data: any) => Token.create(data),
  deleteByUser: (userId: string) => Token.deleteMany({ user: userId }),
  findToken: (token: string) => Token.findOne({ token }),
};
