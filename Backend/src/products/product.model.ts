import mongoose from "mongoose";
import { IProduct } from "../types";

const ProductSchema = new mongoose.Schema<IProduct>({
  SaleID: { type: Number, required: true },
  ProductID: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  Date: { type: Date, required: true },
  TotalAmount: { type: Number, required: true },
});

export const Product = mongoose.model<IProduct>("product", ProductSchema);
