import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import express from "express";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const router = express.Router();

const options = yaml.load(fs.readFileSync("./api_docs/build/bundle.yaml", "utf8"));

router.use("/docs", swaggerUi.serve, swaggerUi.setup(options));

export default router;