import { User } from "../models/User";

export const UserRepository = {
  create: (data: any) => User.create(data),
  findByEmail: (email: string) => User.findOne({ email }),
  findById: (id: string) => User.findById(id),
};
