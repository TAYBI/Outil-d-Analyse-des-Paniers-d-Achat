import { Router } from "express";
import ProductController from "./product.controller";

const router: Router = Router();

router.get("/", ProductController.getProducts);

export default router;
