import { User } from "../models/user/User";

export const UserRepository = {
  create: (data: any) => User.create(data),
  findByEmail: (email: string) => User.findOne({ email }),
  findById: (id: string) => User.findById(id),
};
