import { Request, Response } from "express";
import { Sale } from "./sale.model";
import { ISale } from "../types";

class SaleController {
  public async getAllSales(req: Request, res: Response) {
    try {
      const sales: ISale[] = await Sale.find();
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: "Error fetching sales", error });
    }
  }
}

export default new SaleController();
