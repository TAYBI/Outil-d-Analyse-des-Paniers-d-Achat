import { Router } from "express";
import AnalyticsController from "./analytics.controller";

const router: Router = Router();

router.get("/analytics/total_sales", AnalyticsController.getTotalSales);
router.get(
  "/analytics/trending_products",
  AnalyticsController.getTrendingProducts
);
router.get("/analytics/category_sales", AnalyticsController.getCategorySales);
router.get("/products", AnalyticsController.getProducts);

export default router;
