import express from "express";
import {
  registerUser,
  verifyUser,
  loginUser,
  avatarUser,
  currentUser,
  logoutUser,
} from "../controllers/authController.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import validateBody from "./../helpers/validateBody.js";
import authenticate from "./../middlewares/authenticate.js";
import upload from "./../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), registerUser);
authRouter.get("/verify/:verificationToken", verifyUser);
authRouter.post("/login", validateBody(loginSchema), loginUser);
authRouter.patch(
  "/avatar",
  [upload.single("avatar"), authenticate],
  avatarUser
);
authRouter.get("/current", authenticate, currentUser);
authRouter.post("/logout", authenticate, logoutUser);

export default authRouter;
