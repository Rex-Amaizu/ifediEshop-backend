import { User } from "../models/user/User";

export const UserRepository = {
  create: (data: any) => User.create(data),
  findByEmail: (email: string) => User.findOne({ email }),
  findById: (id: string) => User.findById(id),
  findByIdWithCart: (id: string) =>
    User.findById(id).populate({
      path: "userCart.product",
      select: "_id name price images colors sizes",
    }),
  update(id: string, data: any) {
    return User.findByIdAndUpdate(id, data, { new: true });
  },
};
