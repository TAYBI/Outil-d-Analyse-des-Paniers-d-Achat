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

  async getTrendingProducts(req: Request, res: Response) {
    try {
      type TrendingProduct = IProduct & {
        totalQuantity: number;
        totalAmount: number;
        percentage: number;
      };
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;

      const totalAmountSum = await Sale.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$TotalAmount" },
          },
        },
      ]);

      const totalAmount: number = totalAmountSum[0]?.totalAmount || 0;

      const trendingProducts: TrendingProduct[] = await Sale.aggregate([
        {
          $group: {
            _id: "$ProductID",
            totalQuantity: { $sum: "$Quantity" },
            totalAmount: { $sum: "$TotalAmount" },
          },
        },
        {
          $addFields: {
            percentage: {
              $round: [
                {
                  $multiply: [{ $divide: ["$totalAmount", totalAmount] }, 100],
                },
                2,
              ],
            },
          },
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: limit },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "ProductID",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $project: {
            _id: 0,
            ProductID: "$_id",
            ProductName: "$product.ProductName",
            Category: "$product.Category",
            totalQuantity: 1,
            totalAmount: 1,
            percentage: 1,
          },
        },
      ]);
      res.json({
        success: true,
        data: trendingProducts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching trending products",
        error,
      });
    }
  }

  async getCategorySales(req: Request, res: Response) {
    try {
      type CategorySales = {
        category: string;
        totalSales: number;
        percentage: number;
      };

      const categorySales: CategorySales[] = await Sale.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "ProductID",
            foreignField: "ProductID",
            as: "product",
          },
        },
        { $unwind: "$product" },

        {
          $group: {
            _id: "$product.Category",
            totalSales: { $sum: "$Quantity" },
          },
        },

        {
          $group: {
            _id: null,
            categories: {
              $push: { category: "$_id", totalSales: "$totalSales" },
            },
            globalTotalSales: { $sum: "$totalSales" },
          },
        },

        { $unwind: "$categories" },

        {
          $project: {
            _id: 0,
            category: "$categories.category",
            totalSales: "$categories.totalSales",
            percentage: {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: ["$categories.totalSales", "$globalTotalSales"],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
          },
        },
      ]);

      res.json({
        success: true,
        count: categorySales.length,
        data: categorySales,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching trending products",
        error,
      });
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
          $addFields: { totalSales: { $sum: "$salesData.Quantity" } },
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
