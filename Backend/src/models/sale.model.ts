import mongoose from "mongoose";
import { ISale } from "../types";

const SaleSchema = new mongoose.Schema<ISale>({
  SaleID: { type: Number, required: true },
  ProductID: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  Date: { type: Date, required: true },
  TotalAmount: { type: Number, required: true },
});

export const Sale = mongoose.model<ISale>("sale", SaleSchema);
