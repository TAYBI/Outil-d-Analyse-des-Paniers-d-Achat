import { Router } from "express";
import ProductController from "./product.controller";

const router: Router = Router();

router.get("/", (req, res) => ProductController.getAllProducts(req, res));

export default router;
