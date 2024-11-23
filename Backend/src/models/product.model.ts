import mongoose from "mongoose";
import { IProduct } from "../types";

const ProductSchema = new mongoose.Schema<IProduct>({
  ProductID: { type: Number, required: true },
  ProductName: { type: String, required: true },
  Category: { type: String, required: true },
  Price: { type: Number, required: true },
});

export const Product = mongoose.model<IProduct>("product", ProductSchema);
