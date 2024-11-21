import express, { Application } from "express";
import productRoutes from "./products/product.route";

const app: Application = express();

const PORT: number = 3000;

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
