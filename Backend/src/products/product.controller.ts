import { Request, Response } from "express";
import { IProduct } from "../types";
import { Product } from "./product.model";

class ProductController {
  // public async getAllProducts(req: Request, res: Response) {
  //   try {
  //     const products = await Product.find();
  //     res.json(products);
  //   } catch (error) {
  //     res.status(500).json({ message: "Error fetching products", error });
  //   }
  // }

  public async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products: IProduct[] = await Product.find();

      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  }
}

export default new ProductController();
