import { Order } from "../models/order/Order";

export const OrderRepository = {
  create: (data: any) => Order.create(data),

  findByUser: (userId: string) =>
    Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("items.product", "_id name price images"),

  deleteOne: (userId: string, orderId: string) =>
    Order.findOneAndDelete({ _id: orderId, user: userId }),

  deleteAll: (userId: string) => Order.deleteMany({ user: userId }),
};
