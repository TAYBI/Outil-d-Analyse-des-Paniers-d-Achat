import { Router } from "express";
import AnalyticsController from "./analytics.controller";

const router: Router = Router();

router.get("/products", AnalyticsController.getProducts);

export default router;
