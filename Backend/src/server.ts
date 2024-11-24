import express, { Application } from "express";
import routes from "./analytics/analytics.route";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const PORT: number = 3000;
const MONGO_URI: string = process.env.MONGO_URI || "";
const app: Application = express();
const swaggerDocument = YAML.load(path.join(__dirname, "./swagger.yaml"));

app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(express.json());

app.use("/", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(MONGO_URI).then(() => {
  console.log("Connected to database");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
