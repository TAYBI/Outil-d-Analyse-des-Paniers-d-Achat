import { Router } from "express";
import saleController from "./sale.controller";

const router: Router = Router();

router.get("/", (req, res) => saleController.getAllSales(req, res));

export default router;
