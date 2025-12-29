import { UserRepository } from "../repositories/user.repository";

const userRepo = UserRepository;

export class AddressService {
  async addNewUserAddress(userId: string, data: any) {
    const user = await userRepo.findById(userId);
    if (!user) throw new Error("User not found");

    user.addresses.push(data);

    if (data.isDefault) {
      user.addresses.forEach((a: any, i: number) => {
        if (i !== user.addresses.length - 1) a.isDefault = false;
      });
    }

    await user.save();
    return user.addresses; // ALWAYS return full list
  }

  async fetchUserAddresses(userId: string) {
    const user = await userRepo.findById(userId);
    if (!user) throw new Error("User not found");

    return user.addresses;
  }

  async updateUserAddress(userId: string, addressId: string, data: any) {
    const user = await userRepo.findById(userId);
    if (!user) throw new Error("User not found");

    const addr = user.addresses.id(addressId);
    if (!addr) throw new Error("Address not found");

    Object.assign(addr, data);

    if (data.isDefault) {
      user.addresses.forEach((a: any) => {
        if (a._id.toString() !== addressId) a.isDefault = false;
      });
    }

    await user.save();
    return user.addresses; // 🔥 RETURN FULL LIST
  }

  async deleteUserAddress(userId: string, addressId: string) {
    const user = await userRepo.findById(userId);
    if (!user) throw new Error("User not found");

    user.addresses.pull(addressId);
    await user.save();

    return user.addresses; // FULL LIST
  }
}
