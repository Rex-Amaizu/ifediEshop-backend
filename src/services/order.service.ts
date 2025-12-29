import { OrderRepository } from "../repositories/order.repository";

export class OrderService {
  async addUserOrder(userId: string, data: any) {
    // Create the order in the Order collection
    const order = await OrderRepository.create({
      user: userId,
      ...data,
    });

    return order;
  }

  async fetchUserOrders(userId: string) {
    return await OrderRepository.findByUser(userId);
  }

  async deleteSpecificUserOrder(userId: string, orderId: string) {
    const deleted = await OrderRepository.deleteOne(userId, orderId);
    if (!deleted) throw new Error("Order not found");
    return deleted;
  }

  async deleteAllUserOrders(userId: string) {
    await OrderRepository.deleteAll(userId);
    return true;
  }
}
