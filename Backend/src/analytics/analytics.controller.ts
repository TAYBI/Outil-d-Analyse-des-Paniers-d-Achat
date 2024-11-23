import { Request, Response } from "express";
import { IProduct } from "../types";
import { Product } from "../models/product.model";
import { Sale } from "../models/sale.model";

class AnalyticsController {
  async getTotalSales(req: Request, res: Response) {
    try {
      type TotalSales = { totalAmount: number };

      const startDate = req.query.startDate
        ? new Date(req.query.startDate as string)
        : new Date(0);

      const endDate = req.query.endDate
        ? new Date(req.query.endDate as string)
        : new Date();

      console.log(startDate, endDate);

      const totalSales: TotalSales[] = await Sale.aggregate([
        {
          $match: { Date: { $gte: startDate, $lte: endDate } },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$TotalAmount" },
          },
        },
      ]);

      res.json({
        success: true,
        data: totalSales[0]?.totalAmount || 0,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching sales", error });
    }
  }

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

export default new AnalyticsController();
