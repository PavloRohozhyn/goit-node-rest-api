import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import fs from "node:fs";
import YAML from "yaml";
import connectDatabase from "./db/connectDatabase.js";
import contactsRouter from "./routes/contactsRouter.js";
import { ValidationError } from "sequelize";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

// -- swagger
const file = fs.readFileSync("./swagger/swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// -- end swagger

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err && err instanceof ValidationError) {
    err.status = 400;
  }
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

await connectDatabase();
app.listen(process.env.PORT, () => {
  console.log("Server is running. Use our API on port: 3000");
});
