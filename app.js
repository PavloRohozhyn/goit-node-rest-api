import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import fs from "node:fs";
import YAML from "yaml";
import connectDatabase from "./db/connectDatabase.js";
import authRouter from "./routes/authRouter.js";
import contactRouter from "./routes/contactRouter.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/contacts", contactRouter);
// -- swagger
const file = fs.readFileSync("./swagger/swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// -- end swagger
app.use(notFoundHandler);
app.use(errorHandler);
await connectDatabase();
app.listen(process.env.PORT, () => {
  console.log("Server is running. Use our API on port: 3000");
});
