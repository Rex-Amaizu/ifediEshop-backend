import { Schema } from "mongoose";
import { IAddress } from "../../types/user.types";

export const AddressSchema = new Schema<IAddress>({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String },
  isDefault: { type: Boolean, default: false },
});
