import express, { Application } from "express";
import routes from "./analytics/analytics.route";
import mongoose from "mongoose";
import "dotenv/config";

const PORT: number = 3000;
const MONGO_URI: string = process.env.MONGO_URI || "";
const app: Application = express();

app.use("/", routes);

mongoose.connect(MONGO_URI).then(() => {
  console.log("Connected to database");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
