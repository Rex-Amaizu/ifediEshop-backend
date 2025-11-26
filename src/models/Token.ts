import { Schema, model, Document, Types } from "mongoose";

export interface IRefreshToken extends Document {
  user: Types.ObjectId;
  token: string;
  expiresAt: Date;
  lastActivityAt: Date;
}

const TokenSchema = new Schema<IRefreshToken>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  lastActivityAt: { type: Date, required: true },
});

export const Token = model<IRefreshToken>("Token", TokenSchema);
