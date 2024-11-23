import { Router } from "express";
import AnalyticsController from "./analytics.controller";

const router: Router = Router();

router.get("/analytics/total_sales", AnalyticsController.getTotalSales);
router.get("/products", AnalyticsController.getProducts);

export default router;
