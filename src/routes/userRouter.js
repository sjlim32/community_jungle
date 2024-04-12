import express from "express";
import { userController } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.signIn);

export { userRouter };
