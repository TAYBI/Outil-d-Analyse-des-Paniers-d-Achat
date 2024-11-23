import { Request, Response } from "express";
import { Product } from "./product.model";
import { IProduct } from "../types";

class ProductController {
  async getProducts(req: Request, res: Response) {
    try {
      type ProductWithSales = IProduct & { totalSales: number };
      const productsWithSales: ProductWithSales[] = await Product.aggregate([
        {
          $lookup: {
            from: "sales",
            localField: "ProductID",
            foreignField: "ProductID",
            as: "salesData",
          },
        },
        {
          $addFields: {
            totalSales: { $sum: "$salesData.Quantity" },
          },
        },
        {
          $project: {
            ProductID: 1,
            ProductName: 1,
            Category: 1,
            Price: 1,
            totalSales: 1,
          },
        },
      ]);

      res.json({
        success: true,
        count: productsWithSales.length,
        data: productsWithSales,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching sales", error });
    }
  }
}

export default new ProductController();
