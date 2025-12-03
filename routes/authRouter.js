import express from "express";
import {
  registerUser,
  loginUser,
  currentUser,
  logoutUser,
} from "../controllers/authController.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import validateBody from "./../helpers/validateBody.js";
import authenticate from "./../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), registerUser);
authRouter.post("/login", validateBody(loginSchema), loginUser);
authRouter.post("/logout", authenticate, logoutUser);
authRouter.get("/current", authenticate, currentUser);

export default authRouter;
