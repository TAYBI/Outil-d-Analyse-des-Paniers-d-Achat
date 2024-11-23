export interface Product {
  ProductID: number;
  ProductName: string;
  Category: string;
  Price: number;
}

export interface Sale {
  SaleID: number;
  ProductID: number;
  Quantity: number;
  Date: string;
  TotalAmount: number;
}
