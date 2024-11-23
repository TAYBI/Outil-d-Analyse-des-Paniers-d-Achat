export interface IProduct {
  _id?: string;
  ProductID: number;
  ProductName: string;
  Category: string;
  Price: number;
}

export interface IProductWithSales extends IProduct {
  totalSales: number;
}

export interface ISale {
  _id?: string;
  SaleID: number;
  ProductID: number;
  Quantity: number;
  Date: Date;
  TotalAmount: number;
}
