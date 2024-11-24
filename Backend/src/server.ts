import express, { Application } from "express";
import routes from "./analytics/analytics.route";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const PORT: number = 3000;
const MONGO_URI: string = process.env.MONGO_URI || "";
const app: Application = express();

app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(express.json());
app.use("/", routes);

mongoose.connect(MONGO_URI).then(() => {
  console.log("Connected to database");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
