import { Request, Response } from "express";
import { AddressService } from "../services/address.service";

const addressService = new AddressService();

export class AddressController {
  static async addNew(req: Request, res: Response) {
    try {
      const addresses = await addressService.addNewUserAddress(
        req.user.id,
        req.body
      );

      res.status(201).json({
        success: true,
        message: "Address added successfully",
        data: addresses,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const addresses = await addressService.fetchUserAddresses(req.user.id);

      res.json({
        success: true,
        message: "Addresses fetched successfully",
        data: addresses,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const addresses = await addressService.updateUserAddress(
        req.user.id,
        req.params.addressId,
        req.body
      );

      res.json({
        success: true,
        message: "Address updated successfully",
        data: addresses,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const addresses = await addressService.deleteUserAddress(
        req.user.id,
        req.params.addressId
      );

      res.json({
        success: true,
        message: "Address deleted successfully",
        data: addresses,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
}
