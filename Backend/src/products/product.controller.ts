import { Request, Response } from "express";
import { IProduct } from "./product.model";

class ProductController {
  private products: IProduct[] = [];

  public getAllProducts(req: Request, res: Response): void {
    try {
      res.status(200).json({
        success: true,
        count: this.products.length,
        data: this.products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  }
}

export default new ProductController();
